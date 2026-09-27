"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  { image: "/projects/project-1.jpg", title: "Modern", subtitle: "Strak & rustig" },
  { image: "/projects/project-2.jpg", title: "Warm", subtitle: "Zacht & sfeervol" },
  { image: "/projects/project-3.jpg", title: "Minimalistisch", subtitle: "Clean & tijdloos" },
  { image: "/projects/project-4.jpg", title: "Luxe", subtitle: "Donker & verfijnd" },
  { image: "/projects/project-5.jpg", title: "Maatwerk", subtitle: "Volledig geïntegreerd" },
  { image: "/projects/project-6.jpg", title: "Ambient", subtitle: "Licht als detail" },
  { image: "/projects/project-7.jpg", title: "Warm hout", subtitle: "Natuurlijk & modern" },
];

export default function CinewallsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#F3EEE7] text-[#1C1A18]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F3EEE7]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="text-lg font-semibold tracking-[0.22em]">
            WALLMADE
          </Link>
          <Link
            href="/cinewall-configurator"
            className="rounded-full bg-[#171513] px-5 py-3 text-xs font-medium !text-white"
            style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
          >
            Prijs berekenen
          </Link>
        </div>
      </header>

      <section className="px-5 pb-8 pt-12 sm:px-8 lg:px-12 lg:pb-14 lg:pt-20">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#976746]">
            Cinewall inspiratie
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <h1 className="max-w-4xl text-[48px] font-light leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[92px]">
              Kies eerst jouw
              <span className="block text-[#A76C42]">stijl.</span>
            </h1>
            <p className="max-w-lg text-sm leading-7 text-black/50 sm:text-base">
              Bekijk onze Cinewall ontwerpen en gerealiseerde projecten. Vind een stijl
              die bij jouw ruimte past en stel daarna pas de afmetingen en opties samen.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.image}
                onClick={() => setSelected(index)}
                className={`group relative overflow-hidden rounded-[26px] bg-[#D8CEC0] text-left ${
                  index === 0 || index === 3 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className={index === 0 || index === 3 ? "aspect-[1.5/1]" : "aspect-[1/1]"}>
                  <Image
                    src={project.image}
                    alt={`${project.title} Cinewall`}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-7">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.23em] text-white/55">
                      {project.subtitle}
                    </p>
                    <h2 className="mt-2 text-2xl font-light sm:text-3xl">{project.title}</h2>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20">
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[30px] bg-[#1A1816] p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:p-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4A77F]">
                Jouw favoriet gevonden?
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light tracking-[-0.035em] sm:text-5xl">
                Maak het passend voor jouw muur.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                Kies daarna de breedte, haard, planken, verlichting en andere opties.
              </p>
            </div>
            <Link
              href="/cinewall-configurator"
              className="mt-7 inline-flex rounded-full bg-[#B97848] px-7 py-4 text-sm font-medium !text-white lg:mt-0"
              style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
            >
              Stel mijn Cinewall samen →
            </Link>
          </div>
        </div>
      </section>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected - 1 + projects.length) % projects.length);
            }}
            className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-3xl text-white"
          >
            ‹
          </button>

          <div
            className="relative h-[78dvh] w-[94vw] max-w-6xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={projects[selected].image}
              alt={projects[selected].title}
              fill
              sizes="94vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected + 1) % projects.length);
            }}
            className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-3xl text-white"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
