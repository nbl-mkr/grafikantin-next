"use client";

import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("order");
  const handleScrollToCards = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("cards");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-20 overflow-hidden">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="w-full text-center md:text-left md:w-8/12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            {t("heroTitleFirst")}{" "}
            <span className="italic text-[#e76f51]">{t("heroTitleAccent")}</span>
          </h1>

          <p className="mt-3 text-base italic text-gray-600">
            {t("heroSubtitle")}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              {t("featureFast")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              {t("featureNoQueue")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              {t("featureVariative")}
            </span>
          </div>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-start">
          <a
            href="#cards"
            onClick={handleScrollToCards}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e76f51] px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#E76F51]/25 transition hover:bg-[#d55f43]"
          >
            <span>{t("heroCta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}