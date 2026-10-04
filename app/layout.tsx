import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContact from "./components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wallmade.nl"),

  title: {
    default: "Wallmade | Cinewalls, Sfeerhaarden & Wandpanelen",
    template: "%s | Wallmade",
  },

  description:
    "Cinewalls op maat, elektrische sfeerhaarden en stijlvolle wandpanelen. Ontdek Wallmade en creëer een unieke woonkamer die perfect bij jouw interieur past.",

  keywords: [
    "cinewall",
    "cinewall op maat",
    "cinewall laten maken",
    "cinewall Nederland",
    "tv wand",
    "tv wand op maat",
    "elektrische sfeerhaard",
    "elektrische haard",
    "sfeerhaard",
    "wandpanelen",
    "akoestische wandpanelen",
    "interieur op maat",
    "Wallmade",
  ],

  authors: [{ name: "Wallmade" }],
  creator: "Wallmade",
  publisher: "Wallmade",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://wallmade.nl",
    siteName: "Wallmade",
    title: "Wallmade | Cinewalls, Sfeerhaarden & Wandpanelen",
    description:
      "Cinewalls op maat, elektrische sfeerhaarden en stijlvolle wandpanelen voor een uniek interieur.",
    images: [
      {
        url: "/hero-cinewall.png",
        width: 1200,
        height: 630,
        alt: "Cinewall op maat van Wallmade",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wallmade | Cinewalls, Sfeerhaarden & Wandpanelen",
    description:
      "Cinewalls op maat, elektrische sfeerhaarden en stijlvolle wandpanelen.",
    images: ["/hero-cinewall.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {children}
        {/* <FloatingContact /> */}
      </body>
    </html>
  );
}