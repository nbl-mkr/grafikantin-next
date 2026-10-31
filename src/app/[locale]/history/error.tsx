"use client";

import { useTranslations } from "next-intl";

export default function HistoryError({ reset }: { reset: () => void }) {
  const t = useTranslations("history");

  return (
    <section
      role="alert"
      className="mx-auto w-full max-w-5xl px-4 py-10 pb-28 text-slate-900 sm:px-6"
    >
      <div className="mx-auto max-w-2xl border-t border-slate-200 py-8 text-center">
        <h1 className="text-xl font-semibold">{t("loadErrorTitle")}</h1>
        <p className="mt-2 text-slate-600">{t("loadErrorBody")}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#e76f51] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#d55f43] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76f51]"
        >
          {t("retry")}
        </button>
      </div>
    </section>
  );
}
