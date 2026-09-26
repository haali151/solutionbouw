import fs from "fs";
import path from "path";

const COLLECTION =
  "https://diamondflame.nl/collections/suede-akoestische-wandpanelen-kopen/products.json";

const outputPath = path.join(
  process.cwd(),
  "data",
  "suede-import.json"
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

  // Zelfde prijsstructuur als onze andere imports
  return number / 100;
}

async function main() {
  console.log(
    "Diamond Flame Suede wandpanelen ophalen..."
  );

  const response = await fetch(
    `${COLLECTION}?limit=250`
  );

  if (!response.ok) {
    throw new Error(
      `Ophalen mislukt: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  const products = data.products.map((product) => {
    const variants = (product.variants || []).map(
      (variant) => ({
        id: String(variant.id),
        title: variant.title || "",
        sku: variant.sku || "",
        available: variant.available ?? true,
        price: money(variant.price),
        compareAtPrice: money(
          variant.compare_at_price
        ),
      })
    );

    const prices = variants
      .map((variant) => variant.price)
      .filter((price) => price !== null);

    const comparePrices = variants
      .map((variant) => variant.compareAtPrice)
      .filter((price) => price !== null);

    return {
      id: String(product.id),

      slug: product.handle,

      title: product.title,

      vendor:
        product.vendor || "Diamondflame.nl",

      productType:
        product.product_type ||
        "Suede akoestisch wandpaneel",

      price: prices.length
        ? Math.min(...prices)
        : null,

      compareAtPrice: comparePrices.length
        ? Math.min(...comparePrices)
        : null,

      currency: "EUR",

      description:
        product.body_html || "",

      images: (product.images || []).map(
        (image) => image.src
      ),

      available: variants.some(
        (variant) => variant.available
      ),

      variants,

      sourceUrl:
        `https://diamondflame.nl/products/${product.handle}`,
    };
  });

  const output = {
    importedAt: new Date().toISOString(),
    source: COLLECTION,
    count: products.length,
    products,
  };

  fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2),
    "utf8"
  );

  console.log("--------------------------------");
  console.log(
    `Producten gevonden: ${products.length}`
  );
  console.log(
    `Opgeslagen in: ${outputPath}`
  );
  console.log("--------------------------------");
}

main().catch((error) => {
  console.error("Import mislukt:");
  console.error(error);
  process.exit(1);
});