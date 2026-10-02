"use client";
import { safeProductHtml } from "@/app/lib/product-html";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getWandpaneelBySlug } from "../../DATA/wandpanelen-catalog";

export default function WandpaneelProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const product = getWandpaneelBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    notFound();
  }

  function formatPrice(price: number | null) {
    if (price === null) {
      return "Prijs op aanvraag";
    }

    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  }

  const hasDiscount =
    product.oldPrice !== null &&
    product.price !== null &&
    product.oldPrice > product.price;

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
            href="/wandpanelen"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            ← Terug naar wandpanelen
          </a>
        </div>
      </header>

      {/* PRODUCT */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* IMAGES */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d]">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-600">
                  Geen afbeelding
                </div>
              )}

              {hasDiscount && (
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black">
                  Aanbieding
                </span>
              )}
            </div>

            {/* THUMBNAILS */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-xl border transition ${
                      selectedImage === index
                        ? "border-white"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover bg-[#0d0d0d]"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMATION */}
          <div className="lg:pt-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {product.brand}
            </p>

            <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
              {product.name}
            </h1>

            {product.productType && (
              <p className="mt-4 text-sm text-neutral-500">
                {product.productType}
              </p>
            )}

            {/* PRICE */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-medium">
                {formatPrice(product.price)}
              </span>

              {hasDiscount && (
                <span className="text-lg text-neutral-600 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* AVAILABILITY */}
            <div className="mt-6 flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  product.available
                    ? "bg-green-500"
                    : "bg-neutral-600"
                }`}
              />

              <span className="text-sm text-neutral-400">
                {product.available
                  ? "Beschikbaar"
                  : "Niet op voorraad"}
              </span>
            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <div className="mt-10 border-t border-white/10 pt-8">
                <h2 className="text-xl font-medium">
                  Productomschrijving
                </h2>

                <div
                  className="mt-5 leading-8 text-neutral-400 [&_a]:text-white [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-4 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{
                    __html: safeProductHtml(product.description),
                  }}
                />
              </div>
            )}

            {/* VARIANTS */}
            {product.variants.length > 1 && (
              <div className="mt-10 border-t border-white/10 pt-8">
                <h2 className="text-xl font-medium">
                  Uitvoeringen
                </h2>

                <div className="mt-5 space-y-3">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {variant.title}
                        </p>

                        {variant.sku && (
                          <p className="mt-1 text-xs text-neutral-600">
                            SKU: {variant.sku}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p>
                          {formatPrice(variant.price)}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {variant.available
                            ? "Beschikbaar"
                            : "Uitverkocht"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <a
                href="/cinewall-configurator"
                className="flex w-full items-center justify-center rounded-full bg-white px-7 py-4 font-medium text-black transition hover:bg-neutral-200"
              >
                Combineer met een Cinewall
              </a>

              <a
                href="/#contact"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-4 font-medium transition hover:bg-white hover:text-black"
              >
                Offerte aanvragen
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}