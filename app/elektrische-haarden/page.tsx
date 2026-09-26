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
        [
          product.name,
          product.brand,
          product.productType,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (brand !== "all") {
      products = products.filter(
        (product) => product.brand === brand
      );
    }

    if (sort === "price-low") {
      products.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (sort === "price-high") {
      products.sort(
        (a, b) =>
          (b.price ?? 0) - (a.price ?? 0)
      );
    }

    if (sort === "name") {
      products.sort((a, b) =>
        a.name.localeCompare(b.name, "nl")
      );
    }

    return products;
  }, [search, brand, sort]);

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  function formatPrice(price: number | null) {
    if (price === null) {
      return "Prijs op aanvraag";
    }

    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
            Solutionbouw
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
            Elektrische haarden
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
            Ontdek onze collectie elektrische haarden voor
            Cinewalls en moderne interieurs.
          </p>

          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-7">
            <div>
              <p className="text-2xl font-light">
                {haardenCatalog.length}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Producten
              </p>
            </div>

            <div>
              <p className="text-2xl font-light">
                {haardenBrands.length}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-600">
                Merken
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(24);
                }}
                placeholder="Zoek een haard, merk of model..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30"
              />
            </div>

            <select
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                setVisibleCount(24);
              }}
              className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-sm text-white outline-none"
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
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-sm text-white outline-none"
            >
              <option value="featured">
                Aanbevolen
              </option>

              <option value="price-low">
                Prijs laag - hoog
              </option>

              <option value="price-high">
                Prijs hoog - laag
              </option>

              <option value="name">
                Naam A - Z
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* RESULT COUNT */}
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-10 sm:px-6">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
              Collectie
            </p>

            <h2 className="mt-2 text-2xl font-light">
              Alle haarden
            </h2>
          </div>

          <p className="text-sm text-neutral-500">
            {filteredProducts.length} producten
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => {
                const image = product.images[0];

                const hasDiscount =
                  product.oldPrice !== null &&
                  product.price !== null &&
                  product.oldPrice > product.price;

                return (
                  <article
                    key={product.id}
                    className="group"
                  >
                    {/* PRODUCT IMAGE LINK */}
                    <a
                      href={`/elektrische-haarden/${product.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d]">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain p-3 transition duration-700 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-neutral-700">
                            Geen afbeelding
                          </div>
                        )}

                        {hasDiscount && (
                          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black">
                            Aanbieding
                          </div>
                        )}

                        {!product.available && (
                          <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur">
                            Uitverkocht
                          </div>
                        )}
                      </div>
                    </a>

                    <div className="pt-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        {product.brand}
                      </p>

                      {/* PRODUCT NAME LINK */}
                      <a
                        href={`/elektrische-haarden/${product.slug}`}
                      >
                        <h3 className="mt-2 min-h-[3.5rem] text-lg font-medium leading-7 transition hover:text-neutral-300">
                          {product.name}
                        </h3>
                      </a>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <p className="text-lg font-medium">
                          {formatPrice(product.price)}
                        </p>

                        {hasDiscount && (
                          <p className="text-sm text-neutral-600 line-through">
                            {formatPrice(
                              product.oldPrice
                            )}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                        <span
                          className={`text-xs ${
                            product.available
                              ? "text-neutral-400"
                              : "text-neutral-600"
                          }`}
                        >
                          {product.available
                            ? "Beschikbaar"
                            : "Niet op voorraad"}
                        </span>

                        {/* VIEW PRODUCT */}
                        <a
                          href={`/elektrische-haarden/${product.slug}`}
                          className="text-sm text-neutral-500 transition hover:text-white"
                        >
                          Bekijk →
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* LOAD MORE */}
            {visibleCount <
              filteredProducts.length && (
              <div className="mt-16 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount(
                      (current) => current + 24
                    )
                  }
                  className="rounded-full border border-white/20 px-8 py-4 text-sm transition hover:bg-white hover:text-black"
                >
                  Meer producten laden
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] px-6 text-center">
            <div>
              <h2 className="text-2xl font-light">
                Geen haarden gevonden
              </h2>

              <p className="mt-3 text-sm text-neutral-500">
                Pas je zoekopdracht of filters aan.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-12 lg:p-16">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Cinewall op maat
            </p>

            <h2 className="mt-5 max-w-2xl text-3xl font-light sm:text-4xl">
              Jouw favoriete haard in een complete Cinewall.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-neutral-400">
              Combineer jouw haard met een Cinewall,
              wandpanelen en maatwerkmeubilair.
            </p>

            <a
              href="/cinewall-configurator"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-medium text-black transition hover:bg-neutral-200"
            >
              Stel jouw Cinewall samen
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}