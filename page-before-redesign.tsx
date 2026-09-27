"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const heroImages = [
  "/hero-cinewall.png",
  "/cinewall-1.jpg",
  "/cinewall-2.jpg",
  "/cinewall-3.jpg",
  "/cinewall-4.jpg",
  "/cinewall-5.jpg",
  "/cinewall-9.jpg",
];

const projectImages = Array.from(
  { length: 7 },
  (_, i) => `/projects/project-${i + 1}.jpg`
);

const contactMessage =
  "Hallo Solutionbouw, ik ben geïnteresseerd in een Cinewall op maat. Ik ontvang graag meer informatie en bespreek graag de mogelijkheden voor mijn woonkamer.";

const whatsappUrl = `https://wa.me/31643583800?text=${encodeURIComponent(
  contactMessage
)}`;

const instagramUrl = "https://www.instagram.com/solutionbouw.nl/";

const emailUrl = `mailto:solutionbouw.official@gmail.com?subject=${encodeURIComponent(
  "Cinewall op maat – informatie en offerte"
)}&body=${encodeURIComponent(contactMessage)}`;

type Channel = "whatsapp" | "instagram" | "email";

const contacts: {
  kind: Channel;
  name: string;
  detail: string;
  href: string;
}[] = [
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
  ["Wandpanelen", "/wandpanelen"],
  ["Sfeerhaarden", "/elektrische-haarden"],
  ["AI Designer", "/ai-designer"],
  ["Contact", "#contact"],
];

function ContactIcon({
  kind,
  className = "h-6 w-6",
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
          <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
            stroke="none"
          />
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

function ContactBadge({ kind }: { kind: Channel }) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${
        kind === "whatsapp"
          ? "bg-[#25D366]"
          : kind === "email"
          ? "bg-[#242321]"
          : ""
      }`}
      style={
        kind === "instagram"
          ? {
              background:
                "radial-gradient(circle at 30% 105%, #fdf497 0%, #fd5949 40%, #d6249f 65%, #285aeb 100%)",
            }
          : undefined
      }
    >
      <ContactIcon kind={kind} />
    </span>
  );
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const menuRef = useRef<HTMLDialogElement>(null);
  const galleryRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => (current + 1) % heroImages.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

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

    if (menuOpen && dialog && !dialog.open) {
      dialog.showModal();
    }

    if (!menuOpen && dialog?.open) {
      dialog.close();
    }
  }, [menuOpen]);

  useEffect(() => {
    const dialog = galleryRef.current;

    if (selectedProject !== null && dialog && !dialog.open) {
      dialog.showModal();
    }

    if (selectedProject === null && dialog?.open) {
      dialog.close();
    }
  }, [selectedProject]);

  function moveProject(direction: number) {
    setSelectedProject((current) =>
      current === null
        ? null
        : (current + direction + projectImages.length) % projectImages.length
    );
  }

  return (
    <main
      lang="nl"
      className="min-h-screen overflow-hidden bg-[#F5F1EA] text-[#1D1D1B]"
    >
      {/* HERO */}

      <section
        id="home"
        className="relative min-h-[100svh] overflow-hidden bg-black text-white"
      >
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ${
              index === currentImage
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

        <header className="absolute inset-x-0 top-0 z-40 px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between">
            <a
              href="#home"
              translate="no"
              className="text-sm font-medium uppercase tracking-[0.35em] sm:text-base"
            >
              Solutionbouw
            </a>

            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              {navLinks.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  className="transition hover:text-white"
                >
                  {name}
                </a>
              ))}

              <a
                href="/cinewall-configurator"
                className="rounded-full bg-[#B97848] px-6 py-3 font-medium text-white transition hover:scale-[1.03] hover:bg-[#C78959]"
              >
                Ontwerp jouw Cinewall
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu openen"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl lg:hidden"
            >
              <span className="flex flex-col gap-[6px]">
                <span className="block h-px w-6 bg-white" />
                <span className="block h-px w-6 bg-white" />
              </span>
            </button>
          </div>
        </header>

        <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-36 pt-32 sm:px-8 lg:px-12 lg:pb-14">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="max-w-5xl">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#D6A477]" />

                <p className="text-[11px] uppercase tracking-[0.32em] text-white/70 sm:text-xs">
                  Cinewalls & interieur op maat
                </p>
              </div>

              <h1 className="mt-7 max-w-5xl text-[13.2vw] font-light leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-[105px] lg:leading-[0.86]">
                Zie het.
                <span className="block text-white/55">Ontwerp het.</span>
                <span className="block">Laat het bouwen.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg lg:text-xl">
                Visualiseer jouw nieuwe Cinewall met AI en laat hem daarna door
                Solutionbouw werkelijkheid worden.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ai-designer"
                  className="group flex items-center justify-between rounded-full bg-[#B97848] px-7 py-5 text-base font-medium text-white transition hover:bg-[#C78959] sm:min-w-[260px]"
                >
                  Ontwerp met AI
                  <span>→</span>
                </Link>

                <a
                  href="#projecten"
                  className="flex items-center justify-center rounded-full border border-white/25 bg-black/20 px-7 py-5 text-base backdrop-blur-xl transition hover:bg-white hover:text-black sm:min-w-[220px]"
                >
                  Bekijk projecten
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="mr-1 text-xs text-white/55">
                  Direct contact
                </span>

                {contacts.map((contact) => (
                  <a
                    key={contact.kind}
                    href={contact.href}
                    target={contact.kind === "email" ? undefined : "_blank"}
                    rel={
                      contact.kind === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    <ContactBadge kind={contact.kind} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 border-t border-white/15 lg:mt-16 lg:grid-cols-4">
              {[
                ["Maatwerk", "Voor jouw ruimte"],
                ["AI Designer", "Visualiseer vooraf"],
                ["Montage", "Van A tot Z"],
                ["Interieur", "Jouw stijl"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="border-b border-white/10 py-5 even:border-l even:pl-5 lg:border-b-0 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0"
                >
                  <p className="text-xs text-white/40">{title}</p>
                  <p className="mt-2 text-sm text-white/85 sm:text-base">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className="flex h-6 items-center"
                >
                  <span
                    className={`block h-[2px] transition-all duration-500 ${
                      currentImage === index
                        ? "w-16 bg-[#C98B5A]"
                        : "w-7 bg-white/25"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY */}

      <section className="border-b border-black/[0.08] bg-[#F5F1EA] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-6 flex items-center justify-between gap-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/40 sm:text-xs">
              Ontdek Solutionbouw
            </p>

            <span className="text-xs text-black/35">
              Kies waar je wilt beginnen
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {[
              ["Cinewalls", "/cinewall-configurator"],
              ["🔥 Sfeerhaarden", "/elektrische-haarden"],
              ["Wandpanelen", "/wandpanelen"],
              ["AI Designer", "/ai-designer"],
            ].map(([name, href], index) => (
              <Link
                key={href}
                href={href}
                className={`group flex min-w-[240px] items-center justify-between rounded-[26px] border px-5 py-6 transition duration-300 lg:min-w-0 ${
                  index === 3
                    ? "border-[#B97848] bg-[#B97848] text-white shadow-[0_12px_35px_rgba(185,120,72,0.18)] hover:-translate-y-1"
                    : "border-black/[0.07] bg-[#FAF7F2] hover:-translate-y-1 hover:bg-white"
                }`}
              >
                <div>
                  <p
                    className={`text-xs ${
                      index === 3 ? "text-white/55" : "text-black/30"
                    }`}
                  >
                    0{index + 1}
                  </p>

                  <p className="mt-2 text-lg font-light">{name}</p>
                </div>

                <span className="text-xl transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI */}

      <section className="relative bg-[#1D1D1B] px-5 pb-20 pt-10 text-white sm:px-8 sm:pt-14 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid overflow-hidden rounded-[34px] border border-white/10 bg-[#252421] lg:grid-cols-2">
            <div className="flex flex-col justify-center p-7 pb-32 sm:p-10 sm:pb-32 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#C98B5A]" />

                <p className="text-xs uppercase tracking-[0.3em] text-[#D1A57F]">
                  Solutionbouw AI
                </p>
              </div>

              <h2 className="mt-6 text-4xl font-light leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
                Jouw woonkamer.
                <span className="block text-white/45">
                  Jouw nieuwe Cinewall.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Upload een foto van jouw muur. Kies jouw richting. Laat AI
                binnen enkele stappen een nieuwe Cinewall visualiseren in jouw
                eigen ruimte.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["1. Upload foto", "2. Kies stijl", "3. Visualiseer"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <Link
                href="/ai-designer"
                className="group mt-9 flex w-full max-w-md items-center justify-between rounded-full bg-[#B97848] px-7 py-5 font-medium text-white transition hover:bg-[#C78959]"
              >
                Probeer AI Designer
                <span>→</span>
              </Link>
            </div>

            <div className="relative min-h-[480px] overflow-hidden lg:min-h-[620px]">
              <img
                src="/projects/project-7.jpg"
                alt="Solutionbouw Cinewall inspiratie"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-xl">
                AI Designer
              </div>

              <div className="absolute bottom-7 left-5 right-5 rounded-[24px] border border-white/15 bg-black/45 p-5 backdrop-blur-xl sm:left-8 sm:right-8">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Van idee naar visualisatie
                </p>

                <div className="mt-3 flex items-end justify-between gap-5">
                  <p className="max-w-sm text-xl font-light sm:text-2xl">
                    Ontdek eerst wat bij jouw ruimte past.
                  </p>

                  <Link
                    href="/ai-designer"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B97848]"
                  >
                    →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section
        id="projecten"
        className="bg-[#F5F1EA] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#9B7658]">
                Echt werk. Echte ruimtes.
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl lg:text-7xl">
                Onze projecten.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-black/50">
              Geen stockfoto&apos;s. Een selectie van Cinewalls die door
              Solutionbouw zijn gerealiseerd.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <button
              type="button"
              onClick={() => setSelectedProject(0)}
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-[30px]"
            >
              <img
                src={projectImages[0]}
                alt="Solutionbouw project 1"
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[650px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-left text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  Solutionbouw
                </p>

                <p className="mt-2 text-2xl font-light">Cinewall op maat</p>
              </div>
            </button>

            {[2, 3, 4, 5].map((number, index) => (
              <button
                type="button"
                key={number}
                onClick={() => setSelectedProject(number - 1)}
                className={`group relative overflow-hidden rounded-[26px] ${
                  index === 2 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={projectImages[number - 1]}
                  alt={`Solutionbouw project ${number}`}
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                    index === 2
                      ? "h-[240px] md:h-[315px]"
                      : "h-[200px] md:h-[315px]"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-7">
            <p className="text-sm text-black/45">
              Bekijk de projecten van dichtbij.
            </p>

            <button
              type="button"
              onClick={() => setSelectedProject(0)}
              className="flex items-center gap-3 text-sm"
            >
              Open galerij →
            </button>
          </div>
        </div>
      </section>

      {/* STYLES */}

      <section className="bg-[#E9DFD2] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8E684B]">
            Vind jouw uitstraling
          </p>

          <h2 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl lg:text-7xl">
            Kies jouw stijl.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-black/50">
            Swipe op mobiel en ontdek welke richting bij jouw interieur past.
          </p>

          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3">
            {[
              {
                name: "Modern",
                image: projectImages[0],
                text: "Strakke lijnen en een rustige uitstraling.",
              },
              {
                name: "Luxe",
                image: projectImages[3],
                text: "Warme verlichting en rijke afwerking.",
              },
              {
                name: "Warm & Hout",
                image: projectImages[6],
                text: "Natuurlijke materialen en extra sfeer.",
              },
            ].map((style, index) => (
              <a
                key={style.name}
                href="/cinewall-configurator"
                className="group relative h-[430px] min-w-[82vw] overflow-hidden rounded-[30px] sm:min-w-[60vw] lg:h-[560px] lg:min-w-0"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-xs text-white/45">0{index + 1}</p>

                  <h3 className="mt-3 text-3xl font-light">{style.name}</h3>

                  <p className="mt-3 max-w-xs text-sm text-white/60">
                    {style.text}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}

      <section
        id="producten"
        className="bg-[#F5F1EA] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9B7658]">
            Shop the look
          </p>

          <h2 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl lg:text-7xl">
            Maak het compleet.
          </h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {[
              [
                "Sfeerhaarden",
                "/elektrische-haarden",
                projectImages[0],
                "Bekijk de volledige collectie",
              ],
              [
                "Wandpanelen",
                "/wandpanelen",
                projectImages[6],
                "Hout, Hexagon, Suède en meer",
              ],
            ].map(([title, href, image, subtitle]) => (
              <a
                key={href}
                href={href}
                className="group relative min-h-[420px] overflow-hidden rounded-[30px] lg:min-h-[580px]"
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute bottom-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                    Collectie
                  </p>

                  <h3 className="mt-3 text-3xl font-light">{title}</h3>

                  <p className="mt-3 text-sm text-white/60">{subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}

      <section className="border-y border-black/10 bg-[#E3D5C4] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-4">
          {[
            "Maatwerk",
            "Persoonlijk contact",
            "Strakke afwerking",
            "Van ontwerp tot montage",
          ].map((title, index) => (
            <div
              key={title}
              className="border-black/10 py-8 odd:pr-4 even:border-l even:pl-5 lg:border-l lg:px-7"
            >
              <p className="text-xs text-black/35">0{index + 1}</p>
              <p className="mt-4 text-sm text-black/75">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="bg-[#F5F1EA] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative overflow-hidden rounded-[36px]">
            <img
              src={projectImages[3]}
              alt="Solutionbouw Cinewall"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 flex min-h-[580px] flex-col justify-end p-7 pb-32 text-white sm:p-10 sm:pb-32 lg:p-14">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D6A477]">
                Jouw muur kan de volgende zijn
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-light sm:text-6xl lg:text-7xl">
                Van een idee
                <span className="block text-white/55">
                  naar jouw nieuwe interieur.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
                Start met AI voor inspiratie of configureer jouw Cinewall.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ai-designer"
                  className="flex items-center justify-between rounded-full bg-[#B97848] px-7 py-5 font-medium"
                >
                  Ontwerp met AI
                  <span>→</span>
                </Link>

                <a
                  href="/cinewall-configurator"
                  className="flex items-center justify-center rounded-full border border-white/25 bg-black/20 px-7 py-5"
                >
                  Configureer Cinewall
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="bg-[#F5F1EA] px-5 py-16 pb-36 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9B7658]">
            Persoonlijk contact
          </p>

          <h2 className="mt-4 text-4xl font-light">
            Laten we jouw idee bouwen.
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {contacts.map((contact) => (
              <a
                key={contact.kind}
                href={contact.href}
                target={contact.kind === "email" ? undefined : "_blank"}
                rel={
                  contact.kind === "email" ? undefined : "noopener noreferrer"
                }
                className="flex items-center gap-4 rounded-3xl border border-black/10 bg-white/70 p-5"
              >
                <ContactBadge kind={contact.kind} />

                <div>
                  <h3 className="text-lg">{contact.name}</h3>
                  <p className="mt-1 break-all text-xs text-black/45">
                    {contact.detail}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#1D1D1B] px-5 pb-44 pt-12 text-white sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <p
            translate="no"
            className="text-lg font-medium uppercase tracking-[0.3em]"
          >
            Solutionbouw
          </p>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
            Cinewalls, interieur en visualisatie met AI. Van eerste idee tot
            realisatie.
          </p>

          <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/35">
            © 2026 Solutionbouw
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}

      {!menuOpen && selectedProject === null && (
        <div
          className="fixed left-4 right-4 z-[90] flex gap-1.5 rounded-full border border-black/10 bg-[#F5F1EA]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          }}
        >
          <Link
            href="/ai-designer"
            className="flex flex-1 items-center justify-center rounded-full bg-[#B97848] px-3 py-3.5 text-sm font-medium text-white"
          >
            Ontwerp met AI
          </Link>
          <Link
            href="/cinewall-configurator"
            className="flex min-w-0 flex-1 items-center justify-center rounded-full bg-[#1D1D1B] px-2 py-3.5 text-center text-[13px] font-medium text-white"
            style={{ color: "#ffffff" }}
>
  <span className="block whitespace-nowrap text-white">
    Bereken prijs
  </span>
</Link>
          
          
        </div>
      )}

      {/* LIGHTBOX */}

      <dialog
        ref={galleryRef}
        onCancel={() => setSelectedProject(null)}
        onClose={() => setSelectedProject(null)}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-black/95 p-0 text-white"
      >
        {selectedProject !== null && (
          <div className="flex h-full items-center justify-center p-4">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-20 h-12 w-12 rounded-full border border-white/20 bg-black/40 text-2xl"
            >
              ×
            </button>

            <button
              type="button"
              onClick={() => moveProject(-1)}
              className="absolute left-3 h-12 w-12 rounded-full bg-black/50"
            >
              ←
            </button>

            <img
              src={projectImages[selectedProject]}
              alt=""
              className="max-h-[80dvh] max-w-[92vw] rounded-2xl object-contain"
            />

            <button
              type="button"
              onClick={() => moveProject(1)}
              className="absolute right-3 h-12 w-12 rounded-full bg-black/50"
            >
              →
            </button>
          </div>
        )}
      </dialog>

      {/* MENU */}

      <dialog
        ref={menuRef}
        onCancel={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-black/80 p-3 text-white"
      >
        <div className="rounded-[32px] border border-white/10 bg-[#1D1D1B] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em]">Solutionbouw</p>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="h-11 w-11 rounded-full border border-white/15 text-xl"
            >
              ×
            </button>
          </div>

          <nav className="mt-7 flex flex-col">
            {[
              ["Projecten", "#projecten"],
              ["AI Designer", "/ai-designer"],
              ["Cinewalls", "/cinewall-configurator"],
              ["Sfeerhaarden", "/elektrische-haarden"],
              ["Wandpanelen", "/wandpanelen"],
              ["Contact", "#contact"],
            ].map(([name, href]) => (
              <Link
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 text-2xl font-light"
              >
                {name}
              </Link>
            ))}
          </nav>

          <Link
            href="/ai-designer"
            className="mt-6 flex items-center justify-between rounded-full bg-[#B97848] px-6 py-4"
          >
            Ontwerp met AI <span>→</span>
          </Link>
        </div>
      </dialog>
    </main>
  );
}