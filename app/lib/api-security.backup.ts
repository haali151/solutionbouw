export class RequestError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function errorResponse(error: unknown) {
  const status = error instanceof RequestError ? error.status : 500;
  return Response.json({ success: false, error: error instanceof RequestError
    ? error.message : "De aanvraag kon niet worden verwerkt. Probeer later opnieuw." }, {
    status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
  });
}

// A per-process circuit breaker, NOT a distributed rate limit or bot defence.
// Configure shared limits at the hosting layer before public promotion.
const buckets = new Map<string, { start: number; count: number; active: number }>();
export function enterRequest(request: Request, kind: "image" | "chat") {
  const origin = request.headers.get("origin");
  const allowed = new Set(["https://wallmade.nl", "https://www.wallmade.nl"]);
  // Trust only explicit deployment origins; never derive the public allowlist from Host.
  for (const hostname of [process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]) {
    if (hostname && /^[a-z0-9-]+\.vercel\.app$/i.test(hostname)) allowed.add(`https://${hostname}`);
  }
  // next start uses production mode locally too. Only allow the exact loopback
  // request origin when this process is not running on Vercel.
  const target = new URL(request.url);
  if (!process.env.VERCEL && ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname)) {
    for (const host of ["localhost", "127.0.0.1", "[::1]"]) {
      allowed.add(`${target.protocol}//${host}${target.port ? `:${target.port}` : ""}`);
    }
  }
  if (!origin || !allowed.has(origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new RequestError(403, "Deze aanvraag is niet toegestaan.");
  }
  const contentType = request.headers.get("content-type") || "";
  const expected = kind === "image" ? "multipart/form-data" : "application/json";
  if (contentType.split(";")[0].trim().toLowerCase() !== expected) {
    throw new RequestError(415, "Ongeldig aanvraagformaat.");
  }
  const now = Date.now();
  let bucket = buckets.get(kind);
  if (!bucket) {
    bucket = { start: now, count: 0, active: 0 };
    buckets.set(kind, bucket);
  }
  if (now - bucket.start >= 60_000) { bucket.start = now; bucket.count = 0; }
  if (bucket.count >= (kind === "image" ? 6 : 30) || bucket.active >= (kind === "image" ? 2 : 5)) {
    throw new RequestError(429, "Het is momenteel druk. Probeer over een minuut opnieuw.");
  }
  bucket.count++;
  bucket.active++;
  let released = false;
  return () => { if (!released) { bucket.active--; released = true; } };
}

export async function boundedBody(request: Request, maxBytes: number) {
  const declared = request.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > maxBytes)) {
    throw new RequestError(413, "De aanvraag is te groot.");
  }
  if (!request.body) throw new RequestError(400, "Lege aanvraag.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError(413, "De aanvraag is te groot.");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type") || "" } });
}
