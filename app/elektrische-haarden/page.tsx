import type { Metadata } from "next";
import ElektrischeHaardenClient from "./ElektrischeHaardenClient";
import { haardenCatalog } from "../DATA/haarden-catalog";

export const metadata: Metadata = {
  title: "Elektrische Sfeerhaarden | Elektrische Haard Kopen",

  description:
    "Elektrische sfeerhaard kopen? Ontdek elektrische inbouwhaarden, cinewall haarden en moderne sfeerhaarden van diverse merken bij Wallmade.",

  keywords: [
    "elektrische sfeerhaard",
    "elektrische haard",
    "elektrische haard kopen",
    "elektrische inbouwhaard",
    "inbouwhaard elektrisch",
    "sfeerhaard",
    "sfeerhaard kopen",
    "sfeerhaard voor cinewall",
    "elektrische haard cinewall",
    "cinewall haard",
    "3-zijdige elektrische haard",
    "driezijdige sfeerhaard",
    "moderne elektrische haard",
    "elektrische haard woonkamer",
    "Wallmade sfeerhaard",
  ],

  alternates: {
    canonical: "/elektrische-haarden",
  },

  openGraph: {
    title: "Elektrische Sfeerhaarden | Wallmade",
    description:
      "Ontdek elektrische sfeerhaarden, inbouwhaarden en haarden voor jouw cinewall bij Wallmade.",
    url: "https://wallmade.nl/elektrische-haarden",
    siteName: "Wallmade",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url:
          haardenCatalog.find((product) => product.images?.[0])?.images?.[0] ??
          "/hero-cinewall.png",
        alt: "Elektrische sfeerhaarden van Wallmade",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Elektrische Sfeerhaarden | Wallmade",
    description:
      "Bekijk elektrische inbouwhaarden en sfeerhaarden voor cinewalls.",
    images: [
      haardenCatalog.find((product) => product.images?.[0])?.images?.[0] ??
        "/hero-cinewall.png",
    ],
  },
};

export default function ElektrischeHaardenPage() {
  const baseUrl = "https://wallmade.nl";

  const products = haardenCatalog.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}/elektrische-haarden/${product.slug}`,
    item: {
      "@type": "Product",
      name: product.name,
      url: `${baseUrl}/elektrische-haarden/${product.slug}`,
      image: product.images?.[0] ?? undefined,
      category: product.productType || "Elektrische sfeerhaard",
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      ...(product.price !== null
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `${baseUrl}/elektrische-haarden/${product.slug}`,
            },
          }
        : {}),
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${baseUrl}/elektrische-haarden/#collection`,
        url: `${baseUrl}/elektrische-haarden`,
        name: "Elektrische Sfeerhaarden",
        description:
          "Elektrische sfeerhaarden, elektrische inbouwhaarden en haarden voor cinewalls bij Wallmade.",
        inLanguage: "nl-NL",
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/elektrische-haarden/#products`,
        name: "Elektrische sfeerhaarden",
        numberOfItems: products.length,
        itemListElement: products,
      },
      {
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
            name: "Elektrische haarden",
            item: `${baseUrl}/elektrische-haarden`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <ElektrischeHaardenClient />
    </>
  );
}
