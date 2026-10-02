import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HaardProductClient from "./HaardProductClient";
import { getHaardBySlug } from "../../DATA/haarden-catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getHaardBySlug(slug);

  if (!product) {
    return {
      title: "Sfeerhaard niet gevonden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${product.name} | Elektrische Sfeerhaard`;

  const description = `${product.name} van ${product.brand}. Bekijk deze elektrische sfeerhaard bij Wallmade, inclusief afbeeldingen, prijs en productinformatie.`;

  const canonical = `/elektrische-haarden/${slug}`;

  const image =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/hero-cinewall.png";

  return {
    title,

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
          alt: `${product.name} elektrische sfeerhaard`,
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

export default async function HaardProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getHaardBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `https://wallmade.nl/elektrische-haarden/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.productType || "Elektrische sfeerhaard",
    image: product.images ?? [],
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
            priceCurrency: "EUR",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <HaardProductClient params={params} />
    </>
  );
}
