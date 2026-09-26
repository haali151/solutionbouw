"use client";

import { useMemo, useState } from "react";

import {
  wandpanelenCatalog,
} from "../DATA/wandpanelen-catalog";

import {
  hexagonCatalog,
} from "../DATA/hexagon-catalog";

import {
  suedeCatalog,
} from "../DATA/suede-catalog";

import {
  decorCatalog,
} from "../DATA/decor-catalog";

type Category =
  | "all"
  | "wood"
  | "hexagon"
  | "suede"
  | "decor";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

const allWandpanelen = [
  ...wandpanelenCatalog,
  ...hexagonCatalog,
  ...suedeCatalog,
  ...decorCatalog,
];

function getProductCategory(product: any): Category {
  if (
    decorCatalog.some(
      (item) => item.id === product.id
    )
  ) {
    return "decor";
  }

  if (
    suedeCatalog.some(
      (item) => item.id === product.id
    )
  ) {
    return "suede";
  }

  if (
    hexagonCatalog.some(
      (item) => item.id === product.id
    )
  ) {
    return "hexagon";
  }

  return "wood";
}

function getProductUrl(product: any) {
  const category =
    getProductCategory(product);

  if (category === "hexagon") {
    return `/wandpanelen/hexagon/${product.slug}`;
  }

  if (category === "suede") {
    return `/wandpanelen/suede/${product.slug}`;
  }

  if (category === "decor") {
    return `/wandpanelen/decor/${product.slug}`;
  }

  return `/wandpanelen/${product.slug}`;
}

function getCategoryLabel(
  category: Category
) {
  if (category === "wood") {
    return "Houten wandpaneel";
  }

  if (category === "hexagon") {
    return "Hexagon";
  }

  if (category === "suede") {
    return "Suède";
  }

  if (category === "decor") {
    return "Decor";
  }

  return "Wandpaneel";
}

function formatPrice(
  price: number | null
) {
  if (price === null) {
    return "Prijs op aanvraag";
  }

  return new Intl.NumberFormat(
    "nl-NL",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(price);
}

export default function WandpanelenPage() {
  const [category, setCategory] =
    useState<Category>("all");

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState<SortOption>("featured");

  const filteredProducts =
    useMemo(() => {
      let products =
        [...allWandpanelen];

      if (category !== "all") {
        products =
          products.filter(
            (product) =>
              getProductCategory(
                product
              ) === category
          );
      }

      if (search.trim()) {
        const searchValue =
          search
            .trim()
            .toLowerCase();

        products =
          products.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(
                  searchValue
                ) ||
              product.brand
                .toLowerCase()
                .includes(
                  searchValue
                )
          );
      }

      if (sort === "price-low") {
        products.sort(
          (a, b) =>
            (a.price ??
              Number.MAX_SAFE_INTEGER) -
            (b.price ??
              Number.MAX_SAFE_INTEGER)
        );
      }

      if (sort === "price-high") {
        products.sort(
          (a, b) =>
            (b.price ?? 0) -
            (a.price ?? 0)
        );
      }

      if (sort === "name") {
        products.sort((a, b) =>
          a.name.localeCompare(
            b.name,
            "nl"
          )
        );
      }

      return products;
    }, [
      category,
      search,
      sort,
    ]);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">

          <a
            href="/"
            className="text-sm font-medium uppercase tracking-[0.25em]"
          >
            Solutionbouw
          </a>

          <a
            href="/"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            ← Home
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">

          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Solutionbouw collectie
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            Wandpanelen voor een
            compleet interieur
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            Ontdek houten,
            Hexagon, Suède en
            Decor wandpanelen voor
            woonkamers, slaapkamers,
            kantoren en Cinewalls.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-400">
              {allWandpanelen.length} producten
            </span>

            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-400">
              4 collecties
            </span>

          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">

        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            Collecties
          </p>

          <h2 className="mt-3 text-2xl font-medium">
            Kies jouw stijl
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* WOOD */}
          <button
            type="button"
            onClick={() =>
              setCategory("wood")
            }
            className={`overflow-hidden rounded-3xl border text-left transition ${
              category === "wood"
                ? "border-white bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/30"
            }`}
          >

            <div className="aspect-[4/3] overflow-hidden bg-neutral-900">

              {wandpanelenCatalog[0]
                ?.images[0] && (
                <img
                  src={
                    wandpanelenCatalog[0]
                      .images[0]
                  }
                  alt="Houten wandpanelen"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              )}

            </div>

            <div className="p-5">

              <p className="text-lg font-medium">
                Houten wandpanelen
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Bekijk{" "}
                {
                  wandpanelenCatalog.length
                }{" "}
                producten
              </p>

            </div>
          </button>

          {/* HEXAGON */}
          <button
            type="button"
            onClick={() =>
              setCategory("hexagon")
            }
            className={`overflow-hidden rounded-3xl border text-left transition ${
              category === "hexagon"
                ? "border-white bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/30"
            }`}
          >

            <div className="aspect-[4/3] overflow-hidden bg-neutral-900">

              {hexagonCatalog[0]
                ?.images[0] && (
                <img
                  src={
                    hexagonCatalog[0]
                      .images[0]
                  }
                  alt="Hexagon wandpanelen"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              )}

            </div>

            <div className="p-5">

              <p className="text-lg font-medium">
                Hexagon wandpanelen
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Bekijk{" "}
                {
                  hexagonCatalog.length
                }{" "}
                producten
              </p>

            </div>
          </button>

          {/* SUEDE */}
          <button
            type="button"
            onClick={() =>
              setCategory("suede")
            }
            className={`overflow-hidden rounded-3xl border text-left transition ${
              category === "suede"
                ? "border-white bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/30"
            }`}
          >

            <div className="aspect-[4/3] overflow-hidden bg-neutral-900">

              {suedeCatalog[0]
                ?.images[0] && (
                <img
                  src={
                    suedeCatalog[0]
                      .images[0]
                  }
                  alt="Suède wandpanelen"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              )}

            </div>

            <div className="p-5">

              <p className="text-lg font-medium">
                Suède wandpanelen
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Bekijk{" "}
                {
                  suedeCatalog.length
                }{" "}
                producten
              </p>

            </div>
          </button>

          {/* DECOR */}
          <button
            type="button"
            onClick={() =>
              setCategory("decor")
            }
            className={`overflow-hidden rounded-3xl border text-left transition ${
              category === "decor"
                ? "border-white bg-white/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/30"
            }`}
          >

            <div className="aspect-[4/3] overflow-hidden bg-neutral-900">

              {decorCatalog[0]
                ?.images[0] && (
                <img
                  src={
                    decorCatalog[0]
                      .images[0]
                  }
                  alt="Decor wandpanelen"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              )}

            </div>

            <div className="p-5">

              <p className="text-lg font-medium">
                Decor wandpanelen
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Bekijk{" "}
                {decorCatalog.length}{" "}
                producten
              </p>

            </div>
          </button>

        </div>
      </section>

      {/* FILTERS */}
      <section className="border-y border-white/10">

        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-2">

              {[
                {
                  key: "all",
                  label: "Alles",
                },
                {
                  key: "wood",
                  label: "Hout",
                },
                {
                  key: "hexagon",
                  label: "Hexagon",
                },
                {
                  key: "suede",
                  label: "Suède",
                },
                {
                  key: "decor",
                  label: "Decor",
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    setCategory(
                      item.key as Category
                    )
                  }
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    category ===
                    item.key
                      ? "bg-white text-black"
                      : "border border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Zoek wandpanelen..."
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/40"
              />

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target
                      .value as SortOption
                  )
                }
                className="rounded-full border border-white/10 bg-black px-5 py-3 text-sm text-white outline-none"
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
                  Naam A-Z
                </option>

              </select>

            </div>
          </div>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">

        <div className="mb-8 flex items-end justify-between gap-5">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Wandpanelen
            </p>

            <h2 className="mt-2 text-2xl font-medium">
              {filteredProducts.length}{" "}
              producten
            </h2>
          </div>

          {category !== "all" && (
            <button
              type="button"
              onClick={() =>
                setCategory("all")
              }
              className="text-sm text-neutral-400 transition hover:text-white"
            >
              Toon alles
            </button>
          )}

        </div>

        {filteredProducts.length ===
        0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center">

            <p className="text-xl">
              Geen producten gevonden
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Probeer een andere
              zoekterm of categorie.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map(
              (product) => {
                const productUrl =
                  getProductUrl(
                    product
                  );

                const productCategory =
                  getProductCategory(
                    product
                  );

                const hasDiscount =
                  product.oldPrice !==
                    null &&
                  product.price !==
                    null &&
                  product.oldPrice >
                    product.price;

                return (
                  <article
                    key={`${productCategory}-${product.id}`}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
                  >

                    <a
                      href={
                        productUrl
                      }
                      className="relative block aspect-[4/5] overflow-hidden bg-[#0d0d0d]"
                    >

                      {product
                        .images[0] ? (
                        <img
                          src={
                            product
                              .images[0]
                          }
                          alt={
                            product.name
                          }
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-neutral-600">
                          Geen afbeelding
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] backdrop-blur-md">
                        {getCategoryLabel(
                          productCategory
                        )}
                      </span>

                      {hasDiscount && (
                        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-black">
                          Aanbieding
                        </span>
                      )}

                    </a>

                    <div className="p-4 sm:p-5">

                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 sm:text-xs">
                        {product.brand}
                      </p>

                      <a
                        href={
                          productUrl
                        }
                        className="mt-2 block"
                      >
                        <h3 className="line-clamp-2 text-sm font-medium leading-5 transition group-hover:text-neutral-300 sm:text-base sm:leading-6">
                          {product.name}
                        </h3>
                      </a>

                      <div className="mt-4 flex flex-wrap items-center gap-2">

                        <span className="font-medium">
                          {formatPrice(
                            product.price
                          )}
                        </span>

                        {hasDiscount && (
                          <span className="text-xs text-neutral-600 line-through">
                            {formatPrice(
                              product.oldPrice
                            )}
                          </span>
                        )}

                      </div>

                      <a
                        href={
                          productUrl
                        }
                        className="mt-5 inline-flex items-center text-sm text-neutral-400 transition hover:text-white"
                      >
                        Bekijk product →
                      </a>

                    </div>

                  </article>
                );
              }
            )}

          </div>
        )}

      </section>

      {/* CTA */}
      <section className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 text-center sm:px-10">

            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Solutionbouw
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light sm:text-4xl">
              Combineer wandpanelen
              met jouw Cinewall
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-neutral-400">
              Stel een Cinewall samen
              en combineer verschillende
              materialen en wandpanelen
              in één ontwerp.
            </p>

            <a
              href="/cinewall-configurator"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-medium text-black transition hover:bg-neutral-200"
            >
              Cinewall samenstellen
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}