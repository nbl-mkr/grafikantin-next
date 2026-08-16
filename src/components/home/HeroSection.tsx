"use client";

import { type MouseEvent } from "react";

export default function HeroSection() {
  const handleScrollToMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("menu-populer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fafafa]">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-14 text-center md:py-20">
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
          Pesan Menu <span className="italic text-[#e76f51]">Favoritmu.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
          Makan nikmat tanpa antre, khusus siswa SMK Negeri 4 Malang.
        </p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
          <strong className="font-semibold text-neutral-900">Grafikantin</strong>{" "}
          menyediakan berbagai menu pilihan variatif dengan penyajikan cepat. Rasa
          nikmat, suasana nyaman, dan pengalaman pesan makanan yang serba praktis.
        </p>

        <a
          href="#menu-populer"
          onClick={handleScrollToMenu}
          className="group mt-6 inline-flex items-center gap-2.5 rounded-lg bg-linear-to-r from-[#e76f51] to-[#f4a261] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e76f51]/25 transition-all duration-200 hover:scale-[1.04] hover:shadow-[#e76f51]/35 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e76f51] focus-visible:ring-offset-2"
        >
          <span>Pesan Sekarang</span>
        </a>

        <p className="mt-6 text-xs text-neutral-500">
          Pesan sekarang tanpa terhalang waktu.
        </p>
      </div>
    </section>
  );
}