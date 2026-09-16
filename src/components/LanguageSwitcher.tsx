"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const LABELS: Record<AppLocale, string> = { id: "ID", en: "EN" };

export default function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("nav");

  const base =
    "rounded-full px-2.5 py-1 text-xs font-bold transition";

  return (
    <div className="flex items-center gap-1 rounded-full bg-[#e76f51]/10 p-1">
      {routing.locales.map((code) => {
        const active = code === locale;
        const className = active
          ? `${base} bg-[#e76f51] text-white shadow-sm`
          : `${base} text-gray-500 hover:text-[#e76f51]`;

        const target = pathname ?? "/";
        return (
          <Link
            key={code}
            href={target}
            locale={code}
            scroll={false}
            replace
            className={className}
            aria-current={active ? "true" : undefined}
          >
            {LABELS[code]}
          </Link>
        );
      })}
      <span className="sr-only">{t("language")}</span>
    </div>
  );
}
