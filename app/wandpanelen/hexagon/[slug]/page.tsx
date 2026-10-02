import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HexagonProductClient from "./HexagonProductClient";
import { getHexagonBySlug } from "../../../DATA/hexagon-catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

function cleanText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteImage(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://wallmade.nl${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getHexagonBySlug(slug);

  if (!product) {
    return {
      title: "Hexagon wandpaneel niet gevonden",
      robots: { index: false, follow: false },
    };
  }

  const sourceDescription = cleanText(product.description || "");

  const description =
    sourceDescription.length >= 70
      ? sourceDescription.length > 155 ? `${sourceDescription.slice(0, sourceDescription.lastIndexOf(" ", 155)).trim()}…` : sourceDescription
      : `${product.name} van ${product.brand}. Bekijk dit hexagon wandpaneel bij Wallmade, inclusief prijs, afbeeldingen en productinformatie.`;

  const canonical = `/wandpanelen/hexagon/${slug}`;
  const image = product.images?.[0] ?? "/hero-cinewall.png";

  return {
    title: `${product.name} | Hexagon Wandpaneel`,

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
          alt: `${product.name} hexagon wandpaneel`,
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

export default async function HexagonProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getHexagonBySlug(slug);

  if (!product) {
    notFound();
  }

  const baseUrl = "https://wallmade.nl";
  const productUrl = `${baseUrl}/wandpanelen/hexagon/${slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: cleanText(product.description || ""),
    category: "Hexagon wandpaneel",
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
        name: "Hexagon",
        item: `${baseUrl}/wandpanelen#hexagon`,
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
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <HexagonProductClient params={params} />
    </>
  );
}

