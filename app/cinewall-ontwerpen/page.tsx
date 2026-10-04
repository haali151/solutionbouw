import type { Metadata } from "next";
import CinewallGallery from "./CinewallGallery";

export const metadata: Metadata = {
  title: "Cinewall Ontwerpen & Inspiratie",
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
            Cinewall inspiratie
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-black md:text-6xl">
            Cinewall ontwerpen & inspiratie
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
            Bekijk verschillende cinewall ontwerpen en ontdek welke stijl bij
            jouw woonkamer past. Van strak en minimalistisch tot warm hout,
            sfeervolle nissen en een elektrische haard.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6">
        <CinewallGallery />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-6">
        <div className="rounded-[32px] border border-black/10 bg-white/40 p-7 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Ontdek jouw stijl
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-black md:text-5xl">
            Welke cinewall stijl past bij jou?
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
              <h3 className="text-lg font-semibold text-black">
                Strak & minimalistisch
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/55">
                Een rustige cinewall met strakke lijnen en een moderne,
                tijdloze uitstraling.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
              <h3 className="text-lg font-semibold text-black">
                Warm hout & wandpanelen
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/55">
                Combineer jouw cinewall met houtaccenten of wandpanelen voor
                extra warmte en karakter.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/60 p-6">
              <h3 className="text-lg font-semibold text-black">
                Met haard & nissen
              </h3>
              <p className="mt-3 text-sm leading-7 text-black/55">
                Kies een elektrische sfeerhaard en sfeervolle nissen voor een
                complete cinewall op maat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-black/10 px-5 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Jouw favoriete ontwerp gevonden?
          </h2>

          <p className="mt-4 leading-7 text-black/60">
            Stel jouw cinewall daarna zelf samen. Kies de breedte, nissen,
            elektrische haard, afwerking en andere opties.
          </p>

          <a
            href="/cinewall-configurator"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Stel jouw cinewall samen
          </a>
        </div>
      </section>
    </main>
  );
}
