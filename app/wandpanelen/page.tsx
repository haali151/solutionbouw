import type { Metadata } from "next";
import WandpanelenClient from "./WandpanelenClient";

export const metadata: Metadata = {
  title: "Wandpanelen | Houten & Akoestische Wandpanelen",

  description:
    "Ontdek moderne wandpanelen bij Wallmade. Bekijk houten wandpanelen, akoestische panelen, hexagon panelen, suede wandpanelen en decoratieve wandbekleding.",

  alternates: {
    canonical: "/wandpanelen",
  },

  openGraph: {
    title: "Wandpanelen | Wallmade",
    description:
      "Ontdek houten, akoestische en decoratieve wandpanelen voor een moderne woonkamer en interieur.",
    url: "https://wallmade.nl/wandpanelen",
    siteName: "Wallmade",
    locale: "nl_NL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Wandpanelen | Wallmade",
    description:
      "Ontdek houten, akoestische en decoratieve wandpanelen bij Wallmade.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://wallmade.nl/wandpanelen/#collection",
      url: "https://wallmade.nl/wandpanelen",
      name: "Wandpanelen",
      description:
        "Houten wandpanelen, akoestische panelen, hexagon panelen, suede wandpanelen en decoratieve wandbekleding.",
      inLanguage: "nl-NL",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://wallmade.nl",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Wandpanelen",
          item: "https://wallmade.nl/wandpanelen",
        },
      ],
    },
  ],
};

export default function WandpanelenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <WandpanelenClient />
    </>
  );
}
