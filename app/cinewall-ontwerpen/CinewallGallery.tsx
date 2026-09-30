"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const designNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23,
  24, 25, 26, 27,
];

const designs = designNumbers.map((number) => ({
  id: number,
  image: `/cinewall-designs/cinewall-design-${String(number).padStart(
    2,
    "0",
  )}.jpg`,
  alt: `Modern cinewall ontwerp ${number}`,
}));

export default function CinewallGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = () => setSelectedIndex(null);

  const previous = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? designs.length - 1 : selectedIndex - 1,
    );
  };

  const next = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === designs.length - 1 ? 0 : selectedIndex + 1,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      {/* GALLERY */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {designs.map((design, index) => (
          <button
            key={design.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-black/5"
            aria-label={`Open ${design.alt}`}
          >
            <Image
              src={design.image}
              alt={design.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

            <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-black opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
              ↗
            </div>
          </button>
        ))}
      </div>

      {/* FULL SCREEN VIEW */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-3 md:p-8"
          onClick={close}
        >
          {/* CLOSE */}
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg md:right-7 md:top-7"
            aria-label="Sluiten"
          >
            ×
          </button>

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
            className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-black shadow-lg md:left-7"
            aria-label="Vorige afbeelding"
          >
            ‹
          </button>

          {/* IMAGE */}
          <div
            className="relative h-[88vh] w-[92vw] max-w-7xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={designs[selectedIndex].image}
              alt={designs[selectedIndex].alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-black shadow-lg md:right-7"
            aria-label="Volgende afbeelding"
          >
            ›
          </button>

          {/* COUNTER */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            {selectedIndex + 1} / {designs.length}
          </div>
        </div>
      )}
    </>
  );
}
