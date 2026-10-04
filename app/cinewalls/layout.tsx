import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinewall op Maat | Cinewall Laten Maken",

  description:
    "Cinewall op maat laten maken? Ontdek moderne cinewalls met elektrische sfeerhaard, verlichting, planken en tv-meubel. Stel jouw cinewall samen bij Wallmade.",

  alternates: {
    canonical: "/cinewalls",
  },

  openGraph: {
    title: "Cinewall op Maat | Wallmade",
    description:
      "Ontdek moderne cinewalls op maat met sfeerhaard, verlichting, planken en tv-meubel.",
    url: "https://wallmade.nl/cinewalls",
    siteName: "Wallmade",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/projects/project-1.jpg",
        width: 1200,
        height: 630,
        alt: "Cinewall op maat van Wallmade",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cinewall op Maat | Wallmade",
    description:
      "Ontdek moderne cinewalls op maat en stel jouw ideale tv-wand samen.",
    images: ["/projects/project-1.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://wallmade.nl/cinewalls/#webpage",
      url: "https://wallmade.nl/cinewalls",
      name: "Cinewall op Maat | Wallmade",
      description:
        "Cinewalls op maat met elektrische sfeerhaard, verlichting, planken en tv-meubel.",
      inLanguage: "nl-NL",
    },
    {
      "@type": "Service",
      "@id": "https://wallmade.nl/cinewalls/#service",
      name: "Cinewall op maat",
      serviceType: "Cinewall op maat laten maken",
      provider: {
        "@type": "Organization",
        name: "Wallmade",
        url: "https://wallmade.nl",
      },
      areaServed: {
        "@type": "Country",
        name: "Nederland",
      },
      url: "https://wallmade.nl/cinewalls",
    },
    {
      "@type": "FAQPage",
      "@id": "https://wallmade.nl/cinewalls/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wat kost een cinewall op maat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De prijs hangt af van onder andere de breedte, het aantal nissen, de elektrische haard, verlichting, houtafwerking en het tv-meubel. Via de configurator krijg je direct een prijsindicatie.",
          },
        },
        {
          "@type": "Question",
          name: "Kan ik een cinewall met elektrische haard kiezen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Je kunt in de configurator een elektrische sfeerhaard kiezen en deze combineren met jouw gewenste cinewall-uitvoering.",
          },
        },
        {
          "@type": "Question",
          name: "Welke opties kan ik zelf samenstellen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Je kunt onder andere de breedte, nissen, elektrische haard, verlichting, houtafwerking en het tv-meubel kiezen.",
          },
        },
        {
          "@type": "Question",
          name: "Hoe vraag ik een offerte aan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stel eerst jouw cinewall samen. Daarna kun je jouw configuratie en prijsindicatie rechtstreeks via WhatsApp naar Wallmade sturen.",
          },
        },
      ],
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
          name: "Cinewalls",
          item: "https://wallmade.nl/cinewalls",
        },
      ],
    },
  ],
};

export default function CinewallsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
