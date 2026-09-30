import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Cinewall Configurator | Stel Jouw Cinewall Samen";
const description =
  "Stel jouw cinewall op maat samen met de Wallmade configurator. Kies een elektrische haard en personaliseer jouw tv-wand voor jouw woonkamer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cinewall-configurator",
  },
  openGraph: {
    title,
    description,
    url: "https://wallmade.nl/cinewall-configurator",
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

export default function ConfiguratorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
