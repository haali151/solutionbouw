import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WandpaneelProductClient from "./WandpaneelProductClient";
import { getWandpaneelBySlug } from "../../DATA/wandpanelen-catalog";

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
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://wallmade.nl${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getWandpaneelBySlug(slug);

  if (!product) {
    return {
      title: "Wandpaneel niet gevonden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productType = product.productType || "Wandpaneel";

  const sourceDescription = cleanText(product.description || "");

  const description =
    sourceDescription.length >= 70
      ? sourceDescription.length > 155 ? `${sourceDescription.slice(0, sourceDescription.lastIndexOf(" ", 155)).trim()}…` : sourceDescription
      : `${product.name} van ${product.brand}. Bekijk dit ${productType.toLowerCase()} bij Wallmade, inclusief afbeeldingen, prijs en productinformatie.`;

  const canonical = `/wandpanelen/${slug}`;

  const image =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/hero-cinewall.png";

  return {
    title: `${product.name} | Wandpaneel`,

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
          alt: `${product.name} wandpaneel`,
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

export default async function WandpaneelProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getWandpaneelBySlug(slug);

  if (!product) {
    notFound();
  }

  const baseUrl = "https://wallmade.nl";
  const productUrl = `${baseUrl}/wandpanelen/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    description: cleanText(product.description || ""),

    category: product.productType || "Wandpaneel",

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
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <WandpaneelProductClient params={params} />
    </>
  );
}

