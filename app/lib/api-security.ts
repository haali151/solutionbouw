export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function errorResponse(error: unknown) {
  const status = error instanceof RequestError ? error.status : 500;

  return Response.json(
    {
      success: false,
      error:
        error instanceof RequestError
          ? error.message
          : "De aanvraag kon niet worden verwerkt. Probeer later opnieuw.",
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "60" } : {}),
      },
    },
  );
}

// Per-process protection.
// Shared/global rate limiting should also be configured at hosting level.
const buckets = new Map<
  string,
  {
    start: number;
    count: number;
    active: number;
  }
>();

function isPrivateLocalHostname(hostname: string) {
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  ) {
    return true;
  }

  // 10.0.0.0/8
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    return true;
  }

  // 192.168.0.0/16
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    return true;
  }

  // 172.16.0.0 - 172.31.255.255
  const match = hostname.match(/^172\.(\d{1,2})\.\d{1,3}\.\d{1,3}$/);

  if (match) {
    const second = Number(match[1]);

    if (second >= 16 && second <= 31) {
      return true;
    }
  }

  return false;
}

export function enterRequest(request: Request, kind: "image" | "chat") {
  const origin = request.headers.get("origin");
  const target = new URL(request.url);

  const allowed = new Set<string>([
    "https://wallmade.nl",
    "https://www.wallmade.nl",
  ]);

  // Allow official Vercel deployment URLs.
  for (const hostname of [
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (hostname && /^[a-z0-9-]+\.vercel\.app$/i.test(hostname)) {
      allowed.add(`https://${hostname}`);
    }
  }

  // Local development only.
  // Allows localhost and private LAN addresses such as 192.168.x.x.
  if (!process.env.VERCEL && isPrivateLocalHostname(target.hostname)) {
    allowed.add(target.origin);

    if (origin) {
      try {
        const originUrl = new URL(origin);

        if (isPrivateLocalHostname(originUrl.hostname)) {
          allowed.add(originUrl.origin);
        }
      } catch {
        // Invalid Origin will be rejected below.
      }
    }
  }

  if (
    !origin ||
    !allowed.has(origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    throw new RequestError(403, "Deze aanvraag is niet toegestaan.");
  }

  const contentType = request.headers.get("content-type") || "";

  const expected =
    kind === "image" ? "multipart/form-data" : "application/json";

  if (contentType.split(";")[0].trim().toLowerCase() !== expected) {
    throw new RequestError(415, "Ongeldig aanvraagformaat.");
  }

  const now = Date.now();

  let bucket = buckets.get(kind);

  if (!bucket) {
    bucket = {
      start: now,
      count: 0,
      active: 0,
    };

    buckets.set(kind, bucket);
  }

  if (now - bucket.start >= 60_000) {
    bucket.start = now;
    bucket.count = 0;
  }

  const requestLimit = kind === "image" ? 6 : 30;

  const activeLimit = kind === "image" ? 2 : 5;

  if (bucket.count >= requestLimit || bucket.active >= activeLimit) {
    throw new RequestError(
      429,
      "Het is momenteel druk. Probeer over een minuut opnieuw.",
    );
  }

  bucket.count++;
  bucket.active++;

  let released = false;

  return () => {
    if (!released) {
      bucket.active--;
      released = true;
    }
  };
}

export async function boundedBody(request: Request, maxBytes: number) {
  const declared = request.headers.get("content-length");

  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new RequestError(413, "De aanvraag is te groot.");
  }

  if (!request.body) {
    throw new RequestError(400, "Lege aanvraag.");
  }

  const reader = request.body.getReader();

  const chunks: Uint8Array[] = [];

  let size = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      size += value.byteLength;

      if (size > maxBytes) {
        await reader.cancel();

        throw new RequestError(413, "De aanvraag is te groot.");
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  return new Response(Buffer.concat(chunks), {
    headers: {
      "Content-Type": request.headers.get("content-type") || "",
    },
  });
}
