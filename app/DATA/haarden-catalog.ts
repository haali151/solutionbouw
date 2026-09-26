import catalogData from "../../data/haarden-import.json";

export type CatalogHaard = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  productType: string;

  price: number | null;
  oldPrice: number | null;
  currency: string;

  description: string;

  images: string[];

  available: boolean;

  variants: {
    id: string;
    title: string;
    sku: string;
    available: boolean;
    price: number | null;
    compareAtPrice: number | null;
  }[];

  sourceUrl: string;
};

function safeName(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getExtension(imageUrl: string) {
  try {
    const pathname = new URL(imageUrl).pathname;
    const extension = pathname
      .split(".")
      .pop()
      ?.toLowerCase();

    if (
      extension &&
      ["jpg", "jpeg", "png", "webp", "avif"].includes(
        extension
      )
    ) {
      return extension;
    }
  } catch {}

  return "jpg";
}

export const haardenCatalog: CatalogHaard[] =
  catalogData.products.filter((product) => product.price > 0).map((product) => {
    const slug =
      safeName(product.slug || product.title) ||
      `product-${product.id}`;

    const folderName = `${slug}-${product.id}`;

    const localImages = product.images.map(
      (imageUrl, index) => {
        const extension = getExtension(imageUrl);

        const filename = `${String(index + 1).padStart(
          2,
          "0"
        )}.${extension}`;

        return `/haarden/${folderName}/${filename}`;
      }
    );

    return {
      id: product.id,

      slug: product.slug,

      name: product.title,

      brand: product.vendor || "Solutionbouw",

      productType: product.productType || "",

price: product.price === null ? null : product.price * 100,

oldPrice:
  product.compareAtPrice === null
    ? null
    : product.compareAtPrice * 100,

      currency: product.currency || "EUR",

      description: product.description || "",

      images: localImages,

      available: product.available,

      variants: product.variants,

      sourceUrl: product.sourceUrl,
    };
  });

export const haardenBrands = Array.from(
  new Set(
    haardenCatalog
      .map((product) => product.brand)
      .filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b));

export const haardenProductTypes = Array.from(
  new Set(
    haardenCatalog
      .map((product) => product.productType)
      .filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b));

export function getHaardBySlug(slug: string) {
  return haardenCatalog.find(
    (product) => product.slug === slug
  );
}