import catalogData from "../../data/wandpanelen-import.json";

export type CatalogWandpaneel = {
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
    const match = pathname.match(/\.(jpg|jpeg|png|webp|avif)$/i);

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

export const wandpanelenCatalog: CatalogWandpaneel[] =
  catalogData.products
    .filter((product) => product.price !== null && product.price > 0)
    .map((product) => {
      const folderName = `${cleanName(product.slug)}-${product.id}`;

      const localImages = product.images.map((image, index) => {
        const extension = getExtension(image);

        return `/wandpanelen/${folderName}/${String(index + 1).padStart(
          2,
          "0"
        )}${extension}`;
      });

      return {
        id: product.id,
        slug: product.slug,
        name: product.title,
        brand: product.vendor || "Wallmade",
        productType: product.productType || "Houten wandpaneel",
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
        variants: product.variants,
        sourceUrl: product.sourceUrl,
      };
    });

export const wandpanelenBrands = Array.from(
  new Set(
    wandpanelenCatalog
      .map((product) => product.brand)
      .filter(Boolean)
  )
).sort();

export function getWandpaneelBySlug(slug: string) {
  return wandpanelenCatalog.find(
    (product) => product.slug === slug
  );
}
