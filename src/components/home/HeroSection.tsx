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
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight sm:leading-none">
          Pesan Menu <span className="text-[#e76f51]">Favoritmu</span> Tanpa Antre.
        </h1>

        <p className="mt-8 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-normal">
          Nikmati santapan kantin dengan penyajian cepat, rasa terjamin, dan pengalaman pemesanan yang serba praktis langsung dari perangkatmu.
        </p>

        <a
            href="/order"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#e76f51] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#d55f43] shadow-sm"
        >
          Pesan Sekarang
        </a>

        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-16 text-center">
          <div>
            <p className="text-2xl font-black text-slate-900">15m</p>
            <p className="text-xs font-medium text-slate-500">Estimasi Penyajian</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">10+</p>
            <p className="text-xs font-medium text-slate-500">Stand Kantin</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="text-xs font-medium text-slate-500">Higienis & Segar</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">4.8/5</p>
            <p className="text-xs font-medium text-slate-500">Rating Siswa</p>
          </div>
        </div>
      </div>
    </section>
  );
}