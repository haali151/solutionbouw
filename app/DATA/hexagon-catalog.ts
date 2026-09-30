import catalogData from "../../data/hexagon-import.json";

export type CatalogHexagon = {
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

function getExtension(url: string) {
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

function cleanName(value: string) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const hexagonCatalog: CatalogHexagon[] =
  catalogData.products
    .filter(
      (product) =>
        product.price !== null &&
        product.price > 0
    )
    .map((product) => {
      const folderName =
        `${cleanName(product.slug)}-${product.id}`;

      const localImages = product.images.map(
        (image, index) => {
          const extension = getExtension(image);

          return `/hexagon/${folderName}/${String(
            index + 1
          ).padStart(2, "0")}${extension}`;
        }
      );

      return {
        id: product.id,
        slug: product.slug,
        name: product.title,
        brand: product.vendor || "Solutionbouw",
        productType:
          product.productType || "Hexagon wandpaneel",

        // Zelfde prijscorrectie als onze houten wandpanelen
        price:
          product.price !== null
            ? Math.round(product.price * 10000) / 100
            : null,

        oldPrice:
          product.compareAtPrice !== null
            ? Math.round(product.compareAtPrice * 10000) / 100
            : null,

        currency: product.currency || "EUR",
        description: product.description || "",
        images: localImages,
        available: product.available,

        variants: product.variants.map((variant) => ({
          ...variant,
          price:
            variant.price !== null
              ? Math.round(variant.price * 10000) / 100
              : null,
          compareAtPrice:
            variant.compareAtPrice !== null
              ? Math.round(variant.compareAtPrice * 10000) / 100
              : null,
        })),

        sourceUrl: product.sourceUrl,
      };
    });

export function getHexagonBySlug(slug: string) {
  return hexagonCatalog.find(
    (product) => product.slug === slug
  );
}

