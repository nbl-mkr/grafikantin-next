"use client";

import { useLocale, hasLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";

function localeFromPathname(pathname: string | null) {
  const segment = pathname?.split("/")[1];
  return hasLocale(routing.locales, segment) ? segment : null;
}

function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const providerLocale = useLocale();
  const router = useRouter();

  const pathLocale = localeFromPathname(pathname);
  const active = pathLocale ?? providerLocale;
  const isPrefixedHome = pathname === "/id" || pathname === "/en";

  return (
    <div
      className="inline-flex items-center rounded-full bg-gray-100 p-0.5 text-[11px] font-semibold"
      role="group"
      aria-label="Bahasa / Language"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        const label = locale.toUpperCase();

        if (isActive) {
          return (
            <span
              key={locale}
              aria-current="true"
              className="rounded-full bg-[#e76f51] px-2.5 py-1 text-white"
            >
              {label}
            </span>
          );
        }

        if (isPrefixedHome) {
          return (
            <Link
              key={locale}
              href={`/${locale}`}
              prefetch={false}
              className="rounded-full px-2.5 py-1 text-gray-600 transition-colors hover:text-gray-900"
            >
              {label}
            </Link>
          );
        }

        return (
          <button
            key={locale}
            type="button"
            onClick={() => {
              setLocaleCookie(locale);
              router.refresh();
            }}
            className="rounded-full px-2.5 py-1 text-gray-600 transition-colors hover:text-gray-900"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
