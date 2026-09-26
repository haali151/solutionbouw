import catalogData from "../../data/suede-import.json";

export type CatalogSuede = {
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

export const suedeCatalog: CatalogSuede[] =
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

          return `/suede/${folderName}/${String(
            index + 1
          ).padStart(2, "0")}${extension}`;
        }
      );

      return {
        id: product.id,
        slug: product.slug,
        name: product.title,
        brand:
          product.vendor || "Solutionbouw",

        productType:
          product.productType ||
          "Suède akoestisch wandpaneel",

        // Prijscorrectie
        price:
          product.price !== null
            ? product.price * 100
            : null,

        oldPrice:
          product.compareAtPrice !== null
            ? product.compareAtPrice * 100
            : null,

        currency:
          product.currency || "EUR",

        description:
          product.description || "",

        images: localImages,

        available:
          product.available,

        // Ook variantprijzen corrigeren
        variants: product.variants.map(
          (variant) => ({
            ...variant,

            price:
              variant.price !== null
                ? variant.price * 100
                : null,

            compareAtPrice:
              variant.compareAtPrice !== null
                ? variant.compareAtPrice * 100
                : null,
          })
        ),

        sourceUrl:
          product.sourceUrl,
      };
    });

export function getSuedeBySlug(
  slug: string
) {
  return suedeCatalog.find(
    (product) =>
      product.slug === slug
  );
}