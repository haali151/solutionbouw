"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImage = "/wallmade-hero.png";
const projectImages = Array.from(
  { length: 7 },
  (_, index) => `/projects/project-${index + 1}.jpg`
);

const contactMessage =
  "Hallo Wallmade, ik ben geïnteresseerd in een Cinewall of interieur op maat. Ik ontvang graag meer informatie en bespreek graag de mogelijkheden.";

const whatsappUrl = `https://wa.me/31643583800?text=${encodeURIComponent(contactMessage)}`;
const instagramUrl = "https://www.instagram.com/solutionbouw.nl/";
const emailUrl = `mailto:solutionbouw.official@gmail.com?subject=${encodeURIComponent(
  "Wallmade – informatie en offerte"
)}&body=${encodeURIComponent(contactMessage)}`;

type Channel = "whatsapp" | "instagram" | "email";

const navLinks = [
  ["Projecten", "#projecten"],
  ["Cinewall Ontwerpen", "/cinewall-ontwerpen"],
  ["Collectie", "#collectie"],
  ["AI Designer", "/ai-designer"],
  ["Stel jouw cinewall samen", "/cinewall-configurator"],
  ["Contact", "#contact"],
] as const;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 3-1.2 3.7L7 8l3.8 1.3L12 13l1.2-3.7L17 8l-3.8-1.3L12 3Z" />
      <path d="m18.5 14-.7 2.1-2.1.7 2.1.7.7 2.1.7-2.1 2.1-.7-2.1-.7-.7-2.1Z" />
    </svg>
  );
}

function ContactIcon({ kind, className = "h-5 w-5" }: { kind: Channel; className?: string }) {
  if (kind === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.95 11.95 0 0 0 5.79 1.48h.01C18.63 23.84 24 18.49 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {kind === "instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </>
      ) : (
        <>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
    </svg>
  );
}

function SectionEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-9 bg-[#B97848]" />
      <p className={`text-[10px] uppercase tracking-[0.25em] ${light ? "text-[#D4A77F]" : "text-[#946443]"}`}>
        {children}
      </p>
    </div>
  );
}

function Brand() {
  return (
    <div>
      <p className="text-[18px] font-medium uppercase tracking-[0.19em] sm:text-2xl">
        <span className="text-white">WALL</span>
        <span className="text-[#C98B5B]">MADE</span>
      </p>
      <p className="mt-1 text-[7px] uppercase tracking-[0.34em] text-white/60 sm:text-[9px]">
        Cinewalls & interieur
      </p>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!menuOpen && selectedProject === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen, selectedProject]);

  useEffect(() => {
    const dialog = menuRef.current;
    if (menuOpen && dialog && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog?.open) dialog.close();
  }, [menuOpen]);

  useEffect(() => {
    const dialog = galleryRef.current;
    if (selectedProject !== null && dialog && !dialog.open) dialog.showModal();
    if (selectedProject === null && dialog?.open) dialog.close();
  }, [selectedProject]);

  function moveProject(direction: number) {
    setSelectedProject((current) =>
      current === null ? null : (current + direction + projectImages.length) % projectImages.length
    );
  }

  const collections = [
    {
      title: "Cinewalls",
      subtitle: "Bekijk ontwerpen",
      text: "Van minimalistisch tot uitgesproken. Bekijk eerst onze Cinewall stijlen en gerealiseerde projecten.",
      href: "/cinewalls",
      image: projectImages[0],
      large: true,
    },
    {
      title: "Sfeerhaarden",
      subtitle: "Warmte zonder compromis",
      text: "Elektrische haarden in verschillende maten en stijlen.",
      href: "/elektrische-haarden",
      image: "/wallmade-fireplace-card.png",
      large: false,
    },
    {
      title: "Wandpanelen",
      subtitle: "Textuur & karakter",
      text: "Decoratieve wandpanelen voor een complete afwerking.",
      href: "/wandpanelen",
      image: "/wallmade-wandpanelen-card.png",
      large: false,
    },
  ];

  const contacts = [
    { kind: "whatsapp" as Channel, name: "WhatsApp", detail: "+31 6 43583800", href: whatsappUrl },
    { kind: "instagram" as Channel, name: "Instagram", detail: "Wallmade op Instagram", href: instagramUrl },
    { kind: "email" as Channel, name: "E-mail", detail: "Neem contact op", href: emailUrl },
  ];

  return (
    <main lang="nl" className="min-h-screen overflow-x-hidden bg-[#F3EEE7] text-[#1C1A18]">
      {/* HERO */}
      <section id="home" className="relative min-h-[52svh] overflow-hidden bg-[#171513] text-white sm:min-h-[100svh]">
        <Image src={heroImage} alt="Wallmade interieur" fill priority sizes="100vw"
          className="object-cover object-[72%_center]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />

        <header className="absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-7">
          <div className="mx-auto flex max-w-[1500px] items-start justify-between">
            <a href="#home"><Brand /></a>
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Menu openen"
              className="fixed right-5 top-5 z-[200] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#171513]/90 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:scale-105 lg:hidden">
              <span className="flex flex-col gap-[6px]">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </span>
            </button>
          </div>
        </header>

        <div className="absolute inset-x-0 bottom-2 z-20 px-5 sm:bottom-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="max-w-xl">
              <SectionEyebrow light>Cinewalls & interieur op maat</SectionEyebrow>
              <h1 className="mt-2 text-[8.4vw] font-light leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[88px]">
                Cinewall op maat.
                <span className="block text-[#D39A68]">Voor jouw ruimte.</span>
              </h1>
              <p className="mt-3 max-w-[335px] text-[12.5px] leading-[1.5] text-white/80 sm:max-w-xl sm:text-base">
                Ontdek cinewalls op maat met sfeerhaard, wandpanelen en interieurafwerking.
                Visualiseer jouw ontwerp met onze AI Designer en vraag eenvoudig een offerte aan.
              </p>
              <div className="mt-4 grid grid-cols-[1.08fr_0.92fr] gap-2.5 sm:flex">
                <Link href="/ai-designer"
                  className="flex h-[52px] items-center justify-between rounded-full bg-[#CE8B50] px-5 text-[12px] font-medium !text-white sm:h-14 sm:min-w-[230px] sm:text-sm">
                  <span className="flex items-center gap-2 whitespace-nowrap"><SparkIcon className="h-4 w-4" />Ontwerp met AI</span>
                  <ArrowIcon />
                </Link>
                <a href="#projecten"
                  className="flex h-[52px] items-center justify-center gap-3 rounded-full border border-white/25 bg-black/35 px-4 text-[12px] font-medium !text-white backdrop-blur-md sm:h-14 sm:min-w-[210px] sm:text-sm">
                  Bekijk projecten <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/10 bg-[#11100F] text-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-4">
          {[
            ["Maatwerk", "Voor jouw ruimte"],
            ["Echte projecten", "Bekijk ons werk"],
            ["Compleet", "Van ontwerp tot montage"],
            ["Direct contact", "Persoonlijk via WhatsApp"],
          ].map(([title, text], i) => (
            <div key={title}
              className={`flex min-h-[82px] flex-col items-center justify-center px-1.5 py-3 text-center sm:min-h-[110px] ${i ? "border-l border-white/10" : ""}`}>
              <p className="text-[9px] font-medium sm:text-sm">{title}</p>
              <p className="mt-1 text-[7px] leading-3 text-white/45 sm:text-xs">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projecten" className="bg-[#F3EEE7] px-4 pb-9 pt-7 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SectionEyebrow>Echte projecten</SectionEyebrow>
              <h2 className="mt-2 text-[34px] font-light leading-none tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Onze projecten.
              </h2>
            </div>
            <button type="button" onClick={() => setSelectedProject(0)}
              className="mt-1 flex shrink-0 items-center gap-1 text-[8px] font-medium text-black/70 sm:text-sm">
              Bekijk alle <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 max-w-[310px] text-[12px] leading-[1.45] text-black/50 sm:max-w-xl sm:text-base">
            Bekijk gerealiseerde cinewalls en maatwerkinterieurs, gebouwd en afgewerkt door Wallmade.
          </p>

          <div className="-mx-1 mt-5 flex gap-2 overflow-hidden">
            {[
              { label: "Modern", image: projectImages[0], project: 0 },
              { label: "Luxe", image: projectImages[3], project: 3 },
              { label: "Minimalistisch", image: projectImages[2], project: 2 },
            ].map((item) => (
              <button type="button" key={item.label} onClick={() => setSelectedProject(item.project)}
                className="group relative h-[158px] min-w-[31%] flex-1 overflow-hidden rounded-[12px] bg-[#D8CEC0] text-left sm:h-[430px]">
                <Image src={item.image} alt={`${item.label} Wallmade project`} fill
                  sizes="(min-width: 640px) 33vw, 31vw"
                  className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2.5 text-white sm:p-6">
                  <p className="text-[11px] font-light sm:text-2xl">{item.label}</p>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-black/20 sm:h-11 sm:w-11">
                    <ArrowIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collectie" className="bg-[#E8DED1] px-4 py-12 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <SectionEyebrow>Ontdek Wallmade</SectionEyebrow>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-[36px] font-light leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Meer dan <span className="text-[#A76C42]">Cinewalls.</span>
            </h2>
            <p className="max-w-md text-sm leading-6 text-black/50">
              Combineer een cinewall op maat met een elektrische sfeerhaard en wandpanelen voor een compleet interieur dat bij jouw ruimte past.
            </p>
          </div>

          <div className="mt-7 grid gap-3 lg:grid-cols-2 lg:grid-rows-2">
            {collections.map((item) => (
              <Link key={item.title} href={item.href}
                className={`group relative overflow-hidden rounded-[22px] bg-[#CFC3B4] ${item.large ? "min-h-[340px] lg:row-span-2 lg:min-h-[650px]" : "min-h-[245px] lg:min-h-0"}`}>
                <Image src={item.image} alt={item.title} fill
                  sizes={item.large ? "(min-width:1024px) 50vw,100vw" : "(min-width:1024px) 50vw,100vw"}
                  className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#E3B58D]">{item.subtitle}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-light sm:text-4xl">{item.title}</h3>
                      <p className="mt-2 max-w-md text-[11px] leading-5 text-white/60 sm:text-sm">{item.text}</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 backdrop-blur">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="bg-[#171513] px-4 py-12 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionEyebrow light>Wallmade AI</SectionEyebrow>
              <h2 className="mt-4 max-w-xl text-[38px] font-light leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Zie jouw cinewall <span className="text-[#D39A68]">vóór</span> we bouwen.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-6 text-white/55 sm:text-base">
                Upload een foto van jouw ruimte, kies jouw stijl en wensen en bekijk een AI-visualisatie van jouw nieuwe cinewall.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {["Upload foto", "Kies wensen", "Bekijk ontwerp"].map((item, index) => (
                  <div key={item} className="rounded-[16px] border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                    <p className="text-[9px] tracking-[0.2em] text-[#D4A77F]">0{index + 1}</p>
                    <p className="mt-2 text-[10px] leading-4 text-white/75 sm:text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/ai-designer"
                className="mt-7 flex h-[54px] w-full max-w-sm items-center justify-between rounded-full bg-[#B97848] px-6 text-sm font-medium !text-white">
                Ontwerp mijn ruimte <ArrowIcon />
              </Link>
            </div>

            <div className="relative h-[310px] overflow-hidden rounded-[24px] sm:h-[520px]">
              <Image src={projectImages[6]} alt="Wallmade AI visualisatie" fill
                sizes="(min-width:1024px) 55vw,100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[18px] border border-white/15 bg-black/25 p-4 backdrop-blur-xl">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/45">Jouw ruimte. Jouw ontwerp.</p>
                  <p className="mt-1 text-sm font-light sm:text-lg">Van foto naar inspiratie.</p>
                </div>
                <SparkIcon className="h-5 w-5 text-[#D39A68]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <section className="bg-[#F3EEE7] px-4 py-12 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-[#E8DED1] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <SectionEyebrow>Jouw Cinewall</SectionEyebrow>
              <h2 className="mt-4 text-[36px] font-light leading-[1] tracking-[-0.045em] sm:text-6xl">
                Stel hem zelf samen.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-black/50">
                Kies de breedte, TV, sfeerhaard, nissen, hout, verlichting en meubel. Bekijk daarna direct jouw prijsindicatie.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Breedte", "TV", "Sfeerhaard", "Nissen", "Hout", "Verlichting", "TV-meubel"].map((item) => (
                  <span key={item} className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-[10px] text-black/60 sm:text-xs">
                    {item}
                  </span>
                ))}
              </div>

              <Link href="/cinewall-configurator"
                className="mt-7 flex h-[54px] w-full max-w-sm items-center justify-between rounded-full bg-[#1B1917] px-6 text-sm font-medium !text-white">
                Bereken mijn prijs <ArrowIcon />
              </Link>
            </div>

            <div className="relative h-[280px] sm:h-[420px] lg:h-full lg:min-h-[520px]">
              <Image src={projectImages[1]} alt="Wallmade Cinewall configurator" fill
                sizes="(min-width:1024px) 45vw,100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[10px] text-white backdrop-blur">
                Maatwerk • direct samenstellen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES - COMPACT */}
      <section className="bg-[#F3EEE7] px-4 pb-12 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Inspiratie</SectionEyebrow>
              <h2 className="mt-3 text-[34px] font-light tracking-[-0.045em] sm:text-5xl">Welke stijl past bij jou?</h2>
            </div>
          </div>

          <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4">
            {[
              ["Modern", projectImages[0]],
              ["Luxe", projectImages[3]],
              ["Minimalistisch", projectImages[2]],
              ["Warm hout", projectImages[6]],
            ].map(([name, image]) => (
              <Link key={name} href="/cinewalls"
                className="group relative h-[230px] min-w-[72vw] snap-start overflow-hidden rounded-[20px] sm:min-w-[42vw] lg:min-w-0 lg:h-[330px]">
                <Image src={image} alt={`${name} interieur`} fill
                  sizes="(min-width:1024px) 25vw,72vw"
                  className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white">
                  <p className="text-xl font-light">{name}</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#E8DED1] px-4 py-12 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <SectionEyebrow>Van idee tot oplevering</SectionEyebrow>
          <h2 className="mt-3 max-w-3xl text-[36px] font-light leading-[1] tracking-[-0.045em] sm:text-6xl">
            Eén duidelijk proces.
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-black/10 lg:grid-cols-4">
            {[
              ["01", "Ontwerp", "Vertel ons jouw wensen of start met AI."],
              ["02", "Offerte", "Vraag eenvoudig jouw offerte aan via WhatsApp."],
              ["03", "Planning", "Samen bepalen we het juiste moment."],
              ["04", "Montage", "Wij bouwen en werken alles strak af."],
            ].map(([number, title, text]) => (
              <div key={number} className="min-h-[170px] bg-[#F3EEE7] p-5 sm:min-h-[220px] sm:p-7">
                <p className="text-[10px] tracking-[0.2em] text-[#A76C42]">{number}</p>
                <h3 className="mt-6 text-xl font-light sm:text-2xl">{title}</h3>
                <p className="mt-2 text-[10px] leading-5 text-black/45 sm:text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#F3EEE7] px-4 py-4 sm:px-8 lg:px-12 lg:py-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[26px] sm:min-h-[560px]">
            <Image src={projectImages[3]} alt="Wallmade project" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-6 pb-24 text-white sm:min-h-[560px] sm:p-10 sm:pb-28 lg:p-14">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#D4A77F]">Klaar voor jouw cinewall?</p>
              <h2 className="mt-4 max-w-3xl text-[38px] font-light leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Van idee naar jouw cinewall op maat.
              </h2>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <Link href="/ai-designer"
                  className="flex h-[52px] items-center justify-between rounded-full bg-[#B97848] px-6 text-sm font-medium sm:min-w-[220px]">
                  Ontwerp met AI <ArrowIcon />
                </Link>
                <Link href="/cinewall-configurator"
                  className="flex h-[52px] items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-medium !text-white backdrop-blur sm:min-w-[220px]">
                  Stel jouw cinewall samen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#F3EEE7] px-4 py-12 pb-32 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <SectionEyebrow>Persoonlijk contact</SectionEyebrow>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-[36px] font-light leading-[1] tracking-[-0.045em] sm:text-5xl">
              Laten we jouw idee bouwen.
            </h2>
            <p className="max-w-md text-sm leading-6 text-black/50">
              Stuur een vraag, foto of idee. Wij denken met je mee.
            </p>
          </div>

          <div className="mt-7 grid gap-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <a key={contact.kind} href={contact.href}
                target={contact.kind === "email" ? undefined : "_blank"}
                rel={contact.kind === "email" ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-4 rounded-[18px] border border-black/[0.07] bg-white/50 p-4 transition hover:bg-white">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1D1A18] text-white">
                  <ContactIcon kind={contact.kind} className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="mt-0.5 truncate text-[10px] text-black/40 sm:text-xs">{contact.detail}</p>
                </div>
                <ArrowIcon className="ml-auto h-4 w-4 text-black/30" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171513] px-5 pb-36 pt-10 text-white sm:px-8 lg:px-12 lg:pb-14">
        <div className="mx-auto max-w-[1500px]">
          <Brand />
          <p className="mt-4 max-w-sm text-xs leading-6 text-white/40 sm:text-sm">
            Cinewalls, sfeerhaarden, wandpanelen en interieur op maat.
          </p>
          <p className="mt-1 text-[10px] text-white/25">
            Wallmade is onderdeel van H. Solution Bouw.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/10 pt-7 sm:grid-cols-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Ontdek</p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-white/60">
                <Link href="/ai-designer" className="!text-white">AI Designer</Link>
                <Link href="/cinewalls" className="!text-white">Cinewalls</Link>
                <Link href="/elektrische-haarden" className="!text-white">Sfeerhaarden</Link>
                <Link href="/wandpanelen" className="!text-white">Wandpanelen</Link>
              </div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Contact</p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-white/60">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="!text-white">WhatsApp</a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="!text-white">Instagram</a>
                <a href={emailUrl} className="!text-white">E-mail</a>
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Zekerheid</p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-white/60">
                <span>Prijzen incl. BTW</span>
                <span>Maatwerk voor jouw ruimte</span>
                <span>Direct persoonlijk contact</span>
                <span>KVK: 91293049</span>
              </div>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Informatie</p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-white/60">
                <Link href="/privacy" className="!text-white">Privacybeleid</Link>
                <Link href="/algemene-voorwaarden" className="!text-white">Algemene voorwaarden</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] text-white/25">
            <p>© 2026 Wallmade</p>
            <p>Interieur op maat</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BAR - ONGEWIJZIGD */}
      {!menuOpen && selectedProject === null && (
        <div className="fixed left-3 right-3 z-[90] grid grid-cols-[1.15fr_0.95fr_auto] gap-1.5 rounded-full border border-white/10 bg-[#151412]/95 p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)" }}>
          <Link href="/ai-designer"
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#B97848] px-3 py-3.5 text-[12px] font-medium !text-white">
            <SparkIcon className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Ontwerp met AI</span>
          </Link>
          <Link href="/cinewall-configurator"
            className="flex min-w-0 items-center justify-center rounded-full bg-white/[0.04] px-3 py-3.5 text-[12px] font-medium !text-white">
            <span className="whitespace-nowrap">Stel jouw cinewall samen</span>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#25D366] !text-white">
            <ContactIcon kind="whatsapp" className="h-5 w-5" />
          </a>
        </div>
      )}
      {/* LIGHTBOX */}
      <dialog
        ref={galleryRef}
        onCancel={() => setSelectedProject(null)}
        onClose={() => setSelectedProject(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveProject(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveProject(-1);
          }
        }}
        className="!fixed !inset-0 !m-0 !h-[100dvh] !max-h-none !w-[100dvw] !max-w-none !border-0 !bg-black !p-0 text-white backdrop:!bg-black"
      >
        {selectedProject !== null && (
          <div
            className="relative flex h-[100dvh] w-full items-center justify-center px-2 py-16 sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="fixed right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 shadow-lg backdrop-blur-md"
              aria-label="Galerij sluiten"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="relative flex w-full max-w-6xl items-center justify-center">
              <button
                type="button"
                onClick={() => moveProject(-1)}
                className="absolute left-1 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 shadow-lg backdrop-blur-md sm:left-4"
                aria-label="Vorige project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="relative h-[72dvh] w-[calc(100vw-16px)] max-w-6xl overflow-hidden">
                <Image
                  src={projectImages[selectedProject]}
                  alt={`Wallmade project ${selectedProject + 1}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => moveProject(1)}
                className="absolute right-1 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 shadow-lg backdrop-blur-md sm:right-4"
                aria-label="Volgende project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
              {selectedProject + 1} / {projectImages.length}
            </div>
          </div>
        )}
      </dialog>

      {/* MOBILE MENU */}
      <dialog ref={menuRef} onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false); }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto border-0 bg-black/80 p-3 text-white backdrop:bg-black/70">
        <div className="rounded-[30px] border border-white/10 bg-[#1B1917] p-6">
          <div className="flex items-center justify-between">
            <Brand />
            <button type="button" onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl !text-white"
              aria-label="Menu sluiten">×</button>
          </div>
          <nav className="mt-7 flex flex-col">
            {navLinks.map(([name, href]) =>
              href.startsWith("#") ? (
                <a key={name} href={href} onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-2xl font-light !text-white">{name}</a>
              ) : (
                <Link key={name} href={href} onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-2xl font-light !text-white">{name}</Link>
              )
            )}
          </nav>
          <Link href="/ai-designer" onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center justify-between rounded-full bg-[#B97848] px-6 py-4 text-sm font-medium !text-white">
            Ontwerp met AI <ArrowIcon />
          </Link>
        </div>
      </dialog>
    </main>
  );
}



