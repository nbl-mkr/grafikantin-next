"use client";

import { type MouseEvent, useEffect, useRef } from "react";

const GLOW_SIZE = 680;
const GLOW_LERP = 0.14;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let running = false;

    const applyTransform = (x: number, y: number) => {
      glow.style.transform = `translate3d(${x - GLOW_SIZE / 2}px, ${y - GLOW_SIZE / 2}px, 0)`;
    };

    const tick = () => {
      currentX += (targetX - currentX) * GLOW_LERP;
      currentY += (targetY - currentY) * GLOW_LERP;
      applyTransform(currentX, currentY);
      if (Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const handleEnter = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      currentX = event.clientX - rect.left;
      currentY = event.clientY - rect.top;
      targetX = currentX;
      targetY = currentY;
      applyTransform(currentX, currentY);
      glow.style.opacity = "1";
    };

    const handleMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      wake();
    };

    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    section.addEventListener("pointerenter", handleEnter);
    section.addEventListener("pointermove", handleMove);
    section.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointerenter", handleEnter);
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const handleScrollToMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("menu-populer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#fafafa]"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 opacity-0 will-change-transform transition-opacity duration-300"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(231, 111, 81, 0.10) 0%, rgba(231, 111, 81, 0.05) 32%, transparent 62%)",
        }}
      />

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