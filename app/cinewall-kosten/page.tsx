import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cinewall Kosten & Prijzen | Wat Kost een Cinewall? | Wallmade",
  description:
    "Wat kost een cinewall op maat? Bekijk de basisprijzen, ontdek welke keuzes de prijs bepalen en bereken direct jouw cinewall prijs bij Wallmade.",
  alternates: {
    canonical: "/cinewall-kosten",
  },
};

const prices = [
  {
    name: "Simple",
    description: "Strakke cinewall zonder nissen",
    price: "€ 1.400",
  },
  {
    name: "2 nissen",
    description: "1 nis aan iedere zijde",
    price: "€ 2.000",
  },
  {
    name: "4 nissen",
    description: "2 nissen aan iedere zijde",
    price: "€ 2.600",
  },
  {
    name: "6 nissen",
    description: "3 nissen aan iedere zijde",
    price: "€ 3.200",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://wallmade.nl/cinewall-kosten/#service",
      name: "Cinewall op maat",
      serviceType: "Cinewall op maat laten maken",
      url: "https://wallmade.nl/cinewall-kosten",
      provider: {
        "@type": "Organization",
        name: "Wallmade",
        url: "https://wallmade.nl",
      },
      areaServed: {
        "@type": "Country",
        name: "Nederland",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "1400",
        description: "Basisprijs voor een eenvoudige cinewall zonder nissen.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://wallmade.nl/cinewall-kosten/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wat kost een cinewall op maat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Een eenvoudige cinewall begint bij Wallmade vanaf €1.400 inclusief BTW. De uiteindelijke prijs hangt af van onder andere de breedte, het aantal nissen, de elektrische haard, het tv-meubel en extra afwerking.",
          },
        },
        {
          "@type": "Question",
          name: "Wat bepaalt de prijs van een cinewall?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De prijs wordt vooral bepaald door de breedte, het aantal nissen, de gekozen elektrische haard, het tv-meubel, houtafwerking, schilderwerk en extra stroompunten.",
          },
        },
        {
          "@type": "Question",
          name: "Is de elektrische haard inbegrepen in de basisprijs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De elektrische haard wordt apart gekozen. De prijs verschilt per model en formaat en wordt direct meegenomen in de prijsindicatie van de configurator.",
          },
        },
        {
          "@type": "Question",
          name: "Kan ik vooraf mijn cinewall prijs berekenen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Met de Wallmade configurator kun je jouw cinewall samenstellen en direct een prijsindicatie bekijken.",
          },
        },
      ],
    },
  ],
};

export default function CinewallKostenPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE7] text-[#1C1A18]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="px-5 pb-14 pt-28 sm:px-8 md:pt-36 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
            Cinewall kosten
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-light tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Wat kost een cinewall op maat?
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-black/55 sm:text-lg">
            Een cinewall bij Wallmade begint vanaf € 1.400 inclusief BTW.
            De uiteindelijke prijs hangt af van jouw formaat, nissen,
            elektrische haard, tv-meubel en afwerking.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cinewall-configurator"
              className="rounded-full bg-[#171513] px-7 py-4 text-sm font-medium !text-white"
              style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
            >
              Bereken mijn cinewall prijs
            </Link>

            <Link
              href="/cinewall-met-haard"
              className="rounded-full border border-black/15 px-7 py-4 text-sm font-medium"
            >
              Cinewall met haard bekijken
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
            Basisprijzen
          </p>

          <h2 className="mt-3 text-3xl font-light tracking-[-0.035em] sm:text-5xl">
            Cinewall prijzen per uitvoering
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
            Deze prijzen zijn de basisprijzen van de cinewall. Extra opties
            zoals een elektrische haard, tv-meubel of houtafwerking worden
            automatisch meegerekend in de configurator.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prices.map((item) => (
            <div
              key={item.name}
              className="rounded-[26px] border border-black/10 bg-white/55 p-6"
            >
              <p className="text-lg font-medium">{item.name}</p>

              <p className="mt-2 min-h-[48px] text-sm leading-6 text-black/50">
                {item.description}
              </p>

              <p className="mt-7 text-xs uppercase tracking-[0.18em] text-black/40">
                Basisprijs
              </p>

              <p className="mt-1 text-3xl font-medium tracking-tight">
                {item.price}
              </p>

              <p className="mt-1 text-xs text-black/40">incl. BTW</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Elektrische haard</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              De prijs verschilt per model en formaat. Kies jouw sfeerhaard
              direct in de configurator.
            </p>

            <Link
              href="/elektrische-haarden"
              className="mt-5 inline-flex text-sm font-medium underline decoration-black/20 underline-offset-4"
            >
              Bekijk elektrische haarden
            </Link>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Nissen & afwerking</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              Meer nissen, houtafwerking en aanvullende werkzaamheden hebben
              invloed op de uiteindelijke cinewall prijs.
            </p>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-white/50 p-7">
            <h2 className="text-xl font-medium">Vaak binnen 1 dag gemonteerd</h2>
            <p className="mt-3 text-sm leading-7 text-black/55">
              Veel cinewalls kunnen binnen één dag worden gemonteerd. De exacte
              duur hangt af van het ontwerp en de situatie op locatie.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="rounded-[30px] border border-black/10 bg-white/45 p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
            Wat zit erbij?
          </p>

          <h2 className="mt-3 text-3xl font-light tracking-[-0.035em] sm:text-5xl">
            Duidelijk voordat we beginnen.
          </h2>

          <div className="mt-8 grid gap-3 text-sm leading-7 text-black/60 sm:grid-cols-2">
            <p>✓ Montage van de cinewall</p>
            <p>✓ Montage van de televisie</p>
            <p>✓ Montage van de elektrische haard</p>
            <p>✓ Verlichting in de nissen</p>
            <p>✓ Voorbereiding van aansluitingen</p>
            <p>✓ Transport inbegrepen</p>
            <p>✓ BTW inbegrepen</p>
            <p>✓ Aanpassen bestaande bekabeling inbegrepen</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#976746]">
          Veelgestelde vragen
        </p>

        <h2 className="mt-3 max-w-3xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
          Veelgestelde vragen over cinewall kosten
        </h2>

        <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
              Wat kost een cinewall op maat?
              <span className="text-xl font-light transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
              Een eenvoudige cinewall begint bij Wallmade vanaf € 1.400
              inclusief BTW. Extra opties worden apart meegerekend.
            </p>
          </details>

          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
              Wat bepaalt de prijs van een cinewall?
              <span className="text-xl font-light transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
              Onder andere de breedte, het aantal nissen, de elektrische haard,
              het tv-meubel, houtafwerking, schilderwerk en extra stroompunten.
            </p>
          </details>

          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
              Is de elektrische haard inbegrepen?
              <span className="text-xl font-light transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
              De elektrische haard kies je apart. De prijs hangt af van het
              gekozen model en formaat.
            </p>
          </details>

          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium sm:text-lg">
              Kan ik mijn cinewall prijs direct berekenen?
              <span className="text-xl font-light transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
              Ja. Stel jouw cinewall samen in onze configurator en bekijk direct
              een prijsindicatie op basis van jouw keuzes.
            </p>
          </details>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:px-12">
        <div className="rounded-[30px] bg-[#1A1816] p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4A77F]">
              Jouw prijs
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
              Bereken jouw cinewall in enkele stappen.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Kies jouw model, formaat, haard en afwerking en bekijk direct een
              prijsindicatie.
            </p>
          </div>

          <Link
            href="/cinewall-configurator"
            className="mt-7 inline-flex rounded-full bg-[#B97848] px-7 py-4 text-sm font-medium !text-white lg:mt-0"
            style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
          >
            Bereken mijn prijs
          </Link>
        </div>
      </section>
    </main>
  );
}