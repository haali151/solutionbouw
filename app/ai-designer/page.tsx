"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

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
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImage(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (resultVisible) {
      resultRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    } else if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
  }, [resultVisible]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!contactOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [contactOpen]);

  function openContact() {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
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

    // Capture the choices for this exact generation.
    const message = [
      "Hallo Solutionbouw,",
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
    ].filter(Boolean).join("\n");

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
    const timeout = setTimeout(() => controller.abort(), 180000);

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

  const whatsappUrl =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(requestMessage)}`;

  const emailUrl =
    `mailto:${EMAIL}?subject=${encodeURIComponent("Mijn Cinewall-ontwerp – offerteaanvraag")}` +
    `&body=${encodeURIComponent(requestMessage)}`;

  function choiceClass(active: boolean) {
    return `rounded-xl border px-3 py-3 text-sm transition ${
      active
        ? "border-[#c7ac80] bg-[#c7ac80] text-[#151515]"
        : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/30"
    }`;
  }

  return (
    <main lang="nl" dir="ltr" className="min-h-screen bg-[#101112] text-[#f5f3ef]">
      <nav className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:px-10">
        <a
          href="/"
          translate="no"
          className="text-sm font-bold tracking-[0.18em]"
        >
          SOLUTION<span className="text-[#c7ac80]">BOUW</span>
        </a>

        <a href="/" className="text-xs text-neutral-400 hover:text-white">
          ← Terug
        </a>
      </nav>

      {resultVisible ? (
        <section ref={resultRef} className="mx-auto max-w-7xl scroll-mt-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4 md:px-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7ac80]">
                Jouw ontwerp
              </p>
              <h1 className="mt-1 text-lg font-medium">Een nieuw thuisgevoel.</h1>
            </div>

            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-full border border-white/15 px-4 py-2 text-xs hover:bg-white/5"
            >
              Aanpassen
            </button>
          </div>

          <div className="relative flex h-[52svh] min-h-64 items-center justify-center bg-[#080909] md:h-[65vh]">
            <img
              key={showOriginal ? image : generatedImage}
              src={showOriginal ? image : generatedImage}
              alt={showOriginal ? "Je huidige woonkamer" : "AI-ontwerp van jouw Cinewall"}
              onLoad={showOriginal ? undefined : onResultLoaded}
              onError={() => setError("De afbeelding kon niet worden geladen.")}
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-white/15 bg-black/70 p-1 backdrop-blur">
              <button
                type="button"
                aria-pressed={showOriginal}
                onClick={() => setShowOriginal(true)}
                className={`rounded-full px-5 py-2 text-xs ${
                  showOriginal ? "bg-white text-black" : "text-white"
                }`}
              >
                Voor
              </button>
              <button
                type="button"
                aria-pressed={!showOriginal}
                onClick={() => setShowOriginal(false)}
                className={`rounded-full px-5 py-2 text-xs ${
                  !showOriginal ? "bg-white text-black" : "text-white"
                }`}
              >
                Na
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="text-xl font-medium">Van jouw idee naar jouw Cinewall.</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Bespreek dit ontwerp met ons en ontdek de mogelijkheden.
              </p>
            </div>

            <button
              ref={contactButtonRef}
              type="button"
              onClick={openContact}
              className="shrink-0 rounded-xl bg-[#c7ac80] px-7 py-4 text-sm font-semibold text-[#151515] hover:bg-[#dbc397]"
            >
              Realiseer mijn ontwerp ↗
            </button>
          </div>

          <p className="px-5 pb-6 text-xs text-neutral-500 md:px-8">
            AI-impressie. Materialen, maten en uitvoerbaarheid bespreken we samen.
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
          <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c7ac80]">
                Solutionbouw / Design studio
              </p>
              <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">
                Jouw muur. Jouw stijl.
              </h1>
              <p className="mt-3 text-sm text-neutral-400">
                Eén foto. Een nieuw idee voor jouw woonkamer.
              </p>
            </div>

            {generatedImage && (
              <button
                type="button"
                disabled={loading}
                onClick={() => setEditing(false)}
                className="text-sm text-[#c7ac80] underline underline-offset-4"
              >
                Terug naar ontwerp
              </button>
            )}
          </header>

          <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#171819] lg:grid-cols-[1.15fr_1fr]">
            <div className="p-5 md:p-7">
              <p className="mb-4 text-xs text-neutral-400">
                <span className="mr-3 text-[#c7ac80]">01</span>
                Jouw ruimte
              </p>

              <label className="relative flex min-h-52 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-[#101112] lg:min-h-80">
                {image ? (
                  <img
                    src={image}
                    alt="Jouw woonkamer"
                    className="max-h-80 w-full object-contain"
                  />
                ) : (
                  <div className="p-7 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#c7ac80]/40 text-2xl text-[#c7ac80]">
                      +
                    </div>
                    <p className="mt-4 text-lg">Begin met jouw woonkamer</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-500">
                      Kies een heldere foto van de volledige muur.
                      <br />
                      JPG, PNG of WebP · maximaal 10 MB
                    </p>
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

              <p className="mt-3 text-center text-xs text-neutral-500">
                {image ? "Klik op de foto om deze te vervangen." : "Recht van voren werkt het beste."}
              </p>

              {config.type && (
                <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-neutral-400">
                  Gekozen model: <span className="text-white">{config.type}</span>
                  {config.width && ` · Breedte: ${config.width}`}
                </p>
              )}
            </div>

            <div className="border-t border-white/10 p-5 md:p-7 lg:border-l lg:border-t-0">
              <p className="mb-5 text-xs text-neutral-400">
                <span className="mr-3 text-[#c7ac80]">02</span>
                Maak het persoonlijk
              </p>

              <fieldset disabled={loading} className="space-y-5 disabled:opacity-50">
                <div>
                  <p className="mb-2 text-sm">Sfeer</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Modern", "Luxury", "Minimal"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={style === value}
                        onClick={() => setStyle(value)}
                        className={choiceClass(style === value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm">
                    TV-formaat
                    <select
                      value={tvSize}
                      onChange={(event) => setTvSize(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#101112] px-3 py-3 text-sm"
                    >
                      {["55", "65", "75", "85", "98"].map((size) => (
                        <option key={size} value={size}>{size} inch</option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm">
                    Elektrische haard
                    <select
                      value={fireplace}
                      onChange={(event) => setFireplace(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#101112] px-3 py-3 text-sm"
                    >
                      <option value="Ja">Met haard</option>
                      <option value="Nee">Zonder haard</option>
                    </select>
                  </label>
                </div>

                <div>
                  <p className="mb-2 text-sm">Vakken / planken</p>
                  <div className="grid grid-cols-4 gap-2">
                    {["0", "2", "4", "6"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={shelves === value}
                        onClick={() => setShelves(value)}
                        className={choiceClass(shelves === value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              <button
                type="button"
                disabled={!imageFile || loading}
                onClick={generateCinewall}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c7ac80] px-4 py-4 text-sm font-semibold text-[#151515] hover:bg-[#dbc397] disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
              >
                {loading && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                )}
                {loading ? `Ontwerp wordt gemaakt… ${seconds}s` : "Ontdek mijn Cinewall →"}
              </button>

              <p role="status" className="mt-3 text-center text-xs leading-5 text-neutral-500">
                {loading
                  ? "Je ontwerp verschijnt hier automatisch."
                  : "Een persoonlijke AI-impressie van jouw ruimte."}
              </p>
            </div>
          </div>
        </section>
      )}

      {error && (
        <p role="alert" className="mx-5 mb-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {error}
        </p>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-title"
        onCancel={() => setContactOpen(false)}
        onClose={() => {
          setContactOpen(false);
          contactButtonRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setContactOpen(false);
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-[#1a1b1c] p-0 text-white shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#c7ac80]">
              De volgende stap
            </span>
            <button
              type="button"
              autoFocus
              aria-label="Sluiten"
              onClick={() => setContactOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xl hover:bg-white/10"
            >
              ×
            </button>
          </div>

    <h1
  id="contact-title"
  className="mt-5 text-3xl font-medium tracking-tight"
>
  Mooi op beeld.
  <br />
  Straks bij jou thuis?
</h1>
          <div className="mt-5 rounded-2xl border border-[#c7ac80]/25 bg-[#c7ac80]/[0.06] p-5">
  <div className="flex items-center gap-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c7ac80]/15 text-lg">
      ✨
    </span>

    <h2
      id="contact-title"
      className="text-xl font-medium tracking-tight text-white"
    >
      Jouw AI-ontwerp is een impressie
    </h2>
  </div>

  <p className="mt-4 text-sm leading-6 text-neutral-300">
    Deze visualisatie geeft een realistische indruk van hoe jouw Cinewall
    eruit kan zien. Kleuren, verhoudingen en details kunnen bij de
    uiteindelijke uitvoering afwijken.
  </p>

  <div className="my-4 h-px bg-white/10" />

  <p className="text-sm font-semibold leading-6 text-[#c7ac80]">
    Het echte werk maken wij nóg mooier.
  </p>

  <p className="mt-2 text-sm leading-6 text-neutral-400">
    Onze vakmensen stemmen het ontwerp af op jouw ruimte, exacte maten en
    wensen voor een resultaat dat verder gaat dan de AI-impressie.
  </p>
</div>

<p className="mt-5 text-center text-xs font-medium tracking-wide text-neutral-300">
  Solutionbouw maakt jouw ontwerp werkelijkheid.
</p>

<p className="mt-2 text-center text-[11px] text-neutral-500">
  AI-impressie • Definitief ontwerp in overleg
</p>

          <div className="mt-6 space-y-3">
  {/* WhatsApp */}
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 p-4 transition hover:bg-[#25D366]/20"
  >
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg shadow-green-950/30">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-white"
      >
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.95 11.95 0 0 0 5.79 1.48h.01C18.63 23.84 24 18.49 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.82h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.01 2.9 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </span>

    <div className="min-w-0 flex-1">
      <p className="text-base font-semibold text-white">WhatsApp</p>
      <p className="mt-1 text-xs leading-5 text-neutral-400">
        Verstuur jouw ontwerpvoorkeuren
      </p>
    </div>

    <span aria-hidden="true" className="text-xl text-[#25D366]">
      ↗
    </span>
  </a>

  {/* Instagram */}
  <a
    href={INSTAGRAM}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-pink-400/40 hover:bg-pink-500/10"
  >
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
      style={{
        background:
          "radial-gradient(circle at 30% 105%, #fdf497 0%, #fd5949 40%, #d6249f 65%, #285aeb 100%)",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7 text-white"
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
      <p className="text-base font-semibold text-white">Instagram</p>
      <p className="mt-1 text-xs leading-5 text-neutral-400">
        @solutionbouw.nl
      </p>
    </div>

    <span aria-hidden="true" className="text-xl text-pink-400">
      ↗
    </span>
  </a>

  {/* Email */}
  <a
    href={emailUrl}
    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.07]"
  >
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-white"
      >
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    </span>

    <div className="min-w-0 flex-1">
      <p className="text-base font-semibold text-white">E-mail</p>
      <p className="mt-1 text-xs leading-5 text-neutral-400">
        Ontvang een persoonlijke offerte
      </p>
    </div>

    <span aria-hidden="true" className="text-xl text-neutral-300">
      ↗
    </span>
  </a>
</div>
          <details className="mt-5 text-xs text-neutral-400">
            <summary className="cursor-pointer">
              Bericht bekijken / kopiëren voor Instagram
            </summary>

            <textarea
              ref={messageRef}
              value={requestMessage}
              readOnly
              aria-label="Bericht met jouw ontwerpvoorkeuren"
              className="mt-3 h-40 w-full rounded-xl border border-white/15 bg-black/20 p-3 text-xs leading-5 text-neutral-300"
            />

            <button
              type="button"
              onClick={copyMessage}
              className="mt-2 rounded-lg border border-white/15 px-4 py-2 text-white"
            >
              {copied ? "Gekopieerd ✓" : "Kopieer bericht"}
            </button>
          </details>

          <p className="mt-5 text-[11px] leading-5 text-neutral-500">
            Stuur ook een screenshot van je ontwerp mee.
            De afbeelding wordt niet automatisch toegevoegd.
          </p>
        </div>
      </dialog>
    </main>
  );
}