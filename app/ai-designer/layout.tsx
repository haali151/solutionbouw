import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "AI Cinewall Designer | Ontwerp Jouw Cinewall";
const description =
  "Ontwerp jouw cinewall met de AI Designer van Wallmade. Ontdek ideeen voor een tv-wand die past bij jouw woonkamer en interieur.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ai-designer",
  },
  openGraph: {
    title,
    description,
    url: "https://wallmade.nl/ai-designer",
    siteName: "Wallmade",
    locale: "nl_NL",
    type: "website",
    images: ["/hero-cinewall.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-cinewall.png"],
  },
};

export default function AiDesignerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
