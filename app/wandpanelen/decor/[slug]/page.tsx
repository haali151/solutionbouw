import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DecorProductClient from "./DecorProductClient";
import { getDecorBySlug } from "../../../DATA/decor-catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

function cleanText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenDescription(value: string, maxLength = 155) {
  if (value.length <= maxLength) return value;

  const cut = value.lastIndexOf(" ", maxLength);
  return `${value.slice(0, cut > 0 ? cut : maxLength).trim()}…`;
}

function absoluteImage(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://wallmade.nl${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getDecorBySlug(slug);

  if (!product) {
    return {
      title: "Decor wandpaneel niet gevonden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const sourceDescription = cleanText(product.description || "");

  const fallbackDescription =
    `${product.name} van ${product.brand}. Bekijk dit decor wandpaneel bij Wallmade, inclusief prijs, afbeeldingen en productinformatie.`;

  const description = shortenDescription(
    sourceDescription.length >= 70
      ? sourceDescription
      : fallbackDescription
  );

  const canonical = `/wandpanelen/decor/${slug}`;
  const image = product.images?.[0] ?? "/hero-cinewall.png";

  return {
    title: `${product.name} | Decor Wandpaneel`,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${product.name} | Wallmade`,
      description,
      url: `https://wallmade.nl${canonical}`,
      siteName: "Wallmade",
      locale: "nl_NL",
      type: "website",
      images: [
        {
          url: image,
          alt: `${product.name} decor wandpaneel`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Wallmade`,
      description,
      images: [image],
    },
  };
}

export default async function DecorProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getDecorBySlug(slug);

  if (!product) {
    notFound();
  }

  const baseUrl = "https://wallmade.nl";
  const productUrl = `${baseUrl}/wandpanelen/decor/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description: cleanText(product.description || ""),

    category: product.productType || "Decor wandpaneel",

    image: product.images.map(absoluteImage),

    brand: {
      "@type": "Brand",
      name: product.brand,
    },

    url: productUrl,

    ...(product.price !== null
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: product.currency || "EUR",
            price: product.price,
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wandpanelen",
        item: `${baseUrl}/wandpanelen`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Decor",
        item: `${baseUrl}/wandpanelen#decor`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <DecorProductClient params={params} />
    </>
  );
}
