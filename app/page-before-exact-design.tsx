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
  "Hallo Wallmade, ik ben geÃ¯nteresseerd in een Cinewall op maat. Ik ontvang graag meer informatie en bespreek graag de mogelijkheden voor mijn woonkamer.";

const whatsappUrl = `https://wa.me/31643583800?text=${encodeURIComponent(
  contactMessage
)}`;
const instagramUrl = "https://www.instagram.com/solutionbouw.nl/";
const emailUrl = `mailto:solutionbouw.official@gmail.com?subject=${encodeURIComponent(
  "Cinewall op maat â€“ informatie en offerte"
)}&body=${encodeURIComponent(contactMessage)}`;

type Channel = "whatsapp" | "instagram" | "email";

type Contact = {
  kind: Channel;
  name: string;
  detail: string;
  href: string;
};

const contacts: Contact[] = [
  {
    kind: "whatsapp",
    name: "WhatsApp",
    detail: "+31 6 43583800",
    href: whatsappUrl,
  },
  {
    kind: "instagram",
    name: "Instagram",
    detail: "@solutionbouw.nl",
    href: instagramUrl,
  },
  {
    kind: "email",
    name: "E-mail",
    detail: "solutionbouw.official@gmail.com",
    href: emailUrl,
  },
];

const navLinks = [
  ["Projecten", "#projecten"],
  ["AI Designer", "/ai-designer"],
  ["Sfeerhaarden", "/elektrische-haarden"],
  ["Wandpanelen", "/wandpanelen"],
  ["Contact", "#contact"],
] as const;

const styleCards = [
  {
    name: "Modern",
    text: "Strakke lijnen, rustige kleuren en een helder geheel.",
    image: projectImages[0],
  },
  {
    name: "Luxe",
    text: "Warme verlichting, diepe tinten en rijke afwerking.",
    image: projectImages[3],
  },
  {
    name: "Warm & Hout",
    text: "Natuurlijke materialen met een zachtere, warme uitstraling.",
    image: projectImages[6],
  },
];

function BrandMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#C79566]/50 bg-[#2A241F] text-[#F2E5D6] shadow-[0_8px_30px_rgba(0,0,0,0.18)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
        <path
          d="M8 14 15.8 34 24 17.5 32.2 34 40 14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ContactIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind: Channel;
  className?: string;
}) {
  if (kind === "whatsapp") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.95 11.95 0 0 0 5.79 1.48h.01C18.63 23.84 24 18.49 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3-1.2 3.7L7 8l3.8 1.3L12 13l1.2-3.7L17 8l-3.8-1.3L12 3Z" />
      <path d="m18.5 14-.7 2.1-2.1.7 2.1.7.7 2.1.7-2.1 2.1-.7-2.1-.7-.7-2.1Z" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: string }) {
  const common = "h-6 w-6 text-white/85 sm:h-7 sm:w-7";

  if (type === "diamond") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common} aria-hidden="true">
        <path d="m4 8 4-4h8l4 4-8 12L4 8Z" />
        <path d="M4 8h16M8 4l4 16 4-16" />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19 13.5v-3l-2-.7a6 6 0 0 0-.8-1.8l.9-1.9-2.2-2.2-1.9.9a6 6 0 0 0-1.8-.8L10.5 2h-3l-.7 2a6 6 0 0 0-1.8.8l-1.9-.9L.9 6.1 1.8 8a6 6 0 0 0-.8 1.8l-2 .7v3l2 .7a6 6 0 0 0 .8 1.8l-.9 1.9 2.2 2.2 1.9-.9a6 6 0 0 0 1.8.8l.7 2h3l.7-2a6 6 0 0 0 1.8-.8l1.9.9 2.2-2.2-.9-1.9a6 6 0 0 0 .8-1.8l2-.7Z" transform="translate(2 0) scale(.83)" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common} aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.6 2.8 7.7 7 10 4.2-2.3 7-5.4 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common} aria-hidden="true">
      <path d="m5 18 13-13 2 2L7 20H4v-3Z" />
      <path d="m9 14 2 2m1-5 2 2m1-5 2 2" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[#B97848]" />
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#9A6A46]">
        {children}
      </p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const menuRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!menuOpen && selectedProject === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
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
      current === null
        ? null
        : (current + direction + projectImages.length) % projectImages.length
    );
  }

  return (
    <main lang="nl" className="min-h-screen overflow-x-hidden bg-[#F3EEE7] text-[#1C1A18]">
      {/* HERO */}
      <section id="home" className="relative min-h-[68svh] overflow-hidden bg-[#171513] text-white sm:min-h-[100svh]">
        <Image
          src={heroImage}
          alt="Wallmade Cinewall in een moderne woonkamer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_46%] sm:object-center"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/50 to-transparent" />

        <header className="absolute inset-x-0 top-0 z-40 px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between">
            <a href="#home" className="block" aria-label="Wallmade home">
              <p className="text-[20px] font-medium uppercase tracking-[0.2em] sm:text-2xl">
                <span className="text-white">WALL</span><span className="text-[#C88A58]">MADE</span>
              </p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.34em] text-white/60 sm:text-[9px]">
                Cinewalls & interieur
              </p>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              {navLinks.map(([name, href]) =>
                href.startsWith("#") ? (
                  <a key={name} href={href} className="transition hover:text-white">
                    {name}
                  </a>
                ) : (
                  <Link key={name} href={href} className="transition hover:text-white">
                    {name}
                  </Link>
                )
              )}

              <Link
                href="/cinewall-configurator"
                className="rounded-full bg-[#B97848] px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#C98A5B]"
              >
                Bereken prijs
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu openen"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-xl lg:hidden"
            >
              <span className="flex flex-col gap-[6px]">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </span>
            </button>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[68svh] items-end px-5 pb-8 pt-28 sm:min-h-[100svh] sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D7A779]" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/75 sm:text-xs">
                  Cinewalls op maat
                </p>
              </div>

              <h1 className="mt-5 max-w-3xl text-[11.2vw] font-light leading-[0.94] tracking-[-0.05em] sm:text-7xl lg:text-[92px] lg:leading-[0.9]">
                Jouw ruimte.
                <span className="block text-[#D2A06F]">Onze expertise.</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/75 sm:text-base lg:text-lg">
                Premium cinewalls, sfeerhaarden en interieur op maat. Ontwerp het, visualiseer het en laat het bouwen.
              </p>

              <div className="mt-7 grid grid-cols-[1.08fr_0.92fr] gap-2.5 sm:flex sm:gap-3">
                <Link
                  href="/ai-designer"
                  className="group flex min-w-0 items-center justify-between rounded-full bg-[#C9854E] px-5 py-4 text-[13px] font-medium text-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#D39560] sm:min-w-[230px] sm:px-6 sm:text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                    <SparkIcon className="h-4 w-4 shrink-0" />
                    Ontwerp met AI
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0" />
                </Link>

                <a
                  href="#projecten"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-4 text-[13px] font-medium text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:min-w-[210px] sm:px-6 sm:text-sm"
                >
                  <span className="whitespace-nowrap">Bekijk projecten</span>
                  <ArrowIcon className="hidden h-4 w-4 shrink-0 sm:block" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="border-y border-white/10 bg-[#11100F] px-3 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-4">
          {[
            ["Maatwerk", "Voor jouw ruimte", "ruler"],
            ["Premium kwaliteit", "Duurzame materialen", "diamond"],
            ["Complete service", "Van A tot Z", "gear"],
            ["Betrouwbaar", "Heldere afspraken", "shield"],
          ].map(([title, text, icon], index) => (
            <div
              key={title}
              className={`flex min-h-[118px] flex-col items-center justify-center px-2 py-5 text-center ${index > 0 ? "border-l border-white/10" : ""}`}
            >
              <FeatureIcon type={icon} />
              <p className="mt-2 text-[10px] font-medium leading-4 text-white sm:text-sm">{title}</p>
              <p className="mt-0.5 text-[9px] leading-4 text-white/55 sm:text-xs">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projecten" className="bg-[#F3EEE7] px-5 py-14 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Echte projecten</SectionEyebrow>
              <h2 className="mt-4 text-[42px] font-light leading-none tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Onze projecten.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-black/50 sm:text-base">
                Laat je inspireren door echte cinewalls die wij hebben gerealiseerd.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProject(0)}
              className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-medium text-black/75 sm:flex"
            >
              Bekijk alle projecten <ArrowIcon />
            </button>
          </div>

          <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {[
              { label: "Modern", image: projectImages[0], project: 0 },
              { label: "Luxe", image: projectImages[3], project: 3 },
              { label: "Minimalistisch", image: projectImages[2], project: 2 },
            ].map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => setSelectedProject(item.project)}
                className="group relative h-[365px] min-w-[72vw] snap-start overflow-hidden rounded-[22px] bg-[#D8CEC0] text-left sm:h-[430px] sm:min-w-0 lg:h-[520px]"
              >
                <Image
                  src={item.image}
                  alt={`${item.label} Wallmade Cinewall`}
                  fill
                  sizes="(min-width: 640px) 33vw, 72vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white sm:p-6">
                  <p className="text-[22px] font-light sm:text-2xl">{item.label}</p>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-black/15 backdrop-blur-sm">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSelectedProject(0)}
            className="mt-4 flex w-full items-center justify-end gap-2 text-sm font-medium text-black/70 sm:hidden"
          >
            Bekijk alle projecten <ArrowIcon />
          </button>
        </div>
      </section>

      {/* AI DESIGNER */}
      <section className="bg-[#1B1917] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#24211E] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <SectionEyebrow>Wallmade AI</SectionEyebrow>
              <h2 className="mt-6 max-w-xl text-4xl font-light leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Zie het voordat we het bouwen.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Upload een foto van jouw woonkamer, kies jouw stijl en laat onze AI jouw nieuwe Cinewall visualiseren in jouw eigen ruimte.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {["Upload foto", "Kies stijl", "Visualiseer"].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4A77F]">0{index + 1}</p>
                    <p className="mt-2 text-sm text-white/80">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/ai-designer"
                className="group mt-8 flex w-full max-w-md items-center justify-between rounded-full bg-[#B97848] px-6 py-4 text-sm font-medium transition hover:bg-[#C98A5B]"
              >
                Start AI Designer
                <ArrowIcon />
              </Link>
            </div>

            <div className="relative min-h-[440px] lg:min-h-[620px]">
              <Image
                src={projectImages[6]}
                alt="Wallmade Cinewall visualisatie"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/15 bg-black/40 p-5 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Van idee naar visualisatie</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="max-w-sm text-xl font-light sm:text-2xl">Ontdek wat echt bij jouw ruimte past.</p>
                  <Link
                    href="/ai-designer"
                    aria-label="Open AI Designer"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B97848] text-white"
                  >
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES */}
      <section className="bg-[#E8DED1] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <SectionEyebrow>Vind jouw uitstraling</SectionEyebrow>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="text-4xl font-light tracking-[-0.04em] sm:text-5xl lg:text-7xl">Kies jouw stijl.</h2>
            <p className="max-w-md text-sm leading-7 text-black/50">
              Van strak en minimalistisch tot warm en uitgesproken. Kies een richting en bouw daarop verder.
            </p>
          </div>

          <div className="mt-9 flex snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {styleCards.map((style, index) => (
              <Link
                key={style.name}
                href="/cinewall-configurator"
                className="group relative h-[430px] min-w-[82vw] snap-start overflow-hidden rounded-[28px] bg-[#CFC2B2] sm:min-w-[58vw] lg:h-[560px] lg:min-w-0"
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 82vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">0{index + 1}</p>
                  <h3 className="mt-3 text-3xl font-light">{style.name}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{style.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-[#F3EEE7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <SectionEyebrow>Maak het compleet</SectionEyebrow>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.04em] sm:text-5xl lg:text-7xl">Meer dan alleen een Cinewall.</h2>

          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {[
              {
                title: "Sfeerhaarden",
                href: "/elektrische-haarden",
                image: projectImages[0],
                text: "Ontdek elektrische haarden die sfeer en rust aan jouw ruimte toevoegen.",
              },
              {
                title: "Wandpanelen",
                href: "/wandpanelen",
                image: projectImages[6],
                text: "Hout, Hexagon, SuÃ¨de en meer. Kies de afwerking die jouw interieur karakter geeft.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative min-h-[430px] overflow-hidden rounded-[28px] bg-[#D5C9BA] lg:min-h-[560px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Collectie</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-light sm:text-4xl">{item.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/60">{item.text}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 backdrop-blur">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#F3EEE7] px-5 pb-5 sm:px-8 lg:px-12 lg:pb-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative overflow-hidden rounded-[32px] bg-[#1A1816]">
            <Image
              src={projectImages[3]}
              alt="Wallmade Cinewall"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/62" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

            <div className="relative z-10 flex min-h-[540px] flex-col justify-end p-7 pb-28 text-white sm:p-10 sm:pb-28 lg:min-h-[620px] lg:p-14">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#D4A77F]">Jouw muur kan de volgende zijn</p>
              <h2 className="mt-5 max-w-4xl text-4xl font-light leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Van een idee naar een interieur dat klopt.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Start met een AI-visualisatie of bereken direct jouw Cinewall. Wij helpen je daarna verder met de realisatie.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ai-designer"
                  className="flex items-center justify-between rounded-full bg-[#B97848] px-6 py-4 text-sm font-medium sm:min-w-[220px]"
                >
                  Ontwerp met AI <ArrowIcon />
                </Link>
                <Link
                  href="/cinewall-configurator"
                  className="flex items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 py-4 text-sm font-medium backdrop-blur sm:min-w-[220px]"
                >
                  Bereken prijs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#F3EEE7] px-5 py-16 pb-36 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <SectionEyebrow>Persoonlijk contact</SectionEyebrow>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.04em] sm:text-5xl">Laten we jouw idee bouwen.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-black/50">
              Een vraag, een foto van jouw muur of al een concreet plan? Kies hoe je ons wilt bereiken.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {contacts.map((contact) => (
              <a
                key={contact.kind}
                href={contact.href}
                target={contact.kind === "email" ? undefined : "_blank"}
                rel={contact.kind === "email" ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-4 rounded-[24px] border border-black/[0.08] bg-white/55 p-5 transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1D1A18] text-white">
                  <ContactIcon kind={contact.kind} />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-medium">{contact.name}</p>
                  <p className="mt-1 truncate text-xs text-black/45">{contact.detail}</p>
                </div>
                <ArrowIcon className="ml-auto h-4 w-4 text-black/35 transition group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1816] px-5 pb-40 pt-12 text-white sm:px-8 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <BrandMark className="h-10 w-10" />
                <p className="text-base font-medium uppercase tracking-[0.22em]">Wallmade</p>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
                Cinewalls, interieur en visualisatie met AI. Van eerste idee tot strakke montage.
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Ontdek</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                <Link href="/ai-designer" className="hover:text-white">AI Designer</Link>
                <Link href="/cinewall-configurator" className="hover:text-white">Cinewalls</Link>
                <Link href="/elektrische-haarden" className="hover:text-white">Sfeerhaarden</Link>
                <Link href="/wandpanelen" className="hover:text-white">Wandpanelen</Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Contact</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/65">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                <a href={emailUrl} className="hover:text-white">E-mail</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>Â© 2026 Wallmade</p>
            <p>Cinewalls & interieur op maat</p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      {!menuOpen && selectedProject === null && (
        <div
          className="fixed left-3 right-3 z-[90] grid grid-cols-[1.15fr_0.95fr_auto] gap-1.5 rounded-full border border-white/10 bg-[#151412]/95 p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)" }}
        >
          <Link
            href="/ai-designer"
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#B97848] px-3 py-3.5 text-[12px] font-medium text-white"
          >
            <SparkIcon className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Ontwerp met AI</span>
          </Link>

          <Link
            href="/cinewall-configurator"
            className="flex min-w-0 items-center justify-center rounded-full bg-white/[0.04] px-3 py-3.5 text-[12px] font-medium text-white"
          >
            <span className="whitespace-nowrap">Bereken prijs</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#25D366] text-white"
          >
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
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-black/95 p-0 text-white backdrop:bg-black/80"
      >
        {selectedProject !== null && (
          <div
            className="flex h-full items-center justify-center p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/45 text-2xl"
              aria-label="Galerij sluiten"
            >
              Ã—
            </button>

            <button
              type="button"
              onClick={() => moveProject(-1)}
              className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/55"
              aria-label="Vorige project"
            >
              â†
            </button>

            <div className="relative h-[80dvh] w-[92vw] max-w-6xl overflow-hidden rounded-2xl">
              <Image
                src={projectImages[selectedProject]}
                alt={`Wallmade project ${selectedProject + 1}`}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => moveProject(1)}
              className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/55"
              aria-label="Volgende project"
            >
              â†’
            </button>
          </div>
        )}
      </dialog>

      {/* MOBILE MENU */}
      <dialog
        ref={menuRef}
        onCancel={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto border-0 bg-black/80 p-3 text-white backdrop:bg-black/70"
      >
        <div className="rounded-[30px] border border-white/10 bg-[#1B1917] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <p className="text-sm uppercase tracking-[0.24em]">Wallmade</p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl"
              aria-label="Menu sluiten"
            >
              Ã—
            </button>
          </div>

          <nav className="mt-7 flex flex-col">
            {navLinks.map(([name, href]) =>
              href.startsWith("#") ? (
                <a
                  key={name}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-2xl font-light"
                >
                  {name}
                </a>
              ) : (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-2xl font-light"
                >
                  {name}
                </Link>
              )
            )}
          </nav>

          <Link
            href="/ai-designer"
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center justify-between rounded-full bg-[#B97848] px-6 py-4 text-sm font-medium"
          >
            Ontwerp met AI <ArrowIcon />
          </Link>
        </div>
      </dialog>
    </main>
  );
}



