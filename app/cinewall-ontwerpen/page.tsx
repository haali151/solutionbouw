import type { Metadata } from "next";
import CinewallGallery from "./CinewallGallery";

export const metadata: Metadata = {
  title: "Cinewall Ontwerpen & Inspiratie | Wallmade",
  description:
    "Bekijk onze cinewall ontwerpen en doe inspiratie op voor jouw woonkamer. Moderne cinewalls met elektrische haard, houtpanelen, nissen en meer.",
  alternates: {
    canonical: "/cinewall-ontwerpen",
  },
};

export default function CinewallOntwerpenPage() {
  return (
    <main className="min-h-screen bg-[#f5f1ea]">
      {/* HERO */}
      <section className="px-5 pb-10 pt-28 text-center md:pb-14 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
            Inspiratie
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-black md:text-6xl">
            Cinewall Ontwerpen
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
            Ontdek onze cinewall ontwerpen en laat je inspireren voor jouw
            woonkamer. Van strakke, moderne ontwerpen tot cinewalls met
            elektrische haard, houtpanelen en sfeervolle nissen.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <CinewallGallery />
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 px-5 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Jouw ideale cinewall gevonden?
          </h2>

          <p className="mt-4 leading-7 text-black/60">
            Laat ons weten welk ontwerp je aanspreekt. We maken jouw cinewall
            volledig op maat.
          </p>

          <a
            href="/offerte"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Vraag een offerte aan
          </a>
        </div>
      </section>
    </main>
  );
}
