"use client";

import { useState } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hallo Wallmade, ik heb jullie website bekeken en heb interesse in jullie diensten. Ik ontvang graag meer informatie."
  );

  const emailSubject = encodeURIComponent("Aanvraag via Wallmade");

  const emailBody = encodeURIComponent(
    "Hallo Wallmade,\n\nIk heb jullie website bekeken en heb interesse in jullie diensten.\n\nIk ontvang graag meer informatie.\n\nMet vriendelijke groet,"
  );

  return (
    <div className="fixed bottom-[135px] right-5 z-[9999] flex flex-col items-end md:bottom-8 md:right-8">

      {/* CONTACT OPTIONS */}
      <div
        className={`mb-3 flex flex-col items-end gap-2 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* WHATSAPP */}
        <a
          href={`https://wa.me/31643583800?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full border border-white/10 bg-[#111]/95 py-2 pl-5 pr-2 text-white shadow-2xl backdrop-blur-xl transition hover:scale-105"
        >
          <span className="text-sm font-medium">WhatsApp</span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-white"
              aria-hidden="true"
            >
              <path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.78L2 22l5.38-1.5A9.93 9.93 0 1 0 12.04 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-3.19.89.85-3.11-.2-.32a8.06 8.06 0 1 1 6.96 3.85Zm4.43-6.03c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </span>
        </a>

        {/* INSTAGRAM */}
        <a
          href="https://www.instagram.com/solutionbouw.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full border border-white/10 bg-[#111]/95 py-2 pl-5 pr-2 text-white shadow-2xl backdrop-blur-xl transition hover:scale-105"
        >
          <span className="text-sm font-medium">Instagram</span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </span>
        </a>

        {/* EMAIL */}
        <a
          href={`mailto:solutionbouw.official@gmail.com?subject=${emailSubject}&body=${emailBody}`}
          className="flex items-center gap-3 rounded-full border border-white/10 bg-[#111]/95 py-2 pl-5 pr-2 text-white shadow-2xl backdrop-blur-xl transition hover:scale-105"
        >
          <span className="text-sm font-medium">E-mail</span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
        </a>
      </div>

      {/* MAIN BUTTON + PULSE */}
      <div className="relative flex h-16 w-16 items-center justify-center">

        {!open && (
          <span className="absolute h-16 w-16 animate-ping rounded-full bg-white/20" />
        )}

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Contact sluiten" : "Contact opnemen"}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition duration-300 hover:scale-105"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}