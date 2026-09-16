"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white border-t border-gray-100 print:hidden">
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div className="lg:col-span-1">
                <Link href="/" className="flex items-center gap-4 text-gray-900 text-lg">
                    <Image
                        src="/assets/logo_footer.png"
                        alt="Logo Grafikantin"
                        width={128}
                        height={128}
                        className="h-8 w-auto object-contain"
                    />
                    <span className="font-semibold">Grafikantin</span>
                </Link>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
                    {t("description")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">

                <div>
                    <p className="font-semibold text-gray-900">{t("menuHeading")}</p>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li>
                            <Link href="/"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                {t("home")}
                            </Link>
                        </li>
                        <li>
                            <Link href="/order"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                {t("order")}
                            </Link>
                        </li>
                        <li>
                            <Link href="/about"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                {t("about")}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold text-gray-900">{t("infoHeading")}</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li>{t("school")}</li>
                        <li>{t("hours")}</li>
                        <li>{t("phone")}</li>
                    </ul>
                </div>

            </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-center text-gray-600">
                {t("copyright", { year: new Date().getFullYear() })}
            </p>
        </div>
    </div>
</footer>
  );
}
