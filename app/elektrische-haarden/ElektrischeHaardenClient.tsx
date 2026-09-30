"use client";

import { useMemo, useState } from "react";
import {
  haardenCatalog,
  haardenBrands,
} from "../DATA/haarden-catalog";

export default function ElektrischeHaardenPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredProducts = useMemo(() => {
    let products = [...haardenCatalog];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      products = products.filter((product) =>
        [product.name, product.brand, product.productType]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (brand !== "all") {
      products = products.filter((product) => product.brand === brand);
    }

    if (sort === "price-low") {
      products.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (sort === "price-high") {
      products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    if (sort === "name") {
      products.sort((a, b) => a.name.localeCompare(b.name, "nl"));
    }

    return products;
  }, [search, brand, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const heroImage =
    haardenCatalog.find((product) => product.images?.[0])?.images?.[0] ?? null;

  const formatPrice = (price: number | null) =>
    price === null
      ? "Prijs op aanvraag"
      : new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(price);

  return (
    <main className="min-h-screen bg-[#f3f0e9] text-[#171714]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f0e9]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-8">
          <a href="/" className="text-base font-semibold tracking-[0.22em]">
            WALLMADE
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/cinewall-configurator"
              className="hidden rounded-full border border-black/15 px-4 py-2 text-xs font-medium transition hover:bg-black hover:text-white sm:inline-flex"
            >
              Cinewall ontwerpen
            </a>
            <a
              href="/"
              className="rounded-full bg-black px-4 py-2 text-xs font-medium !text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Home
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-8 sm:pt-8">
        <div className="relative overflow-hidden rounded-[30px] bg-[#1b1b18] text-white">
          <div className="grid min-h-[430px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
                  WALLMADE COLLECTION
                </p>

                <h1 className="mt-5 max-w-xl text-[45px] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Elektrische haarden voor moderne interieurs.
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                  Ontdek haarden voor Cinewalls, maatwerk en strakke woonruimtes.
                  Vergelijk modellen, merken en prijzen in één collectie.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-medium">{haardenCatalog.length}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Producten
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-medium">{haardenBrands.length}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Merken
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-medium">100%</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Elektrisch
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[310px] overflow-hidden bg-[#11110f] lg:min-h-full">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Elektrische haard"
                  className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10"
                />
              ) : null}

              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#11110f] to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
                Voor Cinewalls & maatwerk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-8 sm:pt-8">
        <div className="rounded-[24px] border border-black/10 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,.04)] sm:p-4">
          <div className="grid gap-2 lg:grid-cols-[1fr_240px_240px]">
            <label className="relative block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(24);
                }}
                placeholder="Zoek een haard, merk of model..."
                className="w-full rounded-2xl bg-[#f5f2ec] py-4 pl-11 pr-4 text-sm outline-none ring-1 ring-transparent transition placeholder:text-black/35 focus:ring-black/15"
              />
            </label>

            <select
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                setVisibleCount(24);
              }}
              className="w-full rounded-2xl bg-[#f5f2ec] px-4 py-4 text-sm outline-none"
            >
              <option value="all">Alle merken</option>
              {haardenBrands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-2xl bg-[#f5f2ec] px-4 py-4 text-sm outline-none"
            >
              <option value="featured">Aanbevolen</option>
              <option value="price-low">Prijs laag - hoog</option>
              <option value="price-high">Prijs hoog - laag</option>
              <option value="name">Naam A - Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* RESULT HEADING */}
      <section className="mx-auto max-w-[1440px] px-4 pb-4 pt-10 sm:px-8 sm:pb-6 sm:pt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/35">
              Collectie
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
              Alle haarden
            </h2>
          </div>

          <div className="rounded-full bg-[#ded8cc] px-4 py-2 text-xs text-black/60">
            {filteredProducts.length} producten
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8 sm:pb-28">
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => {
                const image = product.images[0];
                const hasDiscount =
                  product.oldPrice !== null &&
                  product.price !== null &&
                  product.oldPrice > product.price;

                return (
                  <article key={product.id} className="group min-w-0">
                    <a
                      href={`/elektrische-haarden/${product.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-white sm:rounded-[26px]">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain p-2.5 transition duration-500 group-hover:scale-[1.025] sm:p-4"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-black/30">
                            Geen afbeelding
                          </div>
                        )}

                        <div className="absolute left-2 top-2 flex flex-col gap-1.5 sm:left-3 sm:top-3">
                          {hasDiscount && (
                            <span className="w-fit rounded-full bg-black px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white sm:px-3"
                              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                              Aanbieding
                            </span>
                          )}
                        </div>

                        {!product.available && (
                          <div className="absolute inset-x-2 bottom-2 rounded-full bg-black/80 px-3 py-2 text-center text-[9px] font-medium text-white backdrop-blur"
                            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>
                            Niet op voorraad
                          </div>
                        )}
                      </div>
                    </a>

                    <div className="pt-3 sm:pt-4">
                      <p className="truncate text-[9px] font-medium uppercase tracking-[0.18em] text-black/35 sm:text-[10px]">
                        {product.brand}
                      </p>

                      <a href={`/elektrische-haarden/${product.slug}`}>
                        <h3
                          className="mt-1.5 min-h-[2.7rem] text-[14px] font-medium leading-[1.35] tracking-[-0.015em] sm:min-h-[3.2rem] sm:text-base"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.name}
                        </h3>
                      </a>

                      <div className="mt-2.5 flex flex-col gap-0.5 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                        <span className="text-[15px] font-semibold sm:text-base">
                          {formatPrice(product.price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] text-black/30 line-through sm:text-xs">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-black/45 sm:text-xs">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.available ? "bg-emerald-500" : "bg-black/20"
                            }`}
                          />
                          {product.available ? "Beschikbaar" : "Uitverkocht"}
                        </span>

                        <a
                          href={`/elektrische-haarden/${product.slug}`}
                          className="text-[11px] font-semibold sm:text-xs"
                        >
                          Bekijk →
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="mt-14 flex justify-center sm:mt-20">
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + 24)}
                  className="rounded-full bg-black px-7 py-4 text-sm font-semibold !text-white transition hover:scale-[1.02]"
                  style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                >
                  Meer producten laden
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[28px] bg-white px-6 py-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/35">
              Geen resultaat
            </p>
            <h2 className="mt-3 text-2xl font-medium">Geen haarden gevonden</h2>
            <p className="mt-3 text-sm text-black/45">
              Pas je zoekopdracht of filters aan.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-4 pb-28 sm:px-8">
        <div className="overflow-hidden rounded-[30px] bg-[#b9a990] p-7 sm:p-12 lg:p-16">
          <p className="text-[10px] uppercase tracking-[0.28em] text-black/50">
            WALLMADE CINEWALL
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
            Gevonden wat je zoekt? Bouw de haard direct in jouw Cinewall.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
            Combineer jouw favoriete haard met wandpanelen, verlichting,
            maatwerk en een complete Cinewall.
          </p>
          <a
            href="/cinewall-configurator"
            className="mt-7 inline-flex rounded-full bg-black px-7 py-4 text-sm font-semibold !text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            Ontwerp jouw Cinewall →
          </a>
        </div>
      </section>

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f3f0e9]/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href="/cinewall-configurator"
            className="flex flex-1 items-center justify-center rounded-full bg-black px-4 py-3.5 text-center text-sm font-semibold !text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            Cinewall ontwerpen
          </a>
          <a
            href="https://wa.me/31643583800"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full border border-black/15 px-5 py-3.5 text-sm font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
