import fs from "node:fs/promises";
import path from "node:path";

const DATA_FILE = path.join(
  process.cwd(),
  "data",
  "haarden-import.json"
);

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "haarden"
);

// عدد الصور التي تُنزّل بنفس الوقت
const CONCURRENCY = 5;

function safeName(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();

    if (
      [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)
    ) {
      return ext;
    }
  } catch {}

  return ".jpg";
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(url, destination) {
  // إذا موجودة من تشغيل سابق، لا يعيد تنزيلها
  if (await fileExists(destination)) {
    return "skipped";
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = Buffer.from(
    await response.arrayBuffer()
  );

  await fs.writeFile(destination, buffer);

  return "downloaded";
}

async function runWithConcurrency(tasks, limit) {
  let index = 0;

  async function worker() {
    while (true) {
      const current = index++;

      if (current >= tasks.length) {
        return;
      }

      await tasks[current]();
    }
  }

  const workers = Array.from(
    {
      length: Math.min(limit, tasks.length),
    },
    () => worker()
  );

  await Promise.all(workers);
}

async function main() {
  console.log("");
  console.log("🔥 SOLUTIONBOUW IMAGE IMPORTER");
  console.log("================================");

  const raw = await fs.readFile(
    DATA_FILE,
    "utf8"
  );

  const data = JSON.parse(raw);

  const products = data.products ?? [];

  if (products.length === 0) {
    throw new Error(
      "Geen producten gevonden in haarden-import.json"
    );
  }

  await fs.mkdir(OUTPUT_DIR, {
    recursive: true,
  });

  console.log(`Producten: ${products.length}`);

  const totalImages = products.reduce(
    (total, product) =>
      total + (product.images?.length ?? 0),
    0
  );

  console.log(`Afbeeldingen: ${totalImages}`);
  console.log("================================\n");

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  let processedProducts = 0;

  for (const product of products) {
    processedProducts++;

    const slug =
      safeName(product.slug || product.title) ||
      `product-${product.id}`;

    // ID erbij zodat twee vergelijkbare producten
    // nooit dezelfde map kunnen krijgen
    const folderName =
      `${slug}-${product.id}`;

    const productDir = path.join(
      OUTPUT_DIR,
      folderName
    );

    await fs.mkdir(productDir, {
      recursive: true,
    });

    const images = product.images ?? [];

    console.log(
      `[${processedProducts}/${products.length}] ${product.title}`
    );

    console.log(
      `   📁 ${folderName}`
    );

    console.log(
      `   🖼️ ${images.length} afbeeldingen`
    );

    const tasks = images.map(
      (imageUrl, imageIndex) => {
        return async () => {
          const extension =
            getExtension(imageUrl);

          const filename =
            `${String(imageIndex + 1).padStart(
              2,
              "0"
            )}${extension}`;

          const destination = path.join(
            productDir,
            filename
          );

          try {
            const result =
              await downloadImage(
                imageUrl,
                destination
              );

            if (result === "skipped") {
              skipped++;
            } else {
              downloaded++;
            }
          } catch (error) {
            failed++;

            console.log(
              `   ❌ ${filename}: ${error.message}`
            );
          }
        };
      }
    );

    await runWithConcurrency(
      tasks,
      CONCURRENCY
    );
  }

  console.log("");
  console.log("================================");
  console.log("✅ IMAGE IMPORT KLAAR");
  console.log("================================");
  console.log(`Producten: ${products.length}`);
  console.log(`Nieuw gedownload: ${downloaded}`);
  console.log(`Overgeslagen: ${skipped}`);
  console.log(`Mislukt: ${failed}`);
  console.log(
    `Totaal verwerkt: ${
      downloaded + skipped + failed
    }`
  );
  console.log("================================");

  if (failed > 0) {
    console.log("");
    console.log(
      "⚠️ Sommige afbeeldingen zijn mislukt."
    );
    console.log(
      "Start hetzelfde script opnieuw."
    );
    console.log(
      "Bestaande afbeeldingen worden automatisch overgeslagen."
    );
  }
}

main().catch((error) => {
  console.error("");
  console.error("❌ IMPORT GESTOPT");
  console.error(error);
  process.exitCode = 1;
});