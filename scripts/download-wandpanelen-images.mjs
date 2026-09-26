import fs from "fs";
import path from "path";

const inputPath = path.join(
  process.cwd(),
  "data",
  "wandpanelen-import.json"
);

const outputRoot = path.join(
  process.cwd(),
  "public",
  "wandpanelen"
);

const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

fs.mkdirSync(outputRoot, { recursive: true });

let downloaded = 0;
let skipped = 0;
let failed = 0;

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();

    if ([".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
      return ext;
    }
  } catch {}

  return ".jpg";
}

function cleanName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function downloadImage(url, destination) {
  if (fs.existsSync(destination)) {
    skipped++;
    return;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(destination, buffer);

  downloaded++;
}

async function main() {
  console.log(`Producten: ${data.products.length}`);
  console.log("--------------------------------");

  for (const product of data.products) {
    const folderName = `${cleanName(product.slug)}-${product.id}`;

    const productFolder = path.join(outputRoot, folderName);

    fs.mkdirSync(productFolder, { recursive: true });

    for (let i = 0; i < product.images.length; i++) {
      const imageUrl = product.images[i];

      const extension = getExtension(imageUrl);

      const fileName =
        `${String(i + 1).padStart(2, "0")}${extension}`;

      const destination = path.join(
        productFolder,
        fileName
      );

      try {
        await downloadImage(
          imageUrl,
          destination
        );

        console.log(
          `✓ ${product.title} → ${fileName}`
        );
      } catch (error) {
        failed++;

        console.log(
          `✗ ${product.title} → ${fileName}`
        );

        console.log(error.message);
      }
    }
  }

  console.log("");
  console.log("================================");
  console.log(`Nieuw gedownload: ${downloaded}`);
  console.log(`Overgeslagen: ${skipped}`);
  console.log(`Mislukt: ${failed}`);
  console.log(
    `Totaal verwerkt: ${downloaded + skipped + failed}`
  );
  console.log("================================");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});