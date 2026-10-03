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

const nonElectricKeywords = [
  "gashaard",
  "gaskachel",
  "houtkachel",
  "houthaard",
  "pelletkachel",
  "pellethaard",
  "bioethanol",
];

const blockedExactTags = new Set([
  "gas",
  "hout",
  "pellet",
  "pellets",
  "bioethanol",
]);

function normalizeFilterText(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function isElectricFireplace(product: {
  title?: string | null;
  slug?: string | null;
  productType?: string | null;
  tags?: string[] | null;
}) {
  const coreFields = [
    product.title,
    product.slug,
    product.productType,
  ].map(normalizeFilterText);

  if (
    coreFields.some((text) =>
      nonElectricKeywords.some((keyword) => text.includes(keyword))
    )
  ) {
    return false;
  }

  const tags = (product.tags ?? []).map(normalizeFilterText);

  if (
    tags.some(
      (tag) =>
        blockedExactTags.has(tag) ||
        nonElectricKeywords.some((keyword) => tag.includes(keyword))
    )
  ) {
    return false;
  }

  const title = normalizeFilterText(product.title);

  if (title.includes("tvmeubel")) {
    return false;
  }

  return true;
}

function cleanDescription(description?: string | null) {
  return (description ?? "")
    .replace(/diamondflame\.nl/gi, "Wallmade")
    .replace(/\bdiamondflame\b/gi, "Wallmade")
    .replace(/kom naar ons experience center in lunteren[^.]*\./gi, "")
    .replace(/bezoek ons experience center[^.]*\./gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
export const haardenCatalog: CatalogHaard[] =
  catalogData.products
    .filter((product) => product.price > 0 && isElectricFireplace(product))
    .map((product) => {
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

      brand: (product.vendor || "").toLowerCase() === "diamondflame.nl" ? ((product.title || "").trim().split(/\s+/)[0] || "Wallmade") : (product.vendor || "Wallmade"),

      productType: product.productType || "",

price: product.price === null ? null : product.price * 100,

oldPrice:
  product.compareAtPrice === null
    ? null
    : product.compareAtPrice * 100,

      currency: product.currency || "EUR",

      description: cleanDescription(product.description),

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