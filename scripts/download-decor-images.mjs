import fs from "fs";
import path from "path";

const inputPath = path.join(
  process.cwd(),
  "data",
  "decor-import.json"
);

const outputRoot = path.join(
  process.cwd(),
  "public",
  "decor"
);

function cleanName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;

    const match = pathname.match(
      /\.(jpg|jpeg|png|webp|avif)$/i
    );

    if (match) {
      return `.${match[1].toLowerCase()}`;
    }
  } catch {}

  return ".jpg";
}

async function downloadImage(
  url,
  filePath
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}`
    );
  }

  const arrayBuffer =
    await response.arrayBuffer();

  fs.writeFileSync(
    filePath,
    Buffer.from(arrayBuffer)
  );
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(
      "decor-import.json niet gevonden"
    );
  }

  const data = JSON.parse(
    fs.readFileSync(
      inputPath,
      "utf8"
    )
  );

  fs.mkdirSync(
    outputRoot,
    {
      recursive: true,
    }
  );

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  console.log(
    `Producten: ${data.products.length}`
  );

  console.log(
    "--------------------------------"
  );

  for (const product of data.products) {
    const folderName =
      `${cleanName(product.slug)}-${product.id}`;

    const productFolder =
      path.join(
        outputRoot,
        folderName
      );

    fs.mkdirSync(
      productFolder,
      {
        recursive: true,
      }
    );

    console.log(
      `\n${product.title}`
    );

    for (
      let i = 0;
      i < product.images.length;
      i++
    ) {
      const imageUrl =
        product.images[i];

      const extension =
        getExtension(imageUrl);

      const fileName =
        `${String(i + 1).padStart(
          2,
          "0"
        )}${extension}`;

      const filePath =
        path.join(
          productFolder,
          fileName
        );

      if (
        fs.existsSync(filePath)
      ) {
        console.log(
          `Overgeslagen: ${fileName}`
        );

        skipped++;
        continue;
      }

      try {
        await downloadImage(
          imageUrl,
          filePath
        );

        console.log(
          `Gedownload: ${fileName}`
        );

        downloaded++;
      } catch (error) {
        console.error(
          `Mislukt: ${fileName}`
        );

        console.error(
          error.message
        );

        failed++;
      }
    }
  }

  console.log(
    "\n--------------------------------"
  );

  console.log(
    `Nieuw gedownload: ${downloaded}`
  );

  console.log(
    `Overgeslagen: ${skipped}`
  );

  console.log(
    `Mislukt: ${failed}`
  );

  console.log(
    `Totaal verwerkt: ${
      downloaded +
      skipped +
      failed
    }`
  );

  console.log(
    "--------------------------------"
  );
}

main().catch((error) => {
  console.error(
    "Download mislukt:"
  );

  console.error(error);

  process.exit(1);
});