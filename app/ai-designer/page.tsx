"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";

/* =========================================================
   WALLMADE AI DESIGN STUDIO
   Full designer + advanced controls + AI assistant
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

type Language = "auto" | "nl" | "en" | "ar" | "tr" | "de";

type DesignState = {
  style: string;
  cinewallWidth: string;
  layoutAlignment: string;
  symmetry: string;
  heightStyle: string;

  tvSize: string;
  tvStyle: string;
  tvPosition: string;
  tvEmphasis: string;

  fireplace: string;
  fireplaceModel: string;
  fireplaceWidth: string;
  fireplacePosition: string;
  fireplaceFinish: string;

  shelves: string;
  shelfPosition: string;
  shelfShape: string;
  shelfDepth: string;
  shelfType: string;

  woodEnabled: string;
  woodType: string;
  woodPosition: string;
  woodStyle: string;

  lightingEnabled: string;
  lightingColor: string;
  lightingStrength: string;
  lightingPosition: string;

  cabinetType: string;
  cabinetWidth: string;
  cabinetColor: string;
  cabinetFinish: string;

  wallColor: string;
  finishStyle: string;
  contrast: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Version = {
  image: string;
  design: DesignState;
};

const defaultDesign: DesignState = {
  style: "Modern",
  cinewallWidth: "",
  layoutAlignment: "Centered",
  symmetry: "Symmetrical",
  heightStyle: "Normal",

  tvSize: "65",
  tvStyle: "Standard",
  tvPosition: "Center",
  tvEmphasis: "Balanced",

  fireplace: "Ja",
  fireplaceModel: "",
  fireplaceWidth: "Medium",
  fireplacePosition: "Under TV",
  fireplaceFinish: "Seamless",

  shelves: "4",
  shelfPosition: "Both sides",
  shelfShape: "Rectangle",
  shelfDepth: "Medium",
  shelfType: "Open",

  woodEnabled: "Nee",
  woodType: "Natural Oak",
  woodPosition: "Inside shelves only",
  woodStyle: "Smooth",

  lightingEnabled: "Ja",
  lightingColor: "Warm",
  lightingStrength: "Soft",
  lightingPosition: "Top only",

  cabinetType: "None",
  cabinetWidth: "Auto",
  cabinetColor: "Match wall",
  cabinetFinish: "Minimal",

  wallColor: "Warm beige",
  finishStyle: "Smooth plaster",
  contrast: "Balanced",
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

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
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

function IconSend({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function IconUndo({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M9 7 4 12l5 5" />
      <path d="M4 12h9a6 6 0 0 1 6 6" />
    </svg>
  );
}

function IconSliders({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M4 6h10" />
      <path d="M18 6h2" />
      <path d="M4 12h2" />
      <path d="M10 12h10" />
      <path d="M4 18h7" />
      <path d="M15 18h5" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="13" cy="18" r="2" />
    </svg>
  );
}

/* =========================================================
   UI HELPERS
========================================================= */

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

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-[#8c7045]" />
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#c4a166]">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-4 text-2xl font-medium tracking-tight">{title}</h2>

      {text && (
        <p className="mt-2 hidden text-xs leading-5 text-neutral-600 sm:block">{text}</p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className={disabled ? "opacity-40" : ""}>
      <span className="mb-2 block text-[11px] font-medium text-neutral-400">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/[0.07] bg-[#111214] px-3 py-3 text-[12px] text-neutral-300 outline-none transition focus:border-[#8d7247] disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleChoice({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-xl border px-3 py-3 text-xs font-medium transition ${
        active
          ? "border-[#927647] bg-[#211b13] text-[#dfc186]"
          : "border-white/[0.06] bg-[#131416] text-neutral-600"
      }`}
    >
      {label}
    </button>
  );
}

function languageLabel(value: Language) {
  const labels: Record<Language, string> = {
    auto: "Auto",
    nl: "Nederlands",
    en: "English",
    ar: "العربية",
    tr: "Türkçe",
    de: "Deutsch",
  };
  return labels[value];
}

/* =========================================================
   PAGE
========================================================= */
async function normalizeImageForUpload(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const maxSize = 2048;
  const scale = Math.min(
    1,
    maxSize / Math.max(bitmap.width, bitmap.height)
  );

  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);

  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error("Could not convert image."));
      },
      "image/png"
    );
  });

  return new File([blob], "wallmade-room.png", {
    type: "image/png",
  });
}
export default function AIDesigner() {
  const [config, setConfig] = useState(initialConfig);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  const [design, setDesign] = useState<DesignState>(defaultDesign);
  const [generatedImage, setGeneratedImage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const [editing, setEditing] = useState(true);
  const [showOriginal, setShowOriginal] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [language, setLanguage] = useState<Language>("auto");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hallo! Ik ben jouw Wallmade AI Designer. Vraag mij gerust om je ontwerp aan te passen, bijvoorbeeld hout in de vakken, warmere verlichting, een bredere haard of een andere indeling.",
    },
  ]);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const busyRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupShownRef = useRef(false);
  const autoContactRef = useRef(true);

  const resultVisible = Boolean(generatedImage) && !editing;

  const updateDesign = <K extends keyof DesignState>(
    key: K,
    value: DesignState[K]
  ) => {
    setDesign((current) => ({
      ...current,
      [key]: value,
    }));
  };

  /* =========================================================
     MOBILE SAFARI STABILITY
  ========================================================= */

  useEffect(() => {
    const previousHtmlBackground =
      document.documentElement.style.backgroundColor;
    const previousBodyBackground =
      document.body.style.backgroundColor;

    document.documentElement.style.backgroundColor = "#08090a";
    document.body.style.backgroundColor = "#08090a";

    return () => {
      document.documentElement.style.backgroundColor =
        previousHtmlBackground;
      document.body.style.backgroundColor =
        previousBodyBackground;
    };
  }, []);

  useEffect(() => {
    if (!mobileChatOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [mobileChatOpen]);

  /* =========================================================
     URL CONFIG
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

    setDesign((current) => {
      const nextDesign = { ...current };

      if (next.width) nextDesign.cinewallWidth = next.width;

      if (next.type) {
        nextDesign.shelves =
          next.type.match(/\b(2|4|6)\b/)?.[1] || nextDesign.shelves;
      }

      if (next.fireplace) {
        nextDesign.fireplace = /^(geen|nee)$/i.test(next.fireplace.trim())
          ? "Nee"
          : "Ja";

        if (!/^(geen|nee)$/i.test(next.fireplace.trim())) {
          nextDesign.fireplaceModel = next.fireplace;
        }
      }

      if (next.cabinet) {
        nextDesign.cabinetType = /^(geen|nee|none)$/i.test(next.cabinet.trim())
          ? "None"
          : next.cabinet;
      }

      if (next.wood && !/^(geen|nee|no|false|0)$/i.test(next.wood.trim())) {
        nextDesign.woodEnabled = "Ja";
        nextDesign.woodType = next.wood;
      }

      return nextDesign;
    });

    return () => {
      controllerRef.current?.abort();
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  /* =========================================================
     IMAGE PREVIEW
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
    }
  }, [resultVisible]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [chatHistory, assistantLoading]);

  /* =========================================================
     CONTACT DIALOG
  ========================================================= */

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
    if (!autoContactRef.current) return;
    if (popupShownRef.current || popupTimerRef.current) return;

    popupTimerRef.current = setTimeout(() => {
      popupTimerRef.current = null;
      popupShownRef.current = true;
      setContactOpen(true);
    }, 1800);
  }

  /* =========================================================
     IMAGE UPLOAD
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
    setVersions([]);
    setChatHistory((current) => current.slice(0, 1));
  }

  /* =========================================================
     HELPERS
  ========================================================= */

  function buildRequestMessage(nextDesign: DesignState) {
    return [
      "Hallo Wallmade,",
      "",
      "Ik heb een Cinewall ontworpen met jullie AI-designer.",
      "Graag bespreek ik de mogelijkheden en ontvang ik een offerte.",
      "",
      "Mijn ontwerpvoorkeuren:",
      `• Stijl: ${nextDesign.style}`,
      `• TV-formaat: ${nextDesign.tvSize} inch`,
      `• Elektrische haard: ${nextDesign.fireplace}`,
      `• Aantal vakken: ${nextDesign.shelves}`,
      nextDesign.cinewallWidth &&
        `• Cinewall breedte: ${nextDesign.cinewallWidth}`,
      `• Vakken positie: ${nextDesign.shelfPosition}`,
      `• Vakken vorm: ${nextDesign.shelfShape}`,
      `• Hout: ${nextDesign.woodEnabled}`,
      nextDesign.woodEnabled === "Ja" &&
        `• Houttype: ${nextDesign.woodType}`,
      nextDesign.woodEnabled === "Ja" &&
        `• Houtpositie: ${nextDesign.woodPosition}`,
      `• Verlichting: ${nextDesign.lightingEnabled}`,
      nextDesign.lightingEnabled === "Ja" &&
        `• Lichtkleur: ${nextDesign.lightingColor}`,
      `• TV-meubel: ${nextDesign.cabinetType}`,
      `• Wandkleur: ${nextDesign.wallColor}`,
      `• Afwerking: ${nextDesign.finishStyle}`,
      config.price &&
        `• Eerder getoonde prijsindicatie: ${config.price} (te bevestigen)`,
      "",
      "Kunnen jullie aangeven wat mogelijk is en wat de kosten zijn?",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function generatedImageToFile() {
    if (!generatedImage) return null;

    const response = await fetch(generatedImage);
    const blob = await response.blob();

    return new File([blob], "wallmade-ai-current.png", {
      type: blob.type || "image/png",
    });
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

  /* =========================================================
     GENERATE IMAGE
  ========================================================= */

  async function generateWithDesign({
    sourceFile,
    nextDesign,
    assistantEdit = false,
    previousVersion,
  }: {
    sourceFile: File;
    nextDesign: DesignState;
    assistantEdit?: boolean;
    previousVersion?: Version;
  }) {
    if (busyRef.current) return false;

    busyRef.current = true;
    autoContactRef.current = !assistantEdit;

    if (!assistantEdit) {
      setLoading(true);
      setSeconds(0);
    }

    setError("");
    setShowOriginal(false);
    setContactOpen(false);
    setCopied(false);

    if (!assistantEdit) {
      popupShownRef.current = false;
    }

    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }

    const formData = new FormData();

const cleanImage = await normalizeImageForUpload(sourceFile);

  formData.append("image", cleanImage);

    const fields: Record<string, string> = {
      ...nextDesign,
      cinewallType: config.type,
      cinewallWidth: nextDesign.cinewallWidth || config.width,
      fireplaceModel:
        nextDesign.fireplace === "Ja"
          ? nextDesign.fireplaceModel || config.fireplace
          : "Geen",
      cabinet:
        nextDesign.cabinetType !== "None"
          ? nextDesign.cabinetType
          : config.cabinet,
      wood:
        nextDesign.woodEnabled === "Ja"
          ? nextDesign.woodType || config.wood
          : "Geen",
      price: config.price,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value || "");
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
            : data?.error ||
                "Het ontwerp kon niet worden gemaakt. Probeer opnieuw."
        );
      }

      if (typeof data?.image !== "string" || !data.image.trim()) {
        throw new Error("Geen afbeelding ontvangen. Probeer opnieuw.");
      }

      if (previousVersion) {
        setVersions((current) => [...current, previousVersion].slice(-8));
      } else if (!assistantEdit) {
        setVersions([]);
      }

      setDesign(nextDesign);
      setRequestMessage(buildRequestMessage(nextDesign));
      setGeneratedImage(data.image);
      setEditing(false);

      return true;
    } catch (err) {
      setError(
        controller.signal.aborted
          ? "Het ontwerpen duurde te lang. Probeer opnieuw."
          : err instanceof Error
            ? err.message
            : "Er ging iets mis. Probeer opnieuw."
      );

      return false;
    } finally {
      clearTimeout(timeout);
      controllerRef.current = null;
      busyRef.current = false;

      if (!assistantEdit) {
        setLoading(false);
      }
    }
  }

  async function generateCinewall() {
    if (!imageFile) return;

    await generateWithDesign({
      sourceFile: imageFile,
      nextDesign: design,
      assistantEdit: false,
    });
  }

  /* =========================================================
     AI ASSISTANT
  ========================================================= */

  function mergeAssistantDesign(
    current: DesignState,
    incoming: unknown
  ): DesignState {
    if (!incoming || typeof incoming !== "object") {
      return current;
    }

    const next = { ...current };
    const object = incoming as Record<string, unknown>;

    (Object.keys(next) as Array<keyof DesignState>).forEach((key) => {
      const value = object[key];

      if (typeof value === "string" && value.trim()) {
        next[key] = value.trim();
      }
    });

    if (next.shelves === "0") {
      next.lightingEnabled = "Nee";

      if (next.woodPosition === "Inside shelves only") {
        next.woodEnabled = "Nee";
      }
    }

    return next;
  }

  async function sendAssistantMessage() {
    const message = chatInput.trim();

    if (!message || assistantLoading || loading || !generatedImage) return;

    setAssistantError("");
    setChatInput("");
    setAssistantLoading(true);

    requestAnimationFrame(() => {
      chatInputRef.current?.focus({
        preventScroll: true,
      });
    });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setChatHistory((current) => [...current, userMessage]);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language,
          design,
          history: chatHistory
            .filter((item) => item.id !== "welcome")
            .slice(-12)
            .map((item) => ({
              role: item.role,
              content: item.content,
            })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Wallmade AI kon het bericht niet verwerken."
        );
      }

      const assistantReply: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: String(data.reply || "Begrepen."),
      };

      setChatHistory((current) => [...current, assistantReply]);

      const nextDesign = mergeAssistantDesign(design, data.design);

      setDesign(nextDesign);

      if (
        data.shouldRegenerate === true &&
        data.needsClarification !== true
      ) {
        const sourceFile = await generatedImageToFile();

        if (!sourceFile) {
          throw new Error("Het huidige ontwerp kon niet worden gelezen.");
        }

        const previousVersion: Version = {
          image: generatedImage,
          design,
        };

        const success = await generateWithDesign({
          sourceFile,
          nextDesign,
          assistantEdit: true,
          previousVersion,
        });

        if (success) {
          setChatHistory((current) => [
            ...current,
            {
              id: `updated-${Date.now()}`,
              role: "assistant",
              content:
                language === "ar"
                  ? "تم تحديث التصميم على نفس الصورة ✓"
                  : language === "tr"
                    ? "Tasarım aynı görsel üzerinde güncellendi ✓"
                    : language === "de"
                      ? "Das Design wurde im selben Bild aktualisiert ✓"
                      : language === "en"
                        ? "The design has been updated on the same image ✓"
                        : "Het ontwerp is op dezelfde afbeelding bijgewerkt ✓",
            },
          ]);
        }
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Wallmade AI kon het bericht niet verwerken.";

      setAssistantError(message);

      setChatHistory((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            language === "ar"
              ? "صار خطأ أثناء معالجة الطلب. جرّب مرة ثانية."
              : "Er ging iets mis bij het verwerken van je verzoek. Probeer opnieuw.",
        },
      ]);
    } finally {
      setAssistantLoading(false);
    }
  }

  function handleChatKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendAssistantMessage();
    }
  }

  function undoLastVersion() {
    setVersions((current) => {
      if (!current.length) return current;

      const next = [...current];
      const previous = next.pop();

      if (previous) {
        setGeneratedImage(previous.image);
        setDesign(previous.design);
        setRequestMessage(buildRequestMessage(previous.design));
        setShowOriginal(false);

        setChatHistory((history) => [
          ...history,
          {
            id: `undo-${Date.now()}`,
            role: "assistant",
            content:
              language === "ar"
                ? "رجعت للتصميم السابق ✓"
                : language === "tr"
                  ? "Önceki tasarıma geri dönüldü ✓"
                  : language === "de"
                    ? "Zum vorherigen Design zurückgekehrt ✓"
                    : language === "en"
                      ? "Returned to the previous design ✓"
                      : "Terug naar het vorige ontwerp ✓",
          },
        ]);
      }

      return next;
    });
  }

  /* =========================================================
     OPTIONS
  ========================================================= */

  const styleOptions = ["Modern", "Luxury", "Minimal"];
  const tvSizes = ["55", "65", "75", "85", "98"];
  const shelfOptions = ["0", "2", "4", "6"];

  const summaryChips = useMemo(
    () => [
      design.style,
      `${design.tvSize}" TV`,
      design.fireplace === "Ja" ? "Met sfeerhaard" : "Zonder sfeerhaard",
      design.shelves === "0" ? "Geen vakken" : `${design.shelves} vakken`,
      design.woodEnabled === "Ja" ? design.woodType : "Geen hout",
      design.lightingEnabled === "Ja"
        ? `${design.lightingColor} LED`
        : "Geen LED",
    ],
    [design]
  );

  const whatsappUrl =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(requestMessage)}`;

  const emailUrl =
    `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Mijn Wallmade AI-ontwerp - offerteaanvraag"
    )}` + `&body=${encodeURIComponent(requestMessage)}`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      lang="nl"
      dir="ltr"
      className="min-h-[100dvh] overflow-x-hidden overscroll-none bg-[#08090a] text-[#f4f1eb]"
    >
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[540px] w-[760px] -translate-x-1/2 rounded-full bg-[#b99154]/[0.055] blur-[140px]" />
        <div className="absolute bottom-[-220px] right-[-200px] h-[500px] w-[500px] rounded-full bg-[#765a34]/[0.04] blur-[130px]" />
      </div>

      {/* NAVBAR */}

      <nav className="relative z-20 border-b border-white/[0.06] bg-[#08090a]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9b7d4c]/45 bg-[#18140e] text-sm font-bold text-[#d4b477]">
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
                AI Interior Studio
              </div>
            </div>
          </a>

          <a
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs text-neutral-300"
          >
            ← Terug
          </a>
        </div>
      </nav>

      {/* =====================================================
          RESULT + ASSISTANT
      ===================================================== */}

      {resultVisible ? (
        <section
          ref={resultRef}
          className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-5 md:px-8 md:py-10"
        >
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 hidden items-center gap-2 rounded-full border border-[#a18554]/25 bg-[#a18554]/[0.06] px-3.5 py-2 sm:inline-flex">
                <IconSparkles className="h-3.5 w-3.5 text-[#d4b477]" />
                <span className="text-[9px] font-medium uppercase tracking-[0.23em] text-[#c6a66c]">
                  Jouw Wallmade AI ontwerp
                </span>
              </div>

              <h1 className="max-w-3xl text-[28px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-4xl md:text-5xl">
                Ontwerp. Praat.{" "}
                <span className="text-[#d4b477]">Pas direct aan.</span>
              </h1>

              <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-neutral-500 sm:block">
                Je ontwerp is klaar. Gebruik de AI Designer hieronder om
                wijzigingen aan dezelfde afbeelding te vragen.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {versions.length > 0 && (
                <button
                  type="button"
                  disabled={loading || assistantLoading}
                  onClick={undoLastVersion}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 py-2.5 text-[11px] text-neutral-300 sm:px-4 sm:py-3 sm:text-xs"
                >
                  <IconUndo className="h-4 w-4" />
                  Vorige versie
                </button>
              )}

              <button
                type="button"
                disabled={loading || assistantLoading}
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 py-2.5 text-[11px] text-neutral-300 sm:px-4 sm:py-3 sm:text-xs"
              >
                <IconSliders className="h-4 w-4" />
                Alle opties
              </button>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            {/* IMAGE */}

            <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101113]">
              <div className="relative flex min-h-[300px] items-center justify-center bg-[#050606] sm:min-h-[360px] md:min-h-[620px]">
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

                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-sm">
                    <div className="max-w-xs text-center">
                      <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-[#d4b477] border-t-transparent" />
                      <p className="mt-4 text-sm font-medium text-white">
                        Wallmade AI werkt aan je ontwerp...
                      </p>
                      {loading && (
                        <p className="mt-2 text-xs text-neutral-500">
                          {seconds}s
                        </p>
                      )}
                    </div>
                  </div>
                )}

              </div>

              <div className="border-t border-white/[0.06] px-4 pt-3 sm:px-5 sm:pt-4">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-black/35 p-1">
                  <button
                    type="button"
                    aria-pressed={showOriginal}
                    onClick={() => setShowOriginal(true)}
                    className={`rounded-lg px-4 py-2.5 text-[11px] font-medium transition sm:text-xs ${
                      showOriginal
                        ? "bg-[#efebe2] text-[#111]"
                        : "text-neutral-500"
                    }`}
                  >
                    Origineel
                  </button>

                  <button
                    type="button"
                    aria-pressed={!showOriginal}
                    onClick={() => setShowOriginal(false)}
                    className={`rounded-lg px-4 py-2.5 text-[11px] font-medium transition sm:text-xs ${
                      !showOriginal
                        ? "bg-[#d4b477] text-[#15110c]"
                        : "text-neutral-500"
                    }`}
                  >
                    AI ontwerp
                  </button>
                </div>
              </div>

              <div className="px-4 py-3 sm:p-5">
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
                  {summaryChips.map((chip) => (
                    <span
                      key={chip}
                      className="shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] text-neutral-400"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MOBILE AI TRIGGER */}

            <button
              type="button"
              onClick={() => setMobileChatOpen((value) => !value)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#957646]/20 bg-[#0e0f11] p-4 text-left xl:hidden"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#957646]/35 bg-[#17130d] text-[#d4b477]">
                  <IconMagic className="h-4 w-4" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {mobileChatOpen ? "Sluit AI Designer" : "Pas ontwerp aan met AI"}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-neutral-600">
                    Typ gewoon wat je wilt veranderen
                  </p>
                </div>
              </div>

              <span
                className={`text-xl text-[#d4b477] transition ${
                  mobileChatOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {/* MOBILE CHAT BACKDROP */}

            {mobileChatOpen && (
              <button
                type="button"
                aria-label="Sluit AI Designer"
                onClick={() => setMobileChatOpen(false)}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] xl:hidden"
              />
            )}

            {/* CHAT */}

            <div
              className={`${
                mobileChatOpen ? "flex" : "hidden"
              } fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 h-[min(72vh,620px)] max-h-[calc(100dvh-24px)] min-h-[430px] flex-col overflow-hidden rounded-[24px] border border-[#957646]/30 bg-[#0e0f11] shadow-[0_-24px_80px_rgba(0,0,0,.55)] xl:static xl:flex xl:h-auto xl:max-h-none xl:min-h-0 xl:rounded-[28px] xl:shadow-none`}
            >
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#957646]/35 bg-[#17130d] text-[#d4b477]">
                      <IconMagic className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Wallmade AI Designer
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-[10px] text-neutral-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Sluit AI Designer"
                      onClick={() => setMobileChatOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-lg text-[#d4b477] xl:hidden"
                    >
                      ×
                    </button>

                    <select
                    value={language}
                    onChange={(event) =>
                      setLanguage(event.target.value as Language)
                    }
                    className="max-w-[135px] rounded-xl border border-white/[0.07] bg-[#111214] px-2.5 py-2 text-[10px] text-neutral-400 outline-none"
                    aria-label="Chat language"
                  >
                    {(
                      ["auto", "nl", "en", "ar", "tr", "de"] as Language[]
                    ).map((value) => (
                      <option key={value} value={value}>
                        {languageLabel(value)}
                      </option>
                    ))}
                  </select>
                  </div>
                </div>

                <p className="mt-4 hidden text-[11px] leading-5 text-neutral-600 sm:block xl:block">
                  Vraag wijzigingen in je eigen taal. Ik pas je ontwerpinstellingen
                  aan en maak, wanneer nodig, een nieuwe versie van dezelfde ruimte.
                </p>
              </div>

              <div className="max-h-[45dvh] flex-1 space-y-3 overflow-y-auto p-4 xl:max-h-[500px]">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      dir="auto"
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-[12px] leading-5 ${
                        message.role === "user"
                          ? "rounded-br-md bg-[#d4b477] text-[#17130d]"
                          : "rounded-bl-md border border-white/[0.06] bg-white/[0.035] text-neutral-300"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {assistantLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.035] px-4 py-3">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4b477]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4b477] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4b477] [animation-delay:300ms]" />
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        Wallmade AI past je ontwerp aan...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {assistantError && (
                <p className="mx-4 mb-2 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-3 py-2 text-[10px] text-red-200">
                  {assistantError}
                </p>
              )}

              <div className="border-t border-white/[0.06] p-4">
                <div className="mb-3 hidden flex-wrap gap-2 sm:flex">
                  {[
                    "Hout in de vakken",
                    "Warmere LED",
                    "Haard breder",
                    "6 vakken",
                  ].map((example) => (
                    <button
                      key={example}
                      type="button"
                      disabled={assistantLoading || loading}
                      onClick={() => setChatInput(example)}
                      className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[9px] text-neutral-600 transition hover:text-neutral-300"
                    >
                      {example}
                    </button>
                  ))}
                </div>

                <div className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-[#08090a] p-2">
                  <textarea
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={handleChatKeyDown}
                    dir="auto"
                    rows={2}
                    maxLength={2000}
                    disabled={loading}
                    aria-busy={assistantLoading}
                    placeholder="Bijv. Voeg walnoothout toe in de vakken en maak het licht warmer..."
                    className="min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2 text-[12px] leading-5 text-white outline-none placeholder:text-neutral-700"
                  />

                  <button
                    type="button"
                    aria-label="Bericht versturen"
                    disabled={
                      !chatInput.trim() || assistantLoading || loading
                    }
                    onClick={() => void sendAssistantMessage()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d4b477] text-[#17130d] disabled:bg-[#242528] disabled:text-neutral-700"
                  >
                    <IconSend className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 text-center text-[9px] text-neutral-700">
                  Nederlands · English · العربية · Türkçe · Deutsch
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4 sm:mt-5 sm:gap-4 sm:bg-transparent sm:p-0 md:grid-cols-[1fr_auto] md:items-center md:border-0">
            <div>
              <h2 className="text-base font-medium sm:text-xl">
                Klaar om dit echt te laten bouwen?
              </h2>
              <p className="mt-2 text-xs leading-5 text-neutral-600">
                Wij controleren maten, materialen en technische uitvoerbaarheid
                voordat we een definitieve offerte maken.
              </p>
            </div>

            <button
              ref={contactButtonRef}
              type="button"
              onClick={openContact}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#d4b477] px-5 py-3.5 text-sm font-semibold text-[#17130d] sm:rounded-2xl sm:px-7 sm:py-4 md:w-auto"
            >
              Vraag mijn offerte aan
              <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : (
        /* =====================================================
            DESIGNER
        ===================================================== */

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
          {/* HERO */}

          <div className="mb-8 grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#987a48]/35 bg-[#18140e] px-4 py-2.5">
                <IconSparkles className="h-3.5 w-3.5 text-[#d4b477]" />
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#caaa70]">
                  Wallmade AI Design Studio
                </span>
              </div>

              <h1 className="max-w-4xl text-[39px] font-medium leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                Zie jouw nieuwe wand
                <span className="block text-[#d4b477]">
                  voordat hij bestaat.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 md:text-[15px]">
                Upload je woonkamer, stel je Cinewall samen en verfijn daarna
                elk detail met Wallmade AI.
              </p>
            </div>

            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0f10]">
              {[
                ["01", "Upload"],
                ["02", "Ontwerp"],
                ["✦", "Verfijn met AI"],
              ].map(([number, title], index) => (
                <div
                  key={title}
                  className={`p-4 sm:p-5 ${
                    index < 2 ? "border-r border-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8e7548] bg-[#17130d] text-[11px] font-semibold text-[#d7b97d]">
                    {number}
                  </div>
                  <p className="mt-4 text-[11px] font-medium text-neutral-300">
                    {title}
                  </p>
                </div>
              ))}
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
                Terug naar mijn AI ontwerp
              </button>
            </div>
          )}

          <div className="grid overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0e0f11] shadow-[0_30px_80px_rgba(0,0,0,.3)] lg:grid-cols-[1.05fr_0.95fr]">
            {/* PHOTO */}

            <div className="p-4 sm:p-5 md:p-7 lg:p-8">
              <SectionTitle
                eyebrow="01 / Jouw ruimte"
                title="Begin met een foto."
              />

              <label className="group relative mt-5 flex min-h-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-[25px] border border-dashed border-white/[0.12] bg-[#070808] transition hover:border-[#a18554]/50 md:min-h-[500px]">
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

                      <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] text-neutral-300">
                        Foto wijzigen
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="max-w-sm px-7 py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#9a7b49]/45 bg-[#17130d] text-[#d4b477]">
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
                      <span>•</span>
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
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d4b477]/10 text-[#d4b477]">
                  <IconSparkles className="h-3.5 w-3.5" />
                </span>

                <p className="text-[10px] leading-5 text-neutral-600">
                  <span className="font-medium text-neutral-400">
                    Beste resultaat:
                  </span>{" "}
                  fotografeer de wand recht van voren, zonder mensen en met
                  voldoende licht.
                </p>
              </div>
            </div>

            {/* OPTIONS */}

            <div className="border-t border-white/[0.06] p-4 sm:p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <SectionTitle
                eyebrow="02 / Jouw ontwerp"
                title="Maak het helemaal van jou."
                text="Begin eenvoudig. Open daarna de geavanceerde opties als je elk detail wilt bepalen."
              />

              <fieldset
                disabled={loading}
                className="mt-7 space-y-7 disabled:opacity-50"
              >
                {/* STYLE */}

                <div>
                  <p className="mb-3 text-sm font-medium">Interieurstijl</p>

                  <div className="grid grid-cols-3 gap-2">
                    {styleOptions.map((value) => (
                      <ToggleChoice
                        key={value}
                        label={value}
                        active={design.style === value}
                        onClick={() => updateDesign("style", value)}
                      />
                    ))}
                  </div>
                </div>

                {/* TV */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">TV-formaat</p>
                    <span className="text-xs font-semibold text-[#d4b477]">
                      {design.tvSize}&quot;
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {tvSizes.map((value) => (
                      <ToggleChoice
                        key={value}
                        label={value}
                        active={design.tvSize === value}
                        onClick={() => updateDesign("tvSize", value)}
                      />
                    ))}
                  </div>
                </div>

                {/* FIREPLACE */}

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Elektrische sfeerhaard
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <ToggleChoice
                      label="Met haard"
                      active={design.fireplace === "Ja"}
                      onClick={() => updateDesign("fireplace", "Ja")}
                    />

                    <ToggleChoice
                      label="Zonder haard"
                      active={design.fireplace === "Nee"}
                      onClick={() => updateDesign("fireplace", "Nee")}
                    />
                  </div>
                </div>

                {/* SHELVES */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Decoratieve vakken</p>
                    <span className="text-[9px] text-neutral-700">
                      {design.shelves} gekozen
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {shelfOptions.map((value) => (
                      <ToggleChoice
                        key={value}
                        label={value === "0" ? "Geen" : value}
                        active={design.shelves === value}
                        onClick={() => {
                          setDesign((current) => ({
                            ...current,
                            shelves: value,
                            lightingEnabled:
                              value === "0"
                                ? "Nee"
                                : current.lightingEnabled,
                            woodEnabled:
                              value === "0" &&
                              current.woodPosition === "Inside shelves only"
                                ? "Nee"
                                : current.woodEnabled,
                          }));
                        }}
                      />
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* ADVANCED */}

              <div className="mt-7 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen((value) => !value)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4b477]/10 text-[#d4b477]">
                      <IconSliders className="h-4 w-4" />
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        Geavanceerde opties
                      </p>
                      <p className="mt-1 text-[9px] text-neutral-600">
                        Hout, LED, vakken, TV, haard, meubel en afwerking
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-lg text-neutral-500 transition ${
                      advancedOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {advancedOpen && (
                  <div className="space-y-7 border-t border-white/[0.06] p-4">
                    {/* LAYOUT */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        Layout
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label>
                          <span className="mb-2 block text-[11px] font-medium text-neutral-400">
                            Cinewall breedte
                          </span>
                          <input
                            value={design.cinewallWidth}
                            onChange={(event) =>
                              updateDesign(
                                "cinewallWidth",
                                event.target.value
                              )
                            }
                            placeholder="Bijv. 2.8m"
                            className="w-full rounded-xl border border-white/[0.07] bg-[#111214] px-3 py-3 text-[12px] text-neutral-300 outline-none focus:border-[#8d7247]"
                          />
                        </label>

                        <SelectField
                          label="Uitlijning"
                          value={design.layoutAlignment}
                          options={["Centered", "Full wall"]}
                          onChange={(value) =>
                            updateDesign("layoutAlignment", value)
                          }
                        />

                        <SelectField
                          label="Symmetrie"
                          value={design.symmetry}
                          options={["Symmetrical", "Asymmetrical"]}
                          onChange={(value) =>
                            updateDesign("symmetry", value)
                          }
                        />

                        <SelectField
                          label="Hoogte"
                          value={design.heightStyle}
                          options={["Normal", "Tall", "Floor-to-ceiling"]}
                          onChange={(value) =>
                            updateDesign("heightStyle", value)
                          }
                        />
                      </div>
                    </div>

                    {/* SHELVES */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        Vakken / niches
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label>
                          <span className="mb-2 block text-[11px] font-medium text-neutral-400">
                            Exact aantal
                          </span>
                          <input
                            type="number"
                            min="0"
                            max="12"
                            value={design.shelves}
                            onChange={(event) => {
                              const value = String(
                                Math.max(
                                  0,
                                  Math.min(
                                    12,
                                    Number.parseInt(event.target.value || "0", 10)
                                  )
                                )
                              );

                              setDesign((current) => ({
                                ...current,
                                shelves: value,
                                lightingEnabled:
                                  value === "0"
                                    ? "Nee"
                                    : current.lightingEnabled,
                              }));
                            }}
                            className="w-full rounded-xl border border-white/[0.07] bg-[#111214] px-3 py-3 text-[12px] text-neutral-300 outline-none"
                          />
                        </label>

                        <SelectField
                          label="Positie"
                          value={design.shelfPosition}
                          options={["Both sides", "Left", "Right"]}
                          onChange={(value) =>
                            updateDesign("shelfPosition", value)
                          }
                        />

                        <SelectField
                          label="Vorm"
                          value={design.shelfShape}
                          options={[
                            "Rectangle",
                            "Square",
                            "Vertical",
                            "Horizontal",
                          ]}
                          onChange={(value) =>
                            updateDesign("shelfShape", value)
                          }
                        />

                        <SelectField
                          label="Diepte"
                          value={design.shelfDepth}
                          options={["Shallow", "Medium", "Deep"]}
                          onChange={(value) =>
                            updateDesign("shelfDepth", value)
                          }
                        />

                        <SelectField
                          label="Type"
                          value={design.shelfType}
                          options={["Open", "Closed look", "Mixed"]}
                          onChange={(value) =>
                            updateDesign("shelfType", value)
                          }
                        />
                      </div>
                    </div>

                    {/* WOOD */}

                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                          Hout
                        </p>

                        <div className="flex gap-2">
                          <ToggleChoice
                            label="Ja"
                            active={design.woodEnabled === "Ja"}
                            onClick={() =>
                              updateDesign("woodEnabled", "Ja")
                            }
                          />
                          <ToggleChoice
                            label="Nee"
                            active={design.woodEnabled === "Nee"}
                            onClick={() =>
                              updateDesign("woodEnabled", "Nee")
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="Houtsoort"
                          value={design.woodType}
                          options={[
                            "Light Oak",
                            "Natural Oak",
                            "Walnut",
                            "Black Wood",
                          ]}
                          onChange={(value) =>
                            updateDesign("woodType", value)
                          }
                          disabled={design.woodEnabled !== "Ja"}
                        />

                        <SelectField
                          label="Waar komt het hout?"
                          value={design.woodPosition}
                          options={[
                            "Inside shelves only",
                            "Back panel only",
                            "Side accents",
                            "Full niche finish",
                          ]}
                          onChange={(value) =>
                            updateDesign("woodPosition", value)
                          }
                          disabled={design.woodEnabled !== "Ja"}
                        />

                        <SelectField
                          label="Houtstijl"
                          value={design.woodStyle}
                          options={["Smooth", "Slatted", "Textured"]}
                          onChange={(value) =>
                            updateDesign("woodStyle", value)
                          }
                          disabled={design.woodEnabled !== "Ja"}
                        />
                      </div>
                    </div>

                    {/* LIGHTING */}

                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                          LED verlichting
                        </p>

                        <div className="flex gap-2">
                          <ToggleChoice
                            label="Ja"
                            active={design.lightingEnabled === "Ja"}
                            onClick={() =>
                              updateDesign("lightingEnabled", "Ja")
                            }
                          />
                          <ToggleChoice
                            label="Nee"
                            active={design.lightingEnabled === "Nee"}
                            onClick={() =>
                              updateDesign("lightingEnabled", "Nee")
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="Lichtkleur"
                          value={design.lightingColor}
                          options={["Warm", "Neutral", "Cool"]}
                          onChange={(value) =>
                            updateDesign("lightingColor", value)
                          }
                          disabled={
                            design.lightingEnabled !== "Ja" ||
                            design.shelves === "0"
                          }
                        />

                        <SelectField
                          label="Sterkte"
                          value={design.lightingStrength}
                          options={["Soft", "Medium", "Strong"]}
                          onChange={(value) =>
                            updateDesign("lightingStrength", value)
                          }
                          disabled={
                            design.lightingEnabled !== "Ja" ||
                            design.shelves === "0"
                          }
                        />

                        <SelectField
                          label="Positie"
                          value={design.lightingPosition}
                          options={[
                            "Top only",
                            "Top + sides",
                            "Hidden glow",
                          ]}
                          onChange={(value) =>
                            updateDesign("lightingPosition", value)
                          }
                          disabled={
                            design.lightingEnabled !== "Ja" ||
                            design.shelves === "0"
                          }
                        />
                      </div>
                    </div>

                    {/* TV */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        TV
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="TV stijl"
                          value={design.tvStyle}
                          options={[
                            "Standard",
                            "Frameless",
                            "Premium thin",
                          ]}
                          onChange={(value) =>
                            updateDesign("tvStyle", value)
                          }
                        />

                        <SelectField
                          label="TV positie"
                          value={design.tvPosition}
                          options={[
                            "Center",
                            "Slightly higher",
                            "Slightly lower",
                          ]}
                          onChange={(value) =>
                            updateDesign("tvPosition", value)
                          }
                        />

                        <SelectField
                          label="Visuele nadruk"
                          value={design.tvEmphasis}
                          options={[
                            "Balanced",
                            "Bigger visual focus",
                          ]}
                          onChange={(value) =>
                            updateDesign("tvEmphasis", value)
                          }
                        />
                      </div>
                    </div>

                    {/* FIREPLACE */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        Sfeerhaard
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label>
                          <span className="mb-2 block text-[11px] font-medium text-neutral-400">
                            Haardmodel
                          </span>
                          <input
                            value={design.fireplaceModel}
                            disabled={design.fireplace !== "Ja"}
                            onChange={(event) =>
                              updateDesign(
                                "fireplaceModel",
                                event.target.value
                              )
                            }
                            placeholder="Bijv. 3D 183 cm"
                            className="w-full rounded-xl border border-white/[0.07] bg-[#111214] px-3 py-3 text-[12px] text-neutral-300 outline-none disabled:opacity-40"
                          />
                        </label>

                        <SelectField
                          label="Breedte"
                          value={design.fireplaceWidth}
                          options={["Narrow", "Medium", "Wide"]}
                          onChange={(value) =>
                            updateDesign("fireplaceWidth", value)
                          }
                          disabled={design.fireplace !== "Ja"}
                        />

                        <SelectField
                          label="Positie"
                          value={design.fireplacePosition}
                          options={["Under TV", "Lower section"]}
                          onChange={(value) =>
                            updateDesign("fireplacePosition", value)
                          }
                          disabled={design.fireplace !== "Ja"}
                        />

                        <SelectField
                          label="Afwerking"
                          value={design.fireplaceFinish}
                          options={[
                            "Seamless",
                            "Minimal frame",
                            "Luxury frame",
                          ]}
                          onChange={(value) =>
                            updateDesign("fireplaceFinish", value)
                          }
                          disabled={design.fireplace !== "Ja"}
                        />
                      </div>
                    </div>

                    {/* CABINET */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        TV-meubel
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="Type"
                          value={design.cabinetType}
                          options={[
                            "None",
                            "Floating",
                            "Full width",
                            "Compact",
                          ]}
                          onChange={(value) =>
                            updateDesign("cabinetType", value)
                          }
                        />

                        <SelectField
                          label="Breedte"
                          value={design.cabinetWidth}
                          options={["Auto", "180 cm", "240 cm", "280 cm"]}
                          onChange={(value) =>
                            updateDesign("cabinetWidth", value)
                          }
                          disabled={design.cabinetType === "None"}
                        />

                        <SelectField
                          label="Kleur"
                          value={design.cabinetColor}
                          options={[
                            "Match wall",
                            "Wood",
                            "Dark",
                            "Light",
                          ]}
                          onChange={(value) =>
                            updateDesign("cabinetColor", value)
                          }
                          disabled={design.cabinetType === "None"}
                        />

                        <SelectField
                          label="Afwerking"
                          value={design.cabinetFinish}
                          options={["Minimal", "Storage", "Premium"]}
                          onChange={(value) =>
                            updateDesign("cabinetFinish", value)
                          }
                          disabled={design.cabinetType === "None"}
                        />
                      </div>
                    </div>

                    {/* FINISH */}

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b89861]">
                        Kleur & afwerking
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <SelectField
                          label="Wandkleur"
                          value={design.wallColor}
                          options={[
                            "Light",
                            "Warm beige",
                            "Taupe",
                            "Dark",
                          ]}
                          onChange={(value) =>
                            updateDesign("wallColor", value)
                          }
                        />

                        <SelectField
                          label="Oppervlakte"
                          value={design.finishStyle}
                          options={[
                            "Smooth plaster",
                            "Matte luxury",
                            "Soft stone look",
                          ]}
                          onChange={(value) =>
                            updateDesign("finishStyle", value)
                          }
                        />

                        <SelectField
                          label="Contrast"
                          value={design.contrast}
                          options={["Soft", "Balanced", "Bold"]}
                          onChange={(value) =>
                            updateDesign("contrast", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* GENERATE */}

              <div className="mt-7 border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  disabled={!imageFile || loading}
                  onClick={() => void generateCinewall()}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#d4b477] px-5 py-[17px] text-sm font-semibold text-[#15110c] transition hover:bg-[#dfc38b] disabled:cursor-not-allowed disabled:bg-[#202124] disabled:text-neutral-700"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      AI creëert jouw ontwerp... {seconds}s
                    </>
                  ) : (
                    <>
                      <IconMagic className="h-4 w-4" />
                      {imageFile
                        ? generatedImage
                          ? "Genereer nieuwe versie"
                          : "Genereer mijn ontwerp met AI"
                        : "Upload eerst een foto"}
                    </>
                  )}
                </button>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <SmallCheck>Persoonlijk</SmallCheck>
                  <SmallCheck>Geavanceerd</SmallCheck>
                  <SmallCheck>AI Assistant</SmallCheck>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#957646]/20 bg-[#0e0f10] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#957646]/35 bg-[#17130d] text-[#d4b477]">
                <IconMagic className="h-5 w-5" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">
                    Wallmade AI Assistant
                  </p>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-emerald-300">
                    Actief na generatie
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  Na je eerste ontwerp kun je in je eigen taal vragen om
                  wijzigingen. De assistent onthoudt je instellingen en past
                  het ontwerp verder aan.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ERROR */}

      {error && (
        <div className="relative z-30 mx-auto max-w-7xl px-4 pb-6 sm:px-5 md:px-8">
          <div
            role="alert"
            className="rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-4"
          >
            <p className="text-sm font-medium text-red-200">
              Er ging iets mis
            </p>
            <p className="mt-1 text-xs leading-5 text-red-200/60">{error}</p>
          </div>
        </div>
      )}

      {/* CONTACT POPUP */}

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-title"
        onCancel={() => setContactOpen(false)}
        onClose={() => {
          setContactOpen(false);
          contactButtonRef.current?.focus({ preventScroll: true });
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-lg text-neutral-500"
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

          <div className="mt-6 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.07] p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">WhatsApp</p>
                <p className="mt-1 text-[10px] text-neutral-600">
                  Snel contact en persoonlijke offerte
                </p>
              </div>
              <IconArrow className="h-4 w-4 text-[#25D366]" />
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <div>
                <p className="text-sm font-semibold">Instagram</p>
                <p className="mt-1 text-[10px] text-neutral-600">
                  @solutionbouw.nl
                </p>
              </div>
              <IconArrow className="h-4 w-4 text-neutral-600" />
            </a>

            <a
              href={emailUrl}
              className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <div>
                <p className="text-sm font-semibold">E-mail</p>
                <p className="mt-1 text-[10px] text-neutral-600">
                  Ontvang een persoonlijke offerte
                </p>
              </div>
              <IconArrow className="h-4 w-4 text-neutral-600" />
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
        </div>
      </dialog>
    </main>
  );
}
