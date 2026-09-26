import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://diamondflame.nl";
const COLLECTION = "elektrische-sfeerhaarden";

const OUTPUT_DIR = path.join(process.cwd(), "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "haarden-import.json");

const LIMIT = 250;

console.log("🔥 SOLUTIONBOUW HAARDEN IMPORTER");
console.log("--------------------------------");
console.log("Catalogus ophalen...\n");

async function fetchPage(page) {
  const url =
    `${BASE_URL}/collections/${COLLECTION}/products.json` +
    `?limit=${LIMIT}&page=${page}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Pagina ${page} kon niet worden geladen. HTTP ${response.status}`
    );
  }

  const data = await response.json();

  return data.products ?? [];
}

function cleanHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeImage(image) {
  if (!image) return null;

  if (typeof image === "string") {
    return image.startsWith("//") ? `https:${image}` : image;
  }

  const src = image.src;

  if (!src) return null;

  return src.startsWith("//") ? `https:${src}` : src;
}

function normalizeProduct(product) {
  const variants = Array.isArray(product.variants)
    ? product.variants
    : [];

  const images = Array.isArray(product.images)
    ? product.images
        .map(normalizeImage)
        .filter(Boolean)
        .filter((image, index, array) => array.indexOf(image) === index)
    : [];

  const prices = variants
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price));

  const compareAtPrices = variants
    .map((variant) => Number(variant.compare_at_price))
    .filter((price) => Number.isFinite(price) && price > 0);

  const available =
    variants.length === 0
      ? true
      : variants.some((variant) => variant.available !== false);

  return {
    id: String(product.id),

    handle: product.handle ?? "",

    slug: product.handle ?? "",

    title: product.title ?? "",

    vendor: product.vendor ?? "",

    productType: product.product_type ?? "",

    tags: Array.isArray(product.tags)
      ? product.tags
      : typeof product.tags === "string"
        ? product.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],

    description: cleanHtml(product.body_html ?? ""),

    price:
      prices.length > 0
        ? Math.min(...prices) / 100
        : null,

    compareAtPrice:
      compareAtPrices.length > 0
        ? Math.min(...compareAtPrices) / 100
        : null,

    currency: "EUR",

    available,

    images,

    variants: variants.map((variant) => ({
      id: String(variant.id),

      title: variant.title ?? "",

      sku: variant.sku ?? "",

      available: variant.available !== false,

      price:
        Number.isFinite(Number(variant.price))
          ? Number(variant.price) / 100
          : null,

      compareAtPrice:
        Number.isFinite(Number(variant.compare_at_price)) &&
        Number(variant.compare_at_price) > 0
          ? Number(variant.compare_at_price) / 100
          : null,
    })),

    sourceUrl:
      `${BASE_URL}/products/${product.handle}`,

    importedAt: new Date().toISOString(),
  };
}

async function main() {
  const allProducts = [];

  let page = 1;

  while (true) {
    console.log(`📦 Pagina ${page} ophalen...`);

    const products = await fetchPage(page);

    console.log(`   ${products.length} producten gevonden`);

    if (products.length === 0) {
      break;
    }

    allProducts.push(...products);

    if (products.length < LIMIT) {
      break;
    }

    page++;
  }

  console.log("\n🧹 Productgegevens verwerken...");

  const normalizedProducts = allProducts.map(normalizeProduct);

  const uniqueProducts = [
    ...new Map(
      normalizedProducts.map((product) => [
        product.id,
        product,
      ])
    ).values(),
  ];

  await fs.mkdir(OUTPUT_DIR, {
    recursive: true,
  });

  const output = {
    source: BASE_URL,

    collection: COLLECTION,

    total: uniqueProducts.length,

    generatedAt: new Date().toISOString(),

    products: uniqueProducts,
  };

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(output, null, 2),
    "utf8"
  );

  const totalImages = uniqueProducts.reduce(
    (total, product) =>
      total + product.images.length,
    0
  );

  console.log("\n================================");
  console.log("✅ IMPORT KLAAR");
  console.log("================================");
  console.log("Producten:", uniqueProducts.length);
  console.log("Afbeeldingen gevonden:", totalImages);
  console.log("Bestand:", OUTPUT_FILE);
  console.log("================================");
}

main().catch((error) => {
  console.error("\n❌ IMPORT MISLUKT");
  console.error(error);

  process.exitCode = 1;
});