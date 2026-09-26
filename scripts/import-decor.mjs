import fs from "fs";
import path from "path";

const COLLECTIONS = [
  {
    name: "Decorpanelen",
    url: "https://diamondflame.nl/collections/decorpanelen/products.json",
  },
  {
    name: "Akoestische Decorpanelen",
    url: "https://diamondflame.nl/collections/akoestische-decor-panelen-kopen/products.json",
  },
];

const outputPath = path.join(
  process.cwd(),
  "data",
  "decor-import.json"
);

function money(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }

  return number / 100;
}

async function fetchCollection(collection) {
  console.log(
    `Ophalen: ${collection.name}...`
  );

  const response = await fetch(
    `${collection.url}?limit=250`
  );

  if (!response.ok) {
    throw new Error(
      `Ophalen mislukt voor ${collection.name}: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  console.log(
    `${collection.name}: ${data.products.length} producten gevonden`
  );

  return data.products;
}

function convertProduct(product) {
  const variants = (product.variants || []).map(
    (variant) => ({
      id: String(variant.id),
      title: variant.title || "",
      sku: variant.sku || "",
      available:
        variant.available ?? true,

      price:
        money(variant.price),

      compareAtPrice:
        money(variant.compare_at_price),
    })
  );

  const prices = variants
    .map((variant) => variant.price)
    .filter((price) => price !== null);

  const comparePrices = variants
    .map(
      (variant) => variant.compareAtPrice
    )
    .filter((price) => price !== null);

  return {
    id: String(product.id),

    slug: product.handle,

    title: product.title,

    vendor:
      product.vendor ||
      "Diamondflame.nl",

    productType:
      product.product_type ||
      "Decor wandpaneel",

    price:
      prices.length > 0
        ? Math.min(...prices)
        : null,

    compareAtPrice:
      comparePrices.length > 0
        ? Math.min(...comparePrices)
        : null,

    currency: "EUR",

    description:
      product.body_html || "",

    images:
      (product.images || []).map(
        (image) => image.src
      ),

    available:
      variants.some(
        (variant) =>
          variant.available
      ),

    variants,

    sourceUrl:
      `https://diamondflame.nl/products/${product.handle}`,
  };
}

async function main() {
  console.log(
    "Diamond Flame Decor wandpanelen ophalen..."
  );

  console.log("--------------------------------");

  const allProducts = [];

  for (const collection of COLLECTIONS) {
    const products =
      await fetchCollection(collection);

    allProducts.push(...products);
  }

  const uniqueProducts = Array.from(
    new Map(
      allProducts.map((product) => [
        String(product.id),
        product,
      ])
    ).values()
  );

  const products =
    uniqueProducts.map(convertProduct);

  const output = {
    importedAt:
      new Date().toISOString(),

    sources:
      COLLECTIONS.map(
        (collection) =>
          collection.url
      ),

    count:
      products.length,

    products,
  };

  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      output,
      null,
      2
    ),
    "utf8"
  );

  console.log("--------------------------------");

  console.log(
    `Totaal unieke producten: ${products.length}`
  );

  console.log(
    `Opgeslagen in: ${outputPath}`
  );

  console.log("--------------------------------");
}

main().catch((error) => {
  console.error(
    "Import mislukt:"
  );

  console.error(error);

  process.exit(1);
});