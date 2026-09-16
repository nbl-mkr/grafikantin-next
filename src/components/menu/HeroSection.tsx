"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export interface StandInfo {
  nama_stand: string;
  deskripsi?: string;
}

interface HeroSectionProps {
  stand?: StandInfo;
}

export default function HeroSection({ stand }: HeroSectionProps) {
  const t = useTranslations("menu");
  const defaultStand: StandInfo = {
    nama_stand: t("defaultStandName"),
    deskripsi: t("defaultStandDescription"),
  };
  
  const activeStand = stand || defaultStand;

  return (
    <section className="relative w-full bg-[#fafafa] py-12 md:py-16 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="w-full text-left md:w-8/12">
          <nav className="mb-3 text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/order" className="text-[#e76f51] hover:underline font-medium">
                  {t("breadcrumbStand")}
                </Link>
              </li>
              <li><span className="text-gray-600">/</span></li>
              <li className="text-gray-600 font-medium" aria-current="page">
                {activeStand.nama_stand}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {activeStand.nama_stand} - <span className="italic text-[#e76f51]">{t("menuChoice")}</span>
          </h1>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xl">
            {activeStand.deskripsi}
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#food-section"
              className="inline-flex items-center justify-center rounded-lg bg-[#e76f51] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#d55f43] shadow-sm"
            >
              {t("foodAnchor")}
            </a>
            <a
              href="#snack-section"
              className="inline-flex items-center justify-center rounded-lg bg-[#e76f51] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#d55f43] shadow-sm"
            >
              {t("snackAnchor")}
            </a>
          </div>
        </div>

        <div className="w-full text-left md:w-auto md:text-right">
          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e76f51] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d55f43] shadow-sm"
          >
            <span>{t("backToMain")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}