"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getHaardBySlug } from "../../DATA/haarden-catalog";

export default function HaardProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getHaardBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) notFound();

  const formatPrice = (price: number | null) =>
    price === null
      ? "Prijs op aanvraag"
      : new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(price);

  const hasDiscount =
    product.oldPrice !== null &&
    product.price !== null &&
    product.oldPrice > product.price;

  const whatsappText = encodeURIComponent(
    `Hallo Wallmade, ik heb interesse in ${product.name}. Kunnen jullie mij meer informatie en een offerte sturen?`
  );

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#171714]">
      <header className="border-b border-black/10 bg-[#f3f0e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="text-lg font-semibold tracking-[0.22em]">
            WALLMADE
          </a>
          <a
            href="/elektrische-haarden"
            className="rounded-full border border-black/15 px-4 py-2 text-sm transition hover:bg-black hover:text-white"
          >
            ← Alle haarden
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8 sm:py-10 lg:py-14">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-black/45">
          <a href="/" className="hover:text-black">Home</a>
          <span>/</span>
          <a href="/elektrische-haarden" className="hover:text-black">Haarden</a>
          <span>/</span>
          <span className="max-w-[220px] truncate text-black/70">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(0,0,0,.07)]">
              <div className="aspect-[1/1] sm:aspect-[1.08/1]">
                {product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-contain p-4 sm:p-8"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-black/35">
                    Geen afbeelding
                  </div>
                )}
              </div>

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {hasDiscount && (
                  <span className="rounded-full bg-[#171714] px-4 py-2 text-[11px] font-semibold uppercase tracking-[.14em] text-white">
                    Aanbieding
                  </span>
                )}
                <span className="rounded-full bg-white/90 px-4 py-2 text-[11px] font-medium shadow-sm backdrop-blur">
                  Elektrische haard
                </span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-white transition ${
                      selectedImage === index
                        ? "ring-2 ring-black ring-offset-2 ring-offset-[#f3f0e9]"
                        : "opacity-65 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[28px] bg-[#1b1b18] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,.12)] sm:p-9">
              <p className="text-[11px] font-medium uppercase tracking-[.28em] text-white/45">
                {product.brand}
              </p>

              <h1 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-.035em] sm:text-[46px]">
                {product.name}
              </h1>

              {product.productType && (
                <p className="mt-4 text-sm text-white/50">{product.productType}</p>
              )}

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2 border-y border-white/10 py-6">
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="pb-1 text-base text-white/35 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    product.available ? "bg-emerald-400" : "bg-white/30"
                  }`}
                />
                <span className="text-sm text-white/65">
                  {product.available ? "Beschikbaar" : "Niet op voorraad"}
                </span>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {[
                  ["✓", "Premium", "afwerking"],
                  ["⌂", "Perfect voor", "Cinewalls"],
                  ["✦", "Persoonlijk", "advies"],
                ].map(([icon, a, b]) => (
                  <div key={a} className="rounded-2xl bg-white/[.055] p-3">
                    <div className="text-lg">{icon}</div>
                    <div className="mt-3 text-[11px] font-medium">{a}</div>
                    <div className="text-[10px] text-white/40">{b}</div>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/31643583800?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex w-full items-center justify-center rounded-full bg-[#eee8dc] px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                Vraag advies via WhatsApp
              </a>

              <a
                href="/cinewall-configurator"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-medium transition hover:bg-white hover:text-black"
              >
                Combineer met een Cinewall
              </a>

              <p className="mt-4 text-center text-[11px] leading-5 text-white/35">
                Hulp nodig met maat, model of plaatsing? Wij denken met je mee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {product.description && (
        <section className="mx-auto max-w-[1440px] px-4 pb-6 sm:px-8 sm:pb-12">
          <div className="grid gap-6 rounded-[30px] bg-white p-6 sm:p-10 lg:grid-cols-[.38fr_.62fr] lg:p-14">
            <div>
              <p className="text-[11px] uppercase tracking-[.25em] text-black/40">
                Details
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-.03em]">
                Over deze haard
              </h2>
            </div>
            <div
              className="max-w-3xl text-[15px] leading-8 text-black/60 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-black"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      )}

      {product.variants.length > 1 && (
        <section className="mx-auto max-w-[1440px] px-4 pb-6 sm:px-8 sm:pb-12">
          <div className="rounded-[30px] bg-[#ded8cc] p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[.25em] text-black/40">
                  Keuze
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-.03em]">
                  Beschikbare uitvoeringen
                </h2>
              </div>
              <p className="text-sm text-black/50">
                Kies de uitvoering die bij jouw project past.
              </p>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex items-center justify-between gap-5 rounded-[20px] bg-white/70 p-5 backdrop-blur"
                >
                  <div>
                    <p className="font-semibold">{variant.title}</p>
                    {variant.sku && (
                      <p className="mt-1 text-xs text-black/35">SKU: {variant.sku}</p>
                    )}
                    <p className="mt-2 text-xs text-black/50">
                      {variant.available ? "● Beschikbaar" : "○ Uitverkocht"}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold">{formatPrice(variant.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-4 pb-28 sm:px-8">
        <div className="overflow-hidden rounded-[30px] bg-[#b9a990] p-7 sm:p-12 lg:p-16">
          <p className="text-[11px] uppercase tracking-[.25em] text-black/50">
            WALLMADE CINEWALL
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-.035em] sm:text-5xl">
            Maak van deze haard het hart van jouw interieur.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            Combineer de haard met een Cinewall, wandpanelen, verlichting en maatwerk.
            Stel jouw ontwerp samen en ontdek wat bij jouw ruimte past.
          </p>
          <a
            href="/cinewall-configurator"
            className="mt-7 inline-flex rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Ontwerp jouw Cinewall →
          </a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f3f0e9]/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href={`https://wa.me/31643583800?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center rounded-full bg-black px-4 py-3.5 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
          <a
            href="/cinewall-configurator"
            className="flex flex-1 items-center justify-center rounded-full border border-black/15 px-4 py-3.5 text-center text-sm font-semibold"
          >
            Cinewall ontwerpen
          </a>
        </div>
      </div>
    </main>
  );
}
