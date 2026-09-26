"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";

/* =========================================================
   WALLMADE AI DESIGN STUDIO
========================================================= */

const WHATSAPP = "31643583800";
const EMAIL = "solutionbouw.official@gmail.com";
const INSTAGRAM = "https://www.instagram.com/solutionbouw.nl/";

const initialConfig = {
  type: "",
  width: "",
  fireplace: "",
  cabinet: "",
  wood: "",
  price: "",
};

/* =========================================================
   ICONS
========================================================= */

function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function IconSparkles({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="m12 3-1.3 3.7L7 8l3.7 1.3L12 13l1.3-3.7L17 8l-3.7-1.3L12 3Z" />
      <path d="m18.5 14-.8 2.2-2.2.8 2.2.8.8 2.2.8-2.2 2.2-.8-2.2-.8-.8-2.2Z" />
      <path d="m5 14-.6 1.7-1.7.6 1.7.6L5 18.6l.6-1.7 1.7-.6-1.7-.6L5 14Z" />
    </svg>
  );
}

function IconUpload({ className = "h-6 w-6" }: { className?: string }) {
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
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function IconModern({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v16" />
      <path d="M15 4v16" />
    </svg>
  );
}

function IconLuxury({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      <path d="m18 16 .8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" />
    </svg>
  );
}

function IconMinimal({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function IconFireplace({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6.5-5-8.5 0 3-1.2 4.3-2 5-1.4-1.2-2-3.2-1-6-3 2-6 5-6 9.5C5 19.3 8 22 12 22Z" />
      <path d="M9.5 18c0-2 1.2-3.2 2.5-4.2.2 1.6 1 2.3 1.7 3 .8.7.8 2.1.3 3.2" />
    </svg>
  );
}

function IconWall({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 12h8" />
    </svg>
  );
}

function IconArrow({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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

function IconMagic({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="m15 4 5 5L8 21H3v-5L15 4Z" />
      <path d="m13 6 5 5" />
      <path d="M6 3v3" />
      <path d="M4.5 4.5h3" />
      <path d="M20 15v3" />
      <path d="M18.5 16.5h3" />
    </svg>
  );
}

/* =========================================================
   SMALL UI ELEMENTS
========================================================= */

function StepBadge({
  children,
  icon,
}: {
  children?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8e7548] bg-[radial-gradient(circle_at_top,#332b1b_0%,#19150f_65%,#0b0b0c_100%)] text-[12px] font-semibold tracking-[0.12em] text-[#d7b97d] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
      {icon || children}
    </div>
  );
}

function SelectedMark({ active }: { active: boolean }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
        active
          ? "border-[#d4b477] bg-[#d4b477] text-[#11110f] shadow-[0_5px_20px_rgba(212,180,119,0.3)]"
          : "border-white/10 bg-white/[0.02] text-transparent"
      }`}
    >
      <IconCheck className="h-3.5 w-3.5" />
    </span>
  );
}

function SmallCheck({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 sm:text-[11px]">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
        <IconCheck className="h-2.5 w-2.5" />
      </span>
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AIDesigner() {
  const [config, setConfig] = useState(initialConfig);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const [style, setStyle] = useState("Modern");
  const [tvSize, setTvSize] = useState("65");
  const [fireplace, setFireplace] = useState("Ja");
  const [shelves, setShelves] = useState("4");

  const [generatedImage, setGeneratedImage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const [editing, setEditing] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);

  const busyRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupShownRef = useRef(false);

  const resultVisible = Boolean(generatedImage) && !editing;

  /* =========================================================
     READ CONFIG FROM URL
  ========================================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const next = {
      type: params.get("type") || "",
      width: params.get("width") || "",
      fireplace: params.get("fireplace") || "",
      cabinet: params.get("cabinet") || "",
      wood: params.get("wood") || "",
      price: params.get("price") || "",
    };

    setConfig(next);

    if (next.type) {
      setShelves(next.type.match(/\b(2|4|6)\b/)?.[1] || "0");
    }

    if (next.fireplace) {
      setFireplace(
        /^(geen|nee)$/i.test(next.fireplace.trim()) ? "Nee" : "Ja"
      );
    }

    return () => {
      controllerRef.current?.abort();

      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  /* =========================================================
     LOCAL IMAGE PREVIEW
  ========================================================= */

  useEffect(() => {
    if (!imageFile) return;

    const url = URL.createObjectURL(imageFile);
    setImage(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  /* =========================================================
     RESULT SCROLL
  ========================================================= */

  useEffect(() => {
    if (resultVisible) {
      resultRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
  }, [resultVisible]);

  /* =========================================================
     CONTACT DIALOG
  ========================================================= */

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (!contactOpen) {
      if (dialog.open) {
        dialog.close();
      }

      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      document.body.style.overflow = previousOverflow;

      if (dialog.open) {
        dialog.close();
      }
    };
  }, [contactOpen]);

  /* =========================================================
     CONTACT
  ========================================================= */

  function openContact() {
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }

    popupShownRef.current = true;

    setCopied(false);
    setContactOpen(true);
  }

  function onResultLoaded() {
    if (popupShownRef.current || popupTimerRef.current) return;

    popupTimerRef.current = setTimeout(() => {
      popupTimerRef.current = null;
      popupShownRef.current = true;

      setContactOpen(true);
    }, 1800);
  }

  /* =========================================================
     IMAGE
  ========================================================= */

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file || busyRef.current) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Kies een JPG-, PNG- of WebP-foto.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Kies een foto van maximaal 10 MB.");
      return;
    }

    setError("");

    setImageFile(file);
    setGeneratedImage("");
    setRequestMessage("");
    setShowOriginal(false);
  }

  /* =========================================================
     COPY MESSAGE
  ========================================================= */

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(requestMessage);

      setCopied(true);
    } catch {
      messageRef.current?.focus();
      messageRef.current?.select();

      setCopied(false);
    }
  }

  /* =========================================================
     GENERATE AI IMAGE
  ========================================================= */

  async function generateCinewall() {
    if (!imageFile || busyRef.current) return;

    busyRef.current = true;

    setLoading(true);
    setSeconds(0);
    setError("");
    setGeneratedImage("");
    setShowOriginal(false);
    setContactOpen(false);
    setCopied(false);

    popupShownRef.current = false;

    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }

    const message = [
      "Hallo Wallmade,",
      "",
      "Ik heb een Cinewall ontworpen met jullie AI-designer.",
      "Graag bespreek ik de mogelijkheden en ontvang ik een offerte.",
      "",
      "Mijn ontwerpvoorkeuren:",
      `• Stijl: ${style}`,
      `• TV-formaat: ${tvSize} inch`,
      `• Elektrische haard: ${fireplace}`,
      `• Aantal vakken / planken: ${shelves}`,
      config.width && `• Breedte: ${config.width}`,
      fireplace === "Ja" &&
        config.fireplace &&
        !/^(geen|nee)$/i.test(config.fireplace) &&
        `• Haardmodel: ${config.fireplace}`,
      config.cabinet && `• TV-meubel: ${config.cabinet}`,
      config.wood && `• Hout / afwerking: ${config.wood}`,
      config.type && `• Oorspronkelijk gekozen model: ${config.type}`,
      config.price &&
        `• Eerder getoonde prijsindicatie: ${config.price} (te bevestigen)`,
      "",
      "Kunnen jullie aangeven wat mogelijk is en wat de kosten zijn?",
    ]
      .filter(Boolean)
      .join("\n");

    const formData = new FormData();

    formData.append("image", imageFile);

    const fields = {
      style,
      tvSize,
      fireplace,
      shelves,
      cinewallType: config.type,
      cinewallWidth: config.width,
      fireplaceModel: fireplace === "Ja" ? config.fireplace : "Geen",
      cabinet: config.cabinet,
      wood: config.wood,
      price: config.price,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const controller = new AbortController();

    controllerRef.current = controller;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 180000);

    try {
      const response = await fetch("/api/generate-cinewall", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "Het is momenteel druk. Probeer het over een paar minuten opnieuw."
            : "Het ontwerp kon niet worden gemaakt. Probeer opnieuw."
        );
      }

      if (typeof data?.image !== "string" || !data.image.trim()) {
        throw new Error("Geen afbeelding ontvangen. Probeer opnieuw.");
      }

      setRequestMessage(message);
      setGeneratedImage(data.image);
      setEditing(false);
    } catch (err) {
      setError(
        controller.signal.aborted
          ? "Het ontwerpen duurde te lang. Probeer opnieuw."
          : err instanceof Error
            ? err.message
            : "Er ging iets mis. Probeer opnieuw."
      );
    } finally {
      clearTimeout(timeout);

      controllerRef.current = null;

      busyRef.current = false;

      setLoading(false);
    }
  }

  /* =========================================================
     CONTACT LINKS
  ========================================================= */

  const whatsappUrl =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(requestMessage)}`;

  const emailUrl =
    `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Mijn Wallmade AI-ontwerp - offerteaanvraag"
    )}` + `&body=${encodeURIComponent(requestMessage)}`;

  /* =========================================================
     STYLE OPTIONS
  ========================================================= */

  const styleOptions = [
    {
      value: "Modern",
      title: "Modern",
      subtitle: "Strak & tijdloos",
      icon: <IconModern />,
    },

    {
      value: "Luxury",
      title: "Luxury",
      subtitle: "Warm & exclusief",
      icon: <IconLuxury />,
    },

    {
      value: "Minimal",
      title: "Minimal",
      subtitle: "Rustig & verfijnd",
      icon: <IconMinimal />,
    },
  ];

  const tvSizes = ["55", "65", "75", "85", "98"];
  const shelfOptions = ["0", "2", "4", "6"];

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      lang="nl"
      dir="ltr"
      className="min-h-screen overflow-x-hidden bg-[#08090a] text-[#f4f1eb]"
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[540px] w-[760px] -translate-x-1/2 rounded-full bg-[#b99154]/[0.055] blur-[140px]" />

        <div className="absolute bottom-[-220px] right-[-200px] h-[500px] w-[500px] rounded-full bg-[#765a34]/[0.04] blur-[130px]" />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="relative z-20 border-b border-white/[0.06] bg-[#08090a]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9b7d4c]/45 bg-[#18140e] text-sm font-bold text-[#d4b477] shadow-[0_10px_30px_rgba(0,0,0,.3)]">
              W
            </div>

            <div className="min-w-0">
              <div
                translate="no"
                className="truncate text-[15px] font-semibold tracking-[0.27em]"
              >
                WALL<span className="text-[#d4b477]">MADE</span>
              </div>

              <div className="mt-1 text-[8px] uppercase tracking-[0.28em] text-neutral-600">
                Interior Studio
              </div>
            </div>
          </a>

          <a
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <span>←</span>
            Terug
          </a>
        </div>
      </nav>

      {/* =====================================================
          RESULT
      ===================================================== */}

      {resultVisible ? (
        <section
          ref={resultRef}
          className="relative z-10 mx-auto max-w-7xl px-4 py-7 sm:px-5 md:px-8 md:py-10"
        >
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a18554]/25 bg-[#a18554]/[0.06] px-3.5 py-2">
                <IconSparkles className="h-3.5 w-3.5 text-[#d4b477]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.23em] text-[#c6a66c]">
                  Jouw AI ontwerp
                </span>
              </div>

              <h1 className="max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-5xl">
                Dit kan jouw nieuwe{" "}
                <span className="text-[#d4b477]">Cinewall</span> worden.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                Bekijk jouw originele ruimte en vergelijk deze direct met het
                nieuwe AI-ontwerp.
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => setEditing(true)}
              className="shrink-0 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-3 text-sm text-neutral-300 transition hover:bg-white/[0.05]"
            >
              Ontwerp aanpassen
            </button>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101113]">
            <div className="relative flex min-h-[360px] items-center justify-center bg-[#050606] md:min-h-[620px]">
              <img
                key={showOriginal ? image : generatedImage}
                src={showOriginal ? image : generatedImage}
                alt={
                  showOriginal
                    ? "Jouw huidige woonkamer"
                    : "Wallmade AI Cinewall ontwerp"
                }
                onLoad={showOriginal ? undefined : onResultLoaded}
                onError={() =>
                  setError("De afbeelding kon niet worden geladen.")
                }
                className="max-h-[72vh] w-full object-contain"
              />

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-white/[0.1] bg-black/75 p-1.5 shadow-2xl backdrop-blur-xl">
                <button
                  type="button"
                  aria-pressed={showOriginal}
                  onClick={() => setShowOriginal(true)}
                  className={`min-w-[82px] rounded-full px-5 py-2.5 text-xs font-medium transition ${
                    showOriginal
                      ? "bg-[#efebe2] text-[#111]"
                      : "text-neutral-400"
                  }`}
                >
                  Voor
                </button>

                <button
                  type="button"
                  aria-pressed={!showOriginal}
                  onClick={() => setShowOriginal(false)}
                  className={`min-w-[92px] rounded-full px-5 py-2.5 text-xs font-medium transition ${
                    !showOriginal
                      ? "bg-[#d4b477] text-[#15110c]"
                      : "text-neutral-400"
                  }`}
                >
                  AI ontwerp
                </button>
              </div>
            </div>

            <div className="border-t border-white/[0.06] p-5 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] text-neutral-400">
                      {style}
                    </span>

                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] text-neutral-400">
                      {tvSize}&quot; TV
                    </span>

                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] text-neutral-400">
                      {fireplace === "Ja"
                        ? "Met sfeerhaard"
                        : "Zonder sfeerhaard"}
                    </span>

                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] text-neutral-400">
                      {shelves === "0"
                        ? "Geen vakken"
                        : `${shelves} vakken`}
                    </span>
                  </div>

                  <h2 className="text-2xl font-medium tracking-tight">
                    Van visualisatie naar maatwerk.
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
                    Wij vertalen jouw AI-ontwerp naar een technisch uitvoerbaar
                    ontwerp dat past bij jouw ruimte.
                  </p>
                </div>

                <button
                  ref={contactButtonRef}
                  type="button"
                  onClick={openContact}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#d4b477] px-7 py-4 text-sm font-semibold text-[#17130d] transition hover:bg-[#e0c48e] lg:w-auto"
                >
                  Vraag mijn offerte aan

                  <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[10px] leading-5 text-neutral-700">
            AI-impressie. Materialen, maten en uitvoerbaarheid worden
            definitief afgestemd door Wallmade.
          </p>
        </section>
      ) : (
        /* =====================================================
            DESIGNER
        ===================================================== */

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
          {/* ===================================================
              HERO
          =================================================== */}

          <div className="mb-8 grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#987a48]/35 bg-[#18140e] px-4 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,.2)]">
                <IconSparkles className="h-3.5 w-3.5 text-[#d4b477]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#caaa70]">
                  Wallmade AI Design Studio
                </span>
              </div>

              <h1 className="max-w-4xl text-[39px] font-medium leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                Zie jouw nieuwe wand
                <br className="hidden sm:block" />
                <span className="text-[#d4b477]">
                  {" "}
                  voordat hij bestaat.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 md:text-[15px]">
                Upload een foto van jouw woonkamer. Kies jouw voorkeuren en laat
                Wallmade AI jouw nieuwe Cinewall visualiseren.
              </p>
            </div>

            {/* STEPS */}

            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0f10]">
              <div className="border-r border-white/[0.06] p-4 sm:p-5">
                <StepBadge>01</StepBadge>

                <p className="mt-4 text-xs font-medium text-neutral-300">
                  Upload
                </p>

                <p className="mt-1 hidden text-[9px] text-neutral-600 sm:block">
                  jouw ruimte
                </p>
              </div>

              <div className="border-r border-white/[0.06] p-4 sm:p-5">
                <StepBadge>02</StepBadge>

                <p className="mt-4 text-xs font-medium text-neutral-300">
                  Personaliseer
                </p>

                <p className="mt-1 hidden text-[9px] text-neutral-600 sm:block">
                  jouw stijl
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <StepBadge
                  icon={
                    <IconSparkles className="h-4 w-4 text-[#d4b477]" />
                  }
                />

                <p className="mt-4 text-xs font-medium text-neutral-300">
                  Visualiseer
                </p>

                <p className="mt-1 hidden text-[9px] text-neutral-600 sm:block">
                  met AI
                </p>
              </div>
            </div>
          </div>

          {generatedImage && (
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={() => setEditing(false)}
                className="text-xs font-medium text-[#d4b477] underline decoration-[#d4b477]/40 underline-offset-4"
              >
                Terug naar mijn vorige ontwerp
              </button>
            </div>
          )}

          {/* ===================================================
              MAIN STUDIO
          =================================================== */}

          <div className="grid overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0e0f11] shadow-[0_30px_80px_rgba(0,0,0,.3)] lg:grid-cols-[1.05fr_0.95fr]">
            {/* =================================================
                PHOTO
            ================================================= */}

            <div className="p-4 sm:p-5 md:p-7 lg:p-8">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#8c7045]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#c4a166]">
                    01 / Jouw ruimte
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Begin met een foto.
                </h2>
              </div>

              <label className="group relative flex min-h-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-[25px] border border-dashed border-white/[0.12] bg-[#070808] transition hover:border-[#a18554]/50 md:min-h-[500px]">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Jouw woonkamer"
                      className="max-h-[540px] w-full object-contain"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/30 to-transparent px-5 pb-5 pt-16">
                      <span className="text-xs text-white/80">
                        Jouw huidige ruimte
                      </span>

                      <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] text-neutral-300 backdrop-blur">
                        Foto wijzigen
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="max-w-sm px-7 py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#9a7b49]/45 bg-[#17130d] text-[#d4b477] shadow-[0_16px_40px_rgba(0,0,0,.3)] transition duration-300 group-hover:scale-105">
                      <IconUpload className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-medium">
                      Upload jouw woonkamer
                    </h3>

                    <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-neutral-600">
                      Kies een heldere foto waarop de volledige wand goed
                      zichtbaar is.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.025] px-3 py-2 text-[9px] text-neutral-600">
                      JPG, PNG of WebP

                      <span className="text-neutral-800">•</span>

                      Max. 10 MB
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Kies een foto van jouw woonkamer"
                  disabled={loading}
                  onChange={handleImage}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-wait"
                />
              </label>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d4b477]/10 text-[#d4b477]">
                  <IconSparkles className="h-3.5 w-3.5" />
                </span>

                <p className="text-[10px] leading-5 text-neutral-600">
                  <span className="font-medium text-neutral-400">
                    Voor het beste resultaat:
                  </span>{" "}
                  fotografeer de wand recht van voren en zorg voor voldoende
                  licht.
                </p>
              </div>
            </div>

            {/* =================================================
                OPTIONS
            ================================================= */}

            <div className="border-t border-white/[0.06] p-4 sm:p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="mb-7">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#8c7045]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#c4a166]">
                    02 / Jouw ontwerp
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-medium tracking-tight">
                  Maak het helemaal van jou.
                </h2>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  Kies jouw voorkeuren. Wallmade AI gebruikt ze om een
                  persoonlijk ontwerp te creëren.
                </p>
              </div>

              <fieldset
                disabled={loading}
                className="space-y-7 disabled:opacity-50"
              >
                {/* =============================================
                    STYLE
                ============================================= */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Interieurstijl</p>

                    <span className="text-[9px] text-neutral-700">
                      Kies één
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {styleOptions.map((item) => {
                      const active = style === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setStyle(item.value)}
                          className={`relative min-w-0 rounded-2xl border px-3 py-4 text-left transition-all duration-300 ${
                            active
                              ? "border-[#947848] bg-[linear-gradient(180deg,#211b12,#15130f)] shadow-[0_15px_35px_rgba(0,0,0,.25)]"
                              : "border-white/[0.06] bg-[#131416] hover:border-white/[0.12]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                                active
                                  ? "border-[#9b7c49]/40 bg-[#d4b477]/10 text-[#d4b477]"
                                  : "border-white/[0.05] bg-white/[0.025] text-neutral-600"
                              }`}
                            >
                              {item.icon}
                            </span>

                            <SelectedMark active={active} />
                          </div>

                          <p className="mt-4 truncate text-xs font-semibold text-neutral-200">
                            {item.title}
                          </p>

                          <p className="mt-1 hidden truncate text-[8px] text-neutral-700 sm:block">
                            {item.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =============================================
                    TV
                ============================================= */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">TV-formaat</p>

                    <span className="text-xs font-semibold text-[#d4b477]">
                      {tvSize}&quot;
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {tvSizes.map((size) => {
                      const active = tvSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setTvSize(size)}
                          className={`flex h-14 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
                            active
                              ? "border-[#927647] bg-[#211b13] text-[#dfc186] shadow-[0_10px_25px_rgba(0,0,0,.25)]"
                              : "border-white/[0.05] bg-[#131416] text-neutral-600 hover:border-white/[0.12] hover:text-neutral-400"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =============================================
                    FIREPLACE
                ============================================= */}

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Elektrische sfeerhaard
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      aria-pressed={fireplace === "Ja"}
                      onClick={() => setFireplace("Ja")}
                      className={`relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                        fireplace === "Ja"
                          ? "border-[#927647] bg-[linear-gradient(180deg,#211b12,#15130f)]"
                          : "border-white/[0.06] bg-[#131416]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                            fireplace === "Ja"
                              ? "border-[#9d7c49]/40 bg-[#d4b477]/10 text-[#d4b477]"
                              : "border-white/[0.06] text-neutral-600"
                          }`}
                        >
                          <IconFireplace />
                        </span>

                        <SelectedMark active={fireplace === "Ja"} />
                      </div>

                      <p className="mt-4 text-xs font-medium text-neutral-200">
                        Met sfeerhaard
                      </p>

                      <p className="mt-1 hidden text-[9px] leading-4 text-neutral-700 sm:block">
                        Warm en sfeervol
                      </p>
                    </button>

                    <button
                      type="button"
                      aria-pressed={fireplace === "Nee"}
                      onClick={() => setFireplace("Nee")}
                      className={`relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                        fireplace === "Nee"
                          ? "border-[#927647] bg-[linear-gradient(180deg,#211b12,#15130f)]"
                          : "border-white/[0.06] bg-[#131416]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                            fireplace === "Nee"
                              ? "border-[#9d7c49]/40 bg-[#d4b477]/10 text-[#d4b477]"
                              : "border-white/[0.06] text-neutral-600"
                          }`}
                        >
                          <IconWall />
                        </span>

                        <SelectedMark active={fireplace === "Nee"} />
                      </div>

                      <p className="mt-4 text-xs font-medium text-neutral-200">
                        Zonder sfeerhaard
                      </p>

                      <p className="mt-1 hidden text-[9px] leading-4 text-neutral-700 sm:block">
                        Strak en minimalistisch
                      </p>
                    </button>
                  </div>
                </div>

                {/* =============================================
                    SHELVES
                ============================================= */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">
                      Decoratieve vakken
                    </p>

                    <span className="text-[9px] text-neutral-700">
                      LED inbegrepen
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {shelfOptions.map((value) => {
                      const active = shelves === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setShelves(value)}
                          className={`flex h-14 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
                            active
                              ? "border-[#927647] bg-[#211b13] text-[#dfc186] shadow-[0_10px_25px_rgba(0,0,0,.25)]"
                              : "border-white/[0.05] bg-[#131416] text-neutral-600 hover:border-white/[0.12]"
                          }`}
                        >
                          {value === "0" ? "Geen" : value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </fieldset>

              {/* =============================================
                  PREVIOUS CONFIG
              ============================================= */}

              {(config.type ||
                config.width ||
                config.cabinet ||
                config.wood) && (
                <div className="mt-7 rounded-2xl border border-white/[0.05] bg-white/[0.018] p-4">
                  <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-700">
                    Jouw eerdere keuzes
                  </p>

                  <div className="space-y-2 text-[11px] text-neutral-600">
                    {config.type && (
                      <p>
                        Model:{" "}
                        <span className="text-neutral-400">
                          {config.type}
                        </span>
                      </p>
                    )}

                    {config.width && (
                      <p>
                        Breedte:{" "}
                        <span className="text-neutral-400">
                          {config.width}
                        </span>
                      </p>
                    )}

                    {config.cabinet && (
                      <p>
                        TV-meubel:{" "}
                        <span className="text-neutral-400">
                          {config.cabinet}
                        </span>
                      </p>
                    )}

                    {config.wood && (
                      <p>
                        Afwerking:{" "}
                        <span className="text-neutral-400">
                          {config.wood}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* =============================================
                  GENERATE
              ============================================= */}

              <div className="mt-7 border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  disabled={!imageFile || loading}
                  onClick={generateCinewall}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#d4b477] px-5 py-[17px] text-sm font-semibold text-[#15110c] transition hover:bg-[#dfc38b] disabled:cursor-not-allowed disabled:bg-[#202124] disabled:text-neutral-700"
                >
                  {!loading && imageFile && (
                    <span className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                  )}

                  {loading ? (
                    <span className="relative flex items-center gap-3">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

                      AI creëert jouw ontwerp... {seconds}s
                    </span>
                  ) : (
                    <span className="relative flex items-center gap-2">
                      <IconMagic className="h-4 w-4" />

                      {imageFile
                        ? "Genereer mijn ontwerp met AI"
                        : "Upload eerst een foto"}
                    </span>
                  )}
                </button>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <SmallCheck>Persoonlijk</SmallCheck>
                  <SmallCheck>AI-powered</SmallCheck>
                  <SmallCheck>Vrijblijvend</SmallCheck>
                </div>

                {loading && (
                  <div className="mt-5 rounded-xl border border-[#9b7b49]/15 bg-[#9b7b49]/[0.04] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">
                        Jouw ontwerp wordt opgebouwd
                      </span>

                      <span className="text-[10px] text-[#cba96b]">
                        {seconds}s
                      </span>
                    </div>

                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-[#d4b477]" />
                    </div>

                    <p className="mt-3 text-[9px] leading-5 text-neutral-700">
                      Wallmade AI analyseert jouw ruimte en gekozen
                      configuratie.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              AI ASSISTANT PREVIEW
          =================================================== */}

          <div className="mt-5 rounded-2xl border border-white/[0.06] bg-[#0e0f10] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#957646]/35 bg-[#17130d] text-[#d4b477]">
                <IconMagic className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">
                    Wallmade AI Assistant
                  </p>

                  <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-neutral-700">
                    Binnenkort
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  Vraag straks wijzigingen aan jouw ontwerp, zoals extra
                  verlichting, andere vakken, een bredere haard of een nieuwe
                  indeling.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="relative z-30 mx-auto max-w-7xl px-4 pb-6 sm:px-5 md:px-8">
          <div
            role="alert"
            className="rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-4"
          >
            <p className="text-sm font-medium text-red-200">
              Er ging iets mis
            </p>

            <p className="mt-1 text-xs leading-5 text-red-200/60">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          CONTACT POPUP
      ===================================================== */}

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-title"
        onCancel={() => setContactOpen(false)}
        onClose={() => {
          setContactOpen(false);

          contactButtonRef.current?.focus({
            preventScroll: true,
          });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setContactOpen(false);
          }
        }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-[28px] border border-white/[0.09] bg-[#101113] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-md"
      >
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#997a49]/30 bg-[#17130d] px-3 py-1.5">
              <IconSparkles className="h-3 w-3 text-[#d4b477]" />

              <span className="text-[8px] uppercase tracking-[0.18em] text-[#c5a56d]">
                Volgende stap
              </span>
            </div>

            <button
              type="button"
              autoFocus
              aria-label="Sluiten"
              onClick={() => setContactOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-lg text-neutral-500 transition hover:text-white"
            >
              ×
            </button>
          </div>

          <h2
            id="contact-title"
            className="mt-6 text-3xl font-medium leading-tight tracking-tight"
          >
            Jouw ontwerp gezien.
            <span className="mt-1 block text-[#d4b477]">
              Nu maken we het echt.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-neutral-500">
            Stuur jouw ontwerpvoorkeuren naar Wallmade. Wij bekijken de
            mogelijkheden en maken een persoonlijke offerte.
          </p>

          <div className="mt-6 rounded-2xl border border-[#987847]/20 bg-[#987847]/[0.05] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4b477]/10 text-[#d4b477]">
                <IconSparkles className="h-4 w-4" />
              </span>

              <div>
                <p className="text-sm font-medium">
                  Jouw AI-ontwerp is het startpunt
                </p>

                <p className="mt-1 text-[10px] leading-5 text-neutral-600">
                  Exacte maten, materialen en technische details stemmen we
                  samen af.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.07] p-4 transition hover:bg-[#25D366]/[0.12]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-white"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.95 11.95 0 0 0 5.79 1.48h.01C18.63 23.84 24 18.49 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  Verder via WhatsApp
                </p>

                <p className="mt-1 text-[10px] text-neutral-600">
                  Snel contact en persoonlijke offerte
                </p>
              </div>

              <IconArrow className="h-4 w-4 text-[#25D366] transition group-hover:translate-x-0.5" />
            </a>

            {/* INSTAGRAM */}

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 105%, #fdf497 0%, #fd5949 40%, #d6249f 65%, #285aeb 100%)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Instagram
                </p>

                <p className="mt-1 text-[10px] text-neutral-600">
                  @solutionbouw.nl
                </p>
              </div>

              <IconArrow className="h-4 w-4 text-neutral-600 transition group-hover:translate-x-0.5" />
            </a>

            {/* EMAIL */}

            <a
              href={emailUrl}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-neutral-400"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  E-mail
                </p>

                <p className="mt-1 text-[10px] text-neutral-600">
                  Ontvang een persoonlijke offerte
                </p>
              </div>

              <IconArrow className="h-4 w-4 text-neutral-600 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          <details className="mt-5 text-xs text-neutral-600">
            <summary className="cursor-pointer select-none">
              Bericht bekijken of kopiëren
            </summary>

            <textarea
              ref={messageRef}
              value={requestMessage}
              readOnly
              aria-label="Bericht met jouw ontwerpvoorkeuren"
              className="mt-3 h-40 w-full resize-none rounded-xl border border-white/[0.07] bg-black/20 p-3 text-xs leading-5 text-neutral-400 outline-none"
            />

            <button
              type="button"
              onClick={copyMessage}
              className="mt-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs text-white"
            >
              {copied ? "Gekopieerd ✓" : "Kopieer bericht"}
            </button>
          </details>

          <p className="mt-5 text-center text-[9px] leading-5 text-neutral-700">
            Stuur eventueel ook een screenshot van jouw ontwerp mee.
          </p>
        </div>
      </dialog>
    </main>
  );
}