"use client";

import { useMemo, useState } from "react";
import { wandpanelenCatalog } from "../DATA/wandpanelen-catalog";
import { hexagonCatalog } from "../DATA/hexagon-catalog";
import { suedeCatalog } from "../DATA/suede-catalog";
import { decorCatalog } from "../DATA/decor-catalog";

type Category = "all" | "wood" | "hexagon" | "suede" | "decor";
type SortOption = "featured" | "price-low" | "price-high" | "name";

const allProducts = [
  ...wandpanelenCatalog,
  ...hexagonCatalog,
  ...suedeCatalog,
  ...decorCatalog,
];

function getCategory(product: any): Category {
  if (decorCatalog.some((item) => item.id === product.id)) return "decor";
  if (suedeCatalog.some((item) => item.id === product.id)) return "suede";
  if (hexagonCatalog.some((item) => item.id === product.id)) return "hexagon";
  return "wood";
}

function productUrl(product: any) {
  const category = getCategory(product);
  if (category === "hexagon") return `/wandpanelen/hexagon/${product.slug}`;
  if (category === "suede") return `/wandpanelen/suede/${product.slug}`;
  if (category === "decor") return `/wandpanelen/decor/${product.slug}`;
  return `/wandpanelen/${product.slug}`;
}

function categoryLabel(category: Category) {
  if (category === "wood") return "Hout";
  if (category === "hexagon") return "Hexagon";
  if (category === "suede") return "Suède";
  if (category === "decor") return "Decor";
  return "Alles";
}

function formatPrice(price: number | null) {
  if (price === null) return "Prijs op aanvraag";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function displayName(name: string) {
  return name
    .replace(/akoestische wandpanelen?\s*[-–]\s*/i, "")
    .replace(/akoestisch wandpaneel\s*[-–]\s*/i, "")
    .replace(/wandpanelen?\s*[-–]\s*/i, "")
    .replace(/\s*[-–]\s*280\s*x\s*60\s*cm/gi, "")
    .replace(/\s*[-–]\s*300\s*x\s*60\s*cm/gi, "")
    .replace(/\s*[-–]\s*260\s*x\s*60\s*cm/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function bestImage(product: any) {
  return product.images?.[1] || product.images?.[0] || null;
}

const collections = [
  {
    key: "wood" as Category,
    title: "Hout",
    sub: "Akoestische latten",
    image: wandpanelenCatalog[0]?.images?.[1] || wandpanelenCatalog[0]?.images?.[0],
  },
  {
    key: "hexagon" as Category,
    title: "Hexagon",
    sub: "Grafische panelen",
    image: hexagonCatalog[0]?.images?.[1] || hexagonCatalog[0]?.images?.[0],
  },
  {
    key: "suede" as Category,
    title: "Suède",
    sub: "Zachte texturen",
    image: suedeCatalog[0]?.images?.[1] || suedeCatalog[0]?.images?.[0],
  },
  {
    key: "decor" as Category,
    title: "Decor",
    sub: "Statement walls",
    image: decorCatalog[0]?.images?.[1] || decorCatalog[0]?.images?.[0],
  },
];

export default function WandpanelenPage() {
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [visible, setVisible] = useState(12);

  const products = useMemo(() => {
    let list = [...allProducts];

    if (category !== "all") {
      list = list.filter((product) => getCategory(product) === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((product) =>
        `${product.name} ${product.brand}`.toLowerCase().includes(q)
      );
    }

    if (sort === "price-low") {
      list.sort(
        (a, b) =>
          (a.price ?? Number.MAX_SAFE_INTEGER) -
          (b.price ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (sort === "price-high") {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name, "nl"));
    }

    return list;
  }, [category, search, sort]);

  function selectCategory(value: Category) {
    setCategory(value);
    setVisible(12);
  }

  return (
    <main className="min-h-screen bg-[#f3efe8] text-[#181714]">
      {/* TOP */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3efe8]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="/" className="text-base font-semibold tracking-[0.22em]">
            WALLMADE
          </a>

          <a
            href="/"
            className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium"
          >
            Home
          </a>
        </div>
      </header>

      {/* COLLECTIONS 2x2 ON MOBILE */}
      <section className="px-5 pb-8 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pb-12 lg:pt-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {collections.map((item) => (
              <button
                type="button"
                key={item.key}
                onClick={() => selectCategory(item.key)}
                className={`group relative aspect-[1.1/1] overflow-hidden rounded-[22px] text-left ${
                  category === item.key
                    ? "ring-2 ring-[#9f704f] ring-offset-2 ring-offset-[#f3efe8]"
                    : ""
                }`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="h-full w-full bg-[#d7cec2]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                    {item.sub}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <h2 className="text-xl font-light sm:text-2xl">{item.title}</h2>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(["all", "wood", "hexagon", "suede", "decor"] as Category[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectCategory(item)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium ${
                    category === item
                      ? "bg-[#181714] !text-white"
                      : "border border-black/10 bg-white/55 text-black/55"
                  }`}
                  style={
                    category === item
                      ? { color: "#fff", WebkitTextFillColor: "#fff" }
                      : undefined
                  }
                >
                  {categoryLabel(item)}
                </button>
              )
            )}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_220px]">
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
              placeholder="Zoek kleur, materiaal of model..."
              className="rounded-2xl border border-black/10 bg-white/60 px-5 py-4 text-sm outline-none placeholder:text-black/35 focus:border-black/25"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-2xl border border-black/10 bg-white/60 px-5 py-4 text-sm outline-none"
            >
              <option value="featured">Aanbevolen</option>
              <option value="price-low">Prijs laag - hoog</option>
              <option value="price-high">Prijs hoog - laag</option>
              <option value="name">Naam A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9c6a47]">
                {category === "all" ? "Collectie" : categoryLabel(category)}
              </p>
              <h2 className="mt-2 text-3xl font-light tracking-[-0.035em]">
                {products.length} producten
              </h2>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-[28px] bg-white/65 px-6 py-20 text-center">
              <h3 className="text-2xl font-light">Geen producten gevonden</h3>
              <p className="mt-2 text-sm text-black/45">
                Probeer een andere zoekterm of collectie.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
                {products.slice(0, visible).map((product) => {
                  const category = getCategory(product);
                  const image = bestImage(product);
                  const hasDiscount =
                    product.oldPrice !== null &&
                    product.price !== null &&
                    product.oldPrice > product.price;

                  return (
                    <a
                      key={`${category}-${product.id}`}
                      href={productUrl(product)}
                      className="group block min-w-0"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[22px] bg-[#ded7ce]">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-black/25">
                            Geen afbeelding
                          </div>
                        )}

                        <span
                          className="absolute left-2 top-2 rounded-full bg-black/65 px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] !text-white backdrop-blur"
                          style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
                        >
                          {categoryLabel(category)}
                        </span>

                        {hasDiscount && (
                          <span className="absolute right-2 top-2 rounded-full bg-[#f3efe8] px-2.5 py-1.5 text-[8px] font-semibold">
                            Sale
                          </span>
                        )}
                      </div>

                      <div className="pt-3">
                        <h3
                          className="min-h-[2.6rem] text-[14px] font-medium leading-[1.35] tracking-[-0.015em] sm:text-base"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {displayName(product.name)}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="text-[15px] font-semibold">
                            {formatPrice(product.price)}
                          </span>

                          {hasDiscount && (
                            <span className="text-[11px] text-black/30 line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {visible < products.length && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisible((count) => count + 12)}
                    className="rounded-full bg-[#181714] px-7 py-4 text-sm font-semibold !text-white"
                    style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
                  >
                    Meer bekijken
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* SIMPLE CTA */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px] rounded-[30px] bg-[#b9a990] p-7 sm:p-12 lg:p-14">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/45">
            Combineer materialen
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-light tracking-[-0.04em] sm:text-5xl">
            Bekijk hoe wandpanelen samenkomen met een Cinewall.
          </h2>
          <a
            href="/cinewalls"
            className="mt-7 inline-flex rounded-full bg-[#181714] px-7 py-4 text-sm font-semibold !text-white"
            style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
          >
            Bekijk Cinewalls →
          </a>
        </div>
      </section>

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#F3EEE7]/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href="/cinewalls"
            className="flex flex-1 items-center justify-center rounded-full bg-[#181714] px-4 py-3.5 text-center text-sm font-semibold !text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            Cinewalls bekijken
          </a>

          <a
            href="https://wa.me/31643583800"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full border border-black/15 bg-[#F3EEE7] px-5 py-3.5 text-sm font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
