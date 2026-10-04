import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cinewall met Haard | Cinewall op Maat | Wallmade",
  description:
    "Ontdek een cinewall met elektrische haard op maat. Combineer jouw tv-wand met nissen, verlichting, wandpanelen en een passende sfeerhaard.",
  alternates: {
    canonical: "/cinewall-met-haard",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://wallmade.nl/cinewall-met-haard/#service",
      name: "Cinewall met elektrische haard op maat",
      serviceType: "Cinewall met elektrische haard laten maken",
      url: "https://wallmade.nl/cinewall-met-haard",
      provider: {
        "@type": "Organization",
        name: "Wallmade",
        url: "https://wallmade.nl",
      },
      areaServed: {
        "@type": "Country",
        name: "Nederland",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://wallmade.nl/cinewall-met-haard/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wat kost een cinewall met elektrische haard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De prijs hangt af van onder andere de breedte, het aantal nissen, de gekozen elektrische haard, afwerking en het tv-meubel. Via de configurator krijg je direct een prijsindicatie.",
          },
        },
        {
          "@type": "Question",
          name: "Kan ik zelf de elektrische haard kiezen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. In de configurator kun je uit verschillende elektrische sfeerhaarden en formaten kiezen.",
          },
        },
        {
          "@type": "Question",
          name: "Kan een cinewall met haard ook nissen krijgen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Je kunt een cinewall combineren met nissen, verlichting en verschillende afwerkingen.",
          },
        },
        {
          "@type": "Question",
          name: "Hoe lang duurt de montage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Veel cinewalls kunnen binnen één dag worden gemonteerd. De exacte duur hangt af van het ontwerp en de situatie in de ruimte.",
          },
        },
      ],
    },
  ],
};
export default function CinewallMetHaardPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE7] text-[#1C1A18]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="px-5 pb-16 pt-28 sm:px-8 md:pt-36 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
            Cinewall met elektrische haard
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-light tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Cinewall met haard op maat.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-black/55 sm:text-lg">
            Combineer jouw televisie met een elektrische sfeerhaard in één
            rustig geheel. Kies zelf de breedte, nissen, afwerking en het
            tv-meubel en stel een cinewall samen die bij jouw ruimte past.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cinewall-configurator"
              className="rounded-full bg-[#171513] px-7 py-4 text-sm font-medium !text-white" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
            >
              Stel jouw cinewall samen
            </Link>

            <Link
              href="/elektrische-haarden"
              className="rounded-full border border-black/15 px-7 py-4 text-sm font-medium"
            >
              Bekijk elektrische haarden
            </Link>
          </div>          <div className="mt-10 overflow-hidden rounded-[32px]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/projects/project-1.jpg"
                alt="Cinewall met elektrische haard op maat van Wallmade"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/55 p-5">
              <p className="text-sm font-medium">Vaak binnen 1 dag gemonteerd</p>
              <p className="mt-1 text-xs leading-5 text-black/50">
                Een complete cinewall zonder onnodig lang wachten.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/55 p-5">
              <p className="text-sm font-medium">Directe prijsindicatie</p>
              <p className="mt-1 text-xs leading-5 text-black/50">
                Stel jouw cinewall samen en zie direct wat jouw keuzes betekenen.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/55 p-5">
              <p className="text-sm font-medium">Ontwerp eerst jouw stijl</p>
              <p className="mt-1 text-xs leading-5 text-black/50">
                Bekijk ontwerpen of visualiseer jouw idee met onze AI Designer.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/cinewall-ontwerpen"
              className="underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              Bekijk cinewall ontwerpen
            </Link>

            <Link
              href="/ai-designer"
              className="underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              Probeer de AI Designer
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Haard geïntegreerd</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              De elektrische haard wordt onderdeel van het totale cinewall
              ontwerp voor een rustige en strakke uitstraling.
            </p>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Met of zonder nissen</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              Kies een eenvoudige uitvoering of combineer de haard met
              sfeervolle nissen en verlichting.
            </p>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Volledig samen te stellen</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              Pas de breedte, afwerking, haard en het tv-meubel aan op jouw
              interieur en ruimte.
            </p>
          </div>
        </div>

        <section className="mt-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
                Cinewall met sfeerhaard
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
                Een elektrische haard volledig geïntegreerd in jouw cinewall.
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-black/55 sm:text-base">
                Een cinewall met elektrische haard combineert televisie, sfeerhaard
                en wandafwerking in één ontwerp. De haard wordt afgestemd op de
                breedte en uitstraling van de cinewall, zodat televisie en haard
                samen één rustig geheel vormen.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-black/55 sm:text-base">
                Bij Wallmade kun je jouw cinewall samenstellen met verschillende
                aantallen nissen, verlichting, houtafwerking en een tv-meubel.
                Via de configurator zie je direct hoe jouw keuzes de prijsindicatie
                beïnvloeden.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/cinewall-configurator"
                  className="rounded-full bg-[#171513] px-6 py-3.5 text-sm font-medium !text-white" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
                >
                  Stel jouw cinewall samen
                </Link>

                <Link
                  href="/cinewall-ontwerpen"
                  className="rounded-full border border-black/15 px-6 py-3.5 text-sm font-medium"
                >
                  Bekijk ontwerpen
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white/50 p-7 sm:p-9">
              <h3 className="text-xl font-medium">
                Waarom een cinewall met elektrische haard?
              </h3>

              <div className="mt-6 space-y-5 text-sm leading-7 text-black/55">
                <p>
                  <strong className="font-medium text-black">
                    Eén geheel.
                  </strong>{" "}
                  Televisie, haard, nissen en afwerking worden als één ontwerp
                  samengesteld.
                </p>

                <p>
                  <strong className="font-medium text-black">
                    Sfeer zonder traditionele schoorsteen.
                  </strong>{" "}
                  Een elektrische sfeerhaard geeft het visuele effect van vuur
                  zonder een traditionele hout- of gashaard.
                </p>

                <p>
                  <strong className="font-medium text-black">
                    Maatwerk.
                  </strong>{" "}
                  De breedte, nissen, haard en afwerking kunnen worden aangepast
                  aan jouw ruimte en interieur.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
            Veelgestelde vragen
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
            Veelgestelde vragen over een cinewall met haard
          </h2>

          <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
                Wat kost een cinewall met elektrische haard?
                <span className="text-xl font-light transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
                De prijs hangt af van onder andere de breedte, het aantal nissen,
                de gekozen elektrische haard, afwerking en het tv-meubel. Via de
                configurator krijg je direct een prijsindicatie.
              </p>
            </details>

            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
                Kan ik zelf de elektrische haard kiezen?
                <span className="text-xl font-light transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
                Ja. In de configurator kun je uit verschillende elektrische
                sfeerhaarden en formaten kiezen.
              </p>
            </details>

            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
                Kan een cinewall met haard ook nissen krijgen?
                <span className="text-xl font-light transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
                Ja. Je kunt een cinewall combineren met nissen, verlichting en
                verschillende afwerkingen.
              </p>
            </details>

            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
                Hoe lang duurt de montage?
                <span className="text-xl font-light transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
                Veel cinewalls kunnen binnen één dag worden gemonteerd. De exacte
                duur hangt af van het ontwerp en de situatie in de ruimte.
              </p>
            </details>
          </div>
        </section>
        <div className="mt-8 rounded-[30px] bg-[#1A1816] p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4A77F]">
              Jouw cinewall
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
              Bekijk direct wat jouw combinatie kost.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Stel jouw cinewall met haard samen en bekijk direct een
              prijsindicatie.
            </p>
          </div>

          <Link
            href="/cinewall-configurator"
            className="mt-7 inline-flex rounded-full bg-[#B97848] px-7 py-4 text-sm font-medium text-white lg:mt-0"
          >
            Bereken mijn prijs
          </Link>
        </div>
      </section>
    </main>
  );
}