"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Fireplace = {

  id: string;

  name: string;

  size: string;

  price: number;

};

type CustomerForm = {

  name: string;

  phone: string;

  email: string;

  postcode: string;

  city: string;

  wallWidth: string;

  wallHeight: string;

  notes: string;

};

const WHATSAPP_NUMBER = "31643583800";

const fireplaces: Fireplace[] = [

  { id: "royal-127", name: "Royal Diamond", size: "127 cm", price: 599 },

  { id: "royal-152", name: "Royal Diamond", size: "152 cm", price: 749 },

  { id: "royal-183", name: "Royal Diamond", size: "183 cm", price: 899 },

  { id: "royal-254", name: "Royal Diamond", size: "254 cm", price: 1299 },

  { id: "decori-128", name: "Decori Slimline", size: "128 cm", price: 549 },

  { id: "decori-152", name: "Decori Slimline", size: "152 cm", price: 649 },

  { id: "decori-183", name: "Decori Slimline", size: "183 cm", price: 799 },

  { id: "decori-254", name: "Decori Slimline", size: "254 cm", price: 1199 },

  { id: "mazar-91", name: "Mazar 3D", size: "91 cm", price: 599 },

  { id: "mazar-152", name: "Mazar 3D", size: "152 cm", price: 949 },

  { id: "mazar-183", name: "Mazar 3D", size: "183 cm", price: 1099 },

  { id: "mazar-254", name: "Mazar 3D", size: "254 cm", price: 1499 },

  { id: "deep-84", name: "Deep Diamond", size: "84 cm", price: 2950 },

  { id: "deep-160", name: "Deep Diamond", size: "160 cm", price: 3850 },

  { id: "deep-190", name: "Deep Diamond", size: "190 cm", price: 4250 },

  { id: "deep-220", name: "Deep Diamond", size: "220 cm", price: 4750 },

];

const cinewallTypes = [

  {

    id: "simple",

    name: "Simple",

    description: "Strakke Cinewall zonder nissen",

    shelves: 0,

    price: 1400,

  },

  {

    id: "2-nissen",

    name: "2 nissen",

    description: "1 nis aan iedere zijde",

    shelves: 2,

    price: 2000,

  },

  {

    id: "4-nissen",

    name: "4 nissen",

    description: "2 nissen aan iedere zijde",

    shelves: 4,

    price: 2600,

  },

  {

    id: "6-nissen",

    name: "6 nissen",

    description: "3 nissen aan iedere zijde",

    shelves: 6,

    price: 3200,

  },

];

const cabinets = [

  { id: "none", name: "Geen TV-meubel", price: 0 },

  { id: "180", name: "TV-meubel 180 cm", price: 400 },

  { id: "240", name: "TV-meubel 240 cm", price: 600 },

  { id: "280", name: "TV-meubel 280 cm", price: 800 },

];

const includedItems = [

  "Montage van de Cinewall",

  "Montage van de televisie",

  "Montage van de elektrische haard",

  "Stuc- en bouwwerkzaamheden",

  "Verlichting in de nissen",

  "Voorbereiding televisie-aansluiting",

  "Voorbereiding haard-aansluiting",

  "Aanpassen bestaande bekabeling GRATIS",

  "Transport inbegrepen",

  "BTW inbegrepen",

];

function money(value: number) {

  return new Intl.NumberFormat("nl-NL", {

    style: "currency",

    currency: "EUR",

    maximumFractionDigits: 0,

  }).format(value);

}

function ToggleOption({

  title,

  description,

  price,

  active,

  disabled = false,

  onClick,

}: {

  title: string;

  description: string;

  price: string;

  active: boolean;

  disabled?: boolean;

  onClick: () => void;

}) {

  return (

    <button

      type="button"

      disabled={disabled}

      onClick={onClick}

      aria-pressed={active}

      className={`w-full min-w-0 touch-manipulation rounded-[22px] border p-4 text-left transition-colors duration-75 ${

        disabled

          ? "cursor-not-allowed border-black/[0.05] bg-black/[0.025] opacity-40"

          : active

          ? "border-[#C17D49] bg-[#FFF8F0]"

          : "border-black/[0.08] bg-white"

      }`}

    >

      <div className="flex min-w-0 items-center justify-between gap-3">

        <div className="min-w-0 flex-1">

          <p className="break-words text-[15px] font-medium text-[#1D1D1B]">

            {title}

          </p>

          <p className="mt-1 break-words text-xs leading-5 text-black/45">

            {description}

          </p>

        </div>

        <div className="flex shrink-0 items-center gap-2">

          <span className="hidden text-xs font-medium text-black/45 min-[370px]:block">

            {price}

          </span>

          <span

            className={`relative h-7 w-12 shrink-0 rounded-full transition ${

              active ? "bg-[#C17D49]" : "bg-black/15"

            }`}

          >

            <span

              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${

                active ? "translate-x-6" : "translate-x-1"

              }`}

            />

          </span>

        </div>

      </div>

      <p className="mt-3 text-xs font-medium text-[#9B6038] min-[370px]:hidden">

        {price}

      </p>

    </button>

  );

}

export default function CinewallConfigurator() {

  const [cinewallType, setCinewallType] = useState("simple");

  const [width, setWidth] = useState(2);

  const [fireplace, setFireplace] = useState("none");

  const [cabinet, setCabinet] = useState("none");

  const [woodInNiches, setWoodInNiches] = useState(false);

  const [painting, setPainting] = useState(false);

  const [removeOld, setRemoveOld] = useState(false);

  const [extraPowerPoints, setExtraPowerPoints] = useState(0);

  const [quoteOpen, setQuoteOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerForm>({

    name: "",

    phone: "",

    email: "",

    postcode: "",

    city: "",

    wallWidth: "",

    wallHeight: "",

    notes: "",

  });

  const quoteRef = useRef<HTMLElement>(null);

  const selectedCinewall =

    cinewallTypes.find((item) => item.id === cinewallType) ??

    cinewallTypes[0];

  const selectedFireplace =

    fireplaces.find((item) => item.id === fireplace) ?? null;

  const selectedCabinet =

    cabinets.find((item) => item.id === cabinet) ?? cabinets[0];

  const fireplaceFamily = selectedFireplace?.name ?? "none";

  const currentFamilyFireplaces = selectedFireplace

    ? fireplaces.filter((item) => item.name === selectedFireplace.name)

    : [];

  const widthExtra = Math.round(Math.max(0, width - 2) * 200);

  const total = useMemo(() => {

    let result = selectedCinewall.price;

    result += widthExtra;

    if (selectedFireplace) {

      result += selectedFireplace.price;

    }

    result += selectedCabinet.price;

    if (woodInNiches && selectedCinewall.shelves > 0) {

      result += 300;

    }

    if (painting) {

      result += 600;

    }

    if (removeOld) {

      result += 500;

    }

    result += extraPowerPoints * 100;

    return result;

  }, [

    selectedCinewall,

    widthExtra,

    selectedFireplace,

    selectedCabinet,

    woodInNiches,

    painting,

    removeOld,

    extraPowerPoints,

  ]);

  const aiUrl =

    `/ai-designer?type=${encodeURIComponent(selectedCinewall.name)}` +

    `&width=${width}` +

    `&fireplace=${encodeURIComponent(

      selectedFireplace

        ? `${selectedFireplace.name} ${selectedFireplace.size}`

        : "Geen"

    )}` +

    `&cabinet=${encodeURIComponent(selectedCabinet.name)}` +

    `&wood=${woodInNiches}` +

    `&price=${total}`;

  function chooseCinewall(id: string) {

    const next = cinewallTypes.find((item) => item.id === id);

    if (!next) return;

    setCinewallType(id);

    if (next.shelves === 0) {

      setWoodInNiches(false);

    }

  }

  function chooseFireplaceFamily(family: string) {

    if (family === "none") {

      setFireplace("none");

      return;

    }

    const first = fireplaces.find((item) => item.name === family);

    if (first) {

      setFireplace(first.id);

    }

  }

  function openQuote() {

    setQuoteOpen(true);

    window.setTimeout(() => {

      quoteRef.current?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }, 80);

  }

  function updateCustomer(field: keyof CustomerForm, value: string) {

    setCustomer((current) => ({

      ...current,

      [field]: value,

    }));

  }

  function sendWhatsApp(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const message = [

      "Hallo Wallmade,",

      "",

      "Ik wil graag een offerte aanvragen voor mijn Cinewall.",

      "",

      "MIJN CONFIGURATIE",

      `â€¢ Model: ${selectedCinewall.name}`,

      `â€¢ Cinewall breedte: ${width} meter`,

      `â€¢ Elektrische haard: ${

        selectedFireplace

          ? `${selectedFireplace.name} ${selectedFireplace.size}`

          : "Geen"

      }`,

      `â€¢ TV-meubel: ${selectedCabinet.name}`,

      `â€¢ Hout in de nissen: ${

        woodInNiches && selectedCinewall.shelves > 0 ? "Ja" : "Nee"

      }`,

      `â€¢ Wit schilderwerk: ${painting ? "Ja" : "Nee"}`,

      `â€¢ Oude Cinewall verwijderen: ${removeOld ? "Ja" : "Nee"}`,

      `â€¢ Extra stroompunten: ${extraPowerPoints}`,

      "",

      `Geschatte totaalprijs: ${money(total)}`,

      "",

      "MIJN GEGEVENS",

      `â€¢ Naam: ${customer.name}`,

      `â€¢ Telefoon: ${customer.phone}`,

      `â€¢ E-mail: ${customer.email}`,

      `â€¢ Postcode: ${customer.postcode}`,

      `â€¢ Plaats: ${customer.city}`,

      `â€¢ Exacte wandbreedte: ${customer.wallWidth} cm`,

      `â€¢ Wandhoogte: ${customer.wallHeight} cm`,

      customer.notes ? `â€¢ Opmerking: ${customer.notes}` : "",

      "",

      "Ik stuur via WhatsApp ook een foto van de wand.",

    ]

      .filter(Boolean)

      .join("\n");

    window.open(

      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,

      "_blank",

      "noopener,noreferrer"

    );

  }

  const inputClass =

    "mt-2 block w-full min-w-0 rounded-2xl border border-black/[0.09] bg-white px-4 py-3.5 text-[16px] text-[#1D1D1B] outline-none placeholder:text-black/30 focus:border-[#C17D49]";

  return (

    <main

      lang="nl"

      className="min-h-screen w-full max-w-full overflow-x-clip bg-[#F5F1EA] pb-32 text-[#1D1D1B] [touch-action:manipulation] [&_button]:touch-manipulation [&_button]:select-none lg:pb-16"

    >

      {/* HEADER */}

      <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-[#F5F1EA]/95 backdrop-blur-xl">

        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">

          <a

            href="/"

            className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.22em] min-[360px]:text-sm"

          >

            Wallmade

          </a>

          <a

            href="/"

            className="shrink-0 rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm"

          >

            â† Terug

          </a>

        </div>

      </header>

      <div className="mx-auto w-full max-w-[1380px] min-w-0 px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-14">

        {/* HERO */}

        <section className="min-w-0">

          <div className="flex min-w-0 items-center gap-3">

            <span className="h-px w-9 shrink-0 bg-[#C17D49]" />

            <p className="min-w-0 truncate text-[10px] uppercase tracking-[0.27em] text-[#9B6038] sm:text-xs">

              Cinewall configurator

            </p>

          </div>

          <h1 className="mt-6 max-w-[800px] break-words text-[clamp(3rem,14vw,5rem)] font-light leading-[0.92] tracking-[-0.055em]">

            Stel jouw

            <br />

            Cinewall samen.

          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/50">

            Kies jouw model, afmetingen, haard en afwerking. De prijs verandert

            direct mee met jouw keuzes.

          </p>

        </section>

        {/* STEPS */}

        <div className="mt-8 w-full min-w-0 overflow-hidden">

          <div className="flex w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {[

              ["01", "Model"],

              ["02", "Maat"],

              ["03", "Haard"],

              ["04", "Meubel"],

              ["05", "Extra's"],

            ].map(([number, label]) => (

              <div

                key={number}

                className="flex shrink-0 items-center gap-2 rounded-full border border-black/[0.07] bg-white/55 px-4 py-2.5 text-xs"

              >

                <span className="text-[#B97848]">{number}</span>

                <span className="text-black/50">{label}</span>

              </div>

            ))}

          </div>

        </div>

        {/* CONTENT */}

        <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-7">

          <div className="w-full min-w-0 space-y-5">

            {/* MODEL */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/55 p-4 sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">

                Stap 01

              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">

                Kies jouw model

              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">

                Tik op een model om direct te wisselen.

              </p>

              <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">

                {cinewallTypes.map((item) => {

                  const active = cinewallType === item.id;

                  return (

                    <button

                      key={item.id}

                      type="button"

                      onClick={() => chooseCinewall(item.id)}

                      aria-pressed={active}

                      className={`w-full min-w-0 touch-manipulation overflow-hidden rounded-[22px] border p-4 text-left transition active:scale-[0.995] ${

                        active

                          ? "border-[#C17D49] bg-[#FFF8F0]"

                          : "border-black/[0.08] bg-white"

                      }`}

                    >

                      <div className="flex min-w-0 items-start justify-between gap-3">

                        <div className="min-w-0 flex-1">

                          <p className="break-words text-lg font-medium">

                            {item.name}

                          </p>

                          <p className="mt-2 break-words text-sm leading-5 text-black/45">

                            {item.description}

                          </p>

                        </div>

                        {active && (

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C17D49] text-sm text-white">

                            âœ“

                          </span>

                        )}

                      </div>

                      <div className="mt-7 flex min-w-0 items-end justify-between gap-3">

                        <span className="text-xs text-black/35">Basisprijs</span>

                        <span className="shrink-0 font-semibold">

                          {money(item.price)}

                        </span>

                      </div>

                    </button>

                  );

                })}

              </div>

              <p className="mt-4 text-xs leading-5 text-black/40">

                Basisprijzen gelden voor een Cinewall tot 2 meter breed.

              </p>

            </section>

            {/* WIDTH */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/55 p-4 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">Stap 02</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">Kies de breedte</h2>
              <p className="mt-2 text-sm leading-6 text-black/45">Stel de gewenste breedte van jouw Cinewall in.</p>

              <div className="mt-5 rounded-[24px] border border-black/[0.08] bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-label="Breedte verkleinen"
                    disabled={width <= 2}
                    onClick={() => setWidth((current) => Math.max(2, Number((current - 0.5).toFixed(1))))}
                    className="flex h-14 w-14 shrink-0 touch-manipulation select-none items-center justify-center rounded-full border border-black/10 bg-[#F5F1EA] text-3xl font-light active:scale-90 disabled:opacity-25"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >âˆ’</button>

                  <div className="min-w-0 flex-1 rounded-[20px] bg-[#1D1D1B] px-3 py-4 text-center text-white">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-white/45">Breedte</span>
                    <span className="mt-1 block text-3xl font-semibold tracking-[-0.04em]">
                      {width.toFixed(1)}<span className="ml-1 text-lg font-normal text-white/60">m</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Breedte vergroten"
                    disabled={width >= 6}
                    onClick={() => setWidth((current) => Math.min(6, Number((current + 0.5).toFixed(1))))}
                    className="flex h-14 w-14 shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-[#C17D49] text-3xl font-light text-white active:scale-90 disabled:opacity-25"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >+</button>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map((value) => {
                    const active = width === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setWidth(value)}
                        aria-pressed={active}
                        className={`min-h-[46px] touch-manipulation rounded-[14px] border text-sm font-medium active:scale-95 ${active ? "border-[#C17D49] bg-[#C17D49] text-white" : "border-black/[0.08] bg-[#F8F5F0] text-[#1D1D1B]"}`}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >{value}m</button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                  <div>
                    <p className="text-sm font-medium">Meerprijs breedte</p>
                    <p className="mt-0.5 text-xs text-black/40">â‚¬200 per extra meter</p>
                  </div>
                  <span className="shrink-0 text-base font-semibold text-[#9B6038]">
                    {widthExtra > 0 ? `+ ${money(widthExtra)}` : "Inbegrepen"}
                  </span>
                </div>
              </div>
            </section>

            {/* FIREPLACE */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/55 p-4 sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">

                Stap 03

              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">

                Elektrische haard

              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">

                Kies eerst het model en daarna het formaat.

              </p>

              <div className="mt-5 w-full min-w-0 overflow-hidden">

                <div className="flex w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                  <button

                    type="button"

                    onClick={() => chooseFireplaceFamily("none")}

                    className={`shrink-0 rounded-full border px-4 py-3 text-sm ${

                      fireplaceFamily === "none"

                        ? "border-[#1D1D1B] bg-[#1D1D1B] text-white"

                        : "border-black/[0.08] bg-white"

                    }`}

                  >

                    Geen haard

                  </button>

                  {[

                    "Royal Diamond",

                    "Decori Slimline",

                    "Mazar 3D",

                    "Deep Diamond",

                  ].map((family) => (

                    <button

                      key={family}

                      type="button"

                      onClick={() => chooseFireplaceFamily(family)}

                      className={`shrink-0 rounded-full border px-4 py-3 text-sm ${

                        fireplaceFamily === family

                          ? "border-[#C17D49] bg-[#C17D49] text-white"

                          : "border-black/[0.08] bg-white"

                      }`}

                    >

                      {family}

                    </button>

                  ))}

                </div>

              </div>

              {selectedFireplace ? (

                <div className="mt-4 grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-4">

                  {currentFamilyFireplaces.map((item) => {

                    const active = fireplace === item.id;

                    return (

                      <button

                        key={item.id}

                        type="button"

                        onClick={() => setFireplace(item.id)}

                        className={`min-w-0 rounded-[18px] border p-3 text-left ${

                          active

                            ? "border-[#C17D49] bg-[#FFF8F0]"

                            : "border-black/[0.08] bg-white"

                        }`}

                      >

                        <div className="flex min-w-0 items-center justify-between gap-2">

                          <span className="min-w-0 truncate text-sm font-medium">

                            {item.size}

                          </span>

                          {active && (

                            <span className="shrink-0 text-[#C17D49]">âœ“</span>

                          )}

                        </div>

                        <span className="mt-2 block text-xs text-black/45">

                          + {money(item.price)}

                        </span>

                      </button>

                    );

                  })}

                </div>

              ) : (

                <div className="mt-4 rounded-[18px] bg-[#EEE5DB] p-4 text-sm leading-6 text-black/50">

                  Je hebt gekozen voor een Cinewall zonder elektrische haard.

                </div>

              )}

            </section>

            {/* CABINET */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/55 p-4 sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">

                Stap 04

              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">

                TV-meubel

              </h2>

              <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">

                {cabinets.map((item) => {

                  const active = cabinet === item.id;

                  return (

                    <button

                      key={item.id}

                      type="button"

                      onClick={() => setCabinet(item.id)}

                      className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-[20px] border p-4 text-left ${

                        active

                          ? "border-[#C17D49] bg-[#FFF8F0]"

                          : "border-black/[0.08] bg-white"

                      }`}

                    >

                      <div className="min-w-0 flex-1">

                        <p className="break-words text-sm font-medium">

                          {item.name}

                        </p>

                        <p className="mt-1 text-xs text-black/40">

                          {item.price === 0

                            ? "Geen meerprijs"

                            : `+ ${money(item.price)}`}

                        </p>

                      </div>

                      {active && (

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C17D49] text-sm text-white">

                          âœ“

                        </span>

                      )}

                    </button>

                  );

                })}

              </div>

            </section>

            {/* EXTRAS */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/55 p-4 sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">

                Stap 05

              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">

                Extra opties

              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">

                Tik op de hele optie om deze aan of uit te zetten.

              </p>

              <div className="mt-5 space-y-3">

                <ToggleOption

                  title="Hout in de nissen"

                  description={

                    selectedCinewall.shelves === 0

                      ? "Kies eerst een Cinewall met nissen"

                      : "Houten afwerking in de nissen"

                  }

                  price="+ â‚¬300"

                  active={woodInNiches}

                  disabled={selectedCinewall.shelves === 0}

                  onClick={() => setWoodInNiches((value) => !value)}

                />

                <ToggleOption

                  title="Wit schilderwerk"

                  description="Complete witte afwerking"

                  price="+ â‚¬600"

                  active={painting}

                  onClick={() => setPainting((value) => !value)}

                />

                <ToggleOption

                  title="Oude Cinewall verwijderen"

                  description="Inclusief afvoer van het bouwafval"

                  price="+ â‚¬500"

                  active={removeOld}

                  onClick={() => setRemoveOld((value) => !value)}

                />

                <div className="flex w-full min-w-0 items-center justify-between gap-3 rounded-[22px] border border-black/[0.08] bg-white p-4">

                  <div className="min-w-0 flex-1">

                    <p className="break-words text-[15px] font-medium">

                      Extra stroompunten

                    </p>

                    <p className="mt-1 text-xs text-black/45">

                      â‚¬100 per stroompunt

                    </p>

                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">

                    <button

                      type="button"

                      onClick={() =>

                        setExtraPowerPoints((value) => Math.max(0, value - 1))

                      }

                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl"

                    >

                      âˆ’

                    </button>

                    <span className="w-7 text-center font-semibold">

                      {extraPowerPoints}

                    </span>

                    <button

                      type="button"

                      onClick={() =>

                        setExtraPowerPoints((value) => Math.min(10, value + 1))

                      }

                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D1D1B] text-xl text-white"

                    >

                      +

                    </button>

                  </div>

                </div>

              </div>

            </section>

            {/* INCLUDED */}

            <section className="w-full min-w-0 overflow-hidden rounded-[26px] bg-[#E8DED1] p-4 sm:p-6">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#9B6038]">

                Standaard inbegrepen

              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">

                Dit zit al in de prijs.

              </h2>

              <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">

                {includedItems.map((item) => (

                  <div

                    key={item}

                    className="flex min-w-0 items-start gap-3 rounded-[16px] bg-white/55 p-3.5"

                  >

                    <span className="shrink-0 text-[#B97848]">âœ“</span>

                    <span className="min-w-0 break-words text-sm leading-5 text-black/65">

                      {item}

                    </span>

                  </div>

                ))}

              </div>

            </section>

            {/* QUOTE */}

            {quoteOpen && (

              <section

                ref={quoteRef}

                className="w-full min-w-0 scroll-mt-24 overflow-hidden rounded-[28px] bg-[#1D1D1B] p-5 text-white sm:p-7"

              >

                <div className="flex min-w-0 items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-[10px] uppercase tracking-[0.27em] text-[#D8A77F]">

                      Offerte aanvragen

                    </p>

                    <h2 className="mt-3 text-3xl font-light">Bijna klaar.</h2>

                    <p className="mt-3 text-sm leading-6 text-white/50">

                      Vul jouw gegevens en exacte wandmaten in.

                    </p>

                  </div>

                  <button

                    type="button"

                    onClick={() => setQuoteOpen(false)}

                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl"

                  >

                    Ã—

                  </button>

                </div>

                <form onSubmit={sendWhatsApp} className="mt-6 min-w-0">

                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">

                    <label className="min-w-0 text-sm">

                      Naam *

                      <input

                        required

                        value={customer.name}

                        onChange={(e) =>

                          updateCustomer("name", e.target.value)

                        }

                        placeholder="Jouw naam"

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      Telefoonnummer *

                      <input

                        required

                        type="tel"

                        value={customer.phone}

                        onChange={(e) =>

                          updateCustomer("phone", e.target.value)

                        }

                        placeholder="06..."

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      E-mail *

                      <input

                        required

                        type="email"

                        value={customer.email}

                        onChange={(e) =>

                          updateCustomer("email", e.target.value)

                        }

                        placeholder="naam@email.nl"

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      Postcode *

                      <input

                        required

                        value={customer.postcode}

                        onChange={(e) =>

                          updateCustomer("postcode", e.target.value)

                        }

                        placeholder="1234 AB"

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      Plaats *

                      <input

                        required

                        value={customer.city}

                        onChange={(e) =>

                          updateCustomer("city", e.target.value)

                        }

                        placeholder="Amsterdam"

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      Wandbreedte *

                      <input

                        required

                        type="number"

                        min="1"

                        value={customer.wallWidth}

                        onChange={(e) =>

                          updateCustomer("wallWidth", e.target.value)

                        }

                        placeholder="Bijv. 420 cm"

                        className={inputClass}

                      />

                    </label>

                    <label className="min-w-0 text-sm">

                      Wandhoogte *

                      <input

                        required

                        type="number"

                        min="1"

                        value={customer.wallHeight}

                        onChange={(e) =>

                          updateCustomer("wallHeight", e.target.value)

                        }

                        placeholder="Bijv. 260 cm"

                        className={inputClass}

                      />

                    </label>

                  </div>

                  <label className="mt-4 block min-w-0 text-sm">

                    Opmerking

                    <textarea

                      rows={4}

                      value={customer.notes}

                      onChange={(e) =>

                        updateCustomer("notes", e.target.value)

                      }

                      placeholder="Vertel ons eventueel iets over jouw wensen..."

                      className={`${inputClass} resize-none`}

                    />

                  </label>

                  <div className="mt-5 rounded-[20px] border border-white/10 bg-white/[0.05] p-4">

                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">

                      Jouw configuratie

                    </p>

                    <p className="mt-3 break-words font-medium">

                      {selectedCinewall.name} Â· {width} meter

                    </p>

                    <p className="mt-2 text-3xl font-light">{money(total)}</p>

                    <p className="mt-2 text-xs leading-5 text-white/40">

                      Je kunt daarna via WhatsApp ook een foto van jouw wand

                      meesturen.

                    </p>

                  </div>

                  <button

                    type="submit"

                    className="mt-5 w-full rounded-full bg-[#25D366] px-5 py-4 font-semibold text-white"

                  >

                    Verstuur via WhatsApp â†—

                  </button>

                </form>

              </section>

            )}

          </div>

          {/* DESKTOP PRICE */}

          <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:h-fit">

            <div className="rounded-[28px] bg-[#1D1D1B] p-7 text-white">

              <p className="text-[10px] uppercase tracking-[0.27em] text-[#D8A77F]">

                Jouw Cinewall

              </p>

              <p className="mt-6 text-sm text-white/45">

                Geschatte totaalprijs

              </p>

              <p className="mt-2 text-5xl font-light">{money(total)}</p>

              <p className="mt-2 text-xs text-white/35">Inclusief BTW</p>

              <div className="mt-6 border-y border-white/10 py-5 text-sm">

                <div className="flex justify-between gap-4">

                  <span className="text-white/45">{selectedCinewall.name}</span>

                  <span>{money(selectedCinewall.price)}</span>

                </div>

                <div className="mt-3 flex justify-between gap-4">

                  <span className="text-white/45">Breedte</span>

                  <span>{width} meter</span>

                </div>

                {selectedFireplace && (

                  <div className="mt-3 flex justify-between gap-4">

                    <span className="min-w-0 truncate text-white/45">

                      {selectedFireplace.name}

                    </span>

                    <span className="shrink-0">

                      + {money(selectedFireplace.price)}

                    </span>

                  </div>

                )}

              </div>

              <Link

                href={aiUrl}

                className="mt-6 flex w-full items-center justify-between rounded-full bg-[#C17D49] px-5 py-4"

               prefetch={true}>

                Bekijk met AI

                <span>â†’</span>

              </Link>

              <button

                type="button"

                onClick={openQuote}

                className="mt-3 w-full rounded-full border border-white/15 px-5 py-4"

              >

                Offerte aanvragen

              </button>

            </div>

          </aside>

        </div>

      </div>

      {/* MOBILE PRICE BAR */}

      <div

        className="fixed left-3 right-3 z-[80] w-auto max-w-[calc(100vw-24px)] rounded-[23px] border border-black/10 bg-[#F5F1EA]/95 p-2 shadow-[0_15px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:hidden"

        style={{

          bottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",

        }}

      >

        <div className="flex min-w-0 items-center gap-2">

          <div className="min-w-0 flex-1 pl-2">

            <p className="truncate text-[9px] uppercase tracking-[0.15em] text-black/40">

              Geschatte prijs

            </p>

            <p className="truncate text-lg font-semibold">{money(total)}</p>

          </div>

          <Link
  href={aiUrl}
  aria-label="Bekijk met AI"
  className="flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 text-[10px] font-medium whitespace-nowrap"
 prefetch={true}>
  <span aria-hidden="true">&#10022;</span>
  <span>Bekijk met AI</span>
</Link>

          <button

            type="button"

            onClick={openQuote}

            className="h-12 shrink-0 rounded-full bg-[#C17D49] px-5 text-sm font-medium text-white"

          >

            Offerte

          </button>

        </div>

      </div>

    </main>

  );

}



