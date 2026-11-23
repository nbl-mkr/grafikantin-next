"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface MenuItem {
  id: number | string;
  nama_menu: string;
  harga: number;
  gambar: string;
  estimasi?: string;
  rating?: string;
  tersedia?: boolean;
}

import AdaptiveImage from "@/components/common/AdaptiveImage";
import { formatCurrency } from "@/lib/format";

interface MenuCardProps {
  item: MenuItem;
  category?: "makanan" | "camilan" | string;
  onSelect?: (item: MenuItem, category: string) => void;
  preload?: boolean;
}

export default function MenuCard({ item, preload }: MenuCardProps) {
  const t = useTranslations("menu");
  const locale = useLocale();
  const isPlaceholder = (item.gambar || "").includes("-icon.png");

  return (
    <div className="group rounded-lg bg-white p-4 shadow-sm hover:shadow-[0_0_16px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between">
      <div>
        <div
          className={`relative h-52 overflow-hidden rounded-lg ${
            isPlaceholder ? "bg-amber-50/40 flex items-center justify-center" : ""
          }`}
        >
          {isPlaceholder ? (
            <div className="relative h-20 w-20">
              <AdaptiveImage
                src={item.gambar}
                alt={item.nama_menu}
                fill
                sizes="80px"
                className="object-contain"
                preload={preload}
              />
            </div>
          ) : (
            <AdaptiveImage
              src={item.gambar}
              alt={item.nama_menu}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              preload={preload}
            />
          )}
        </div>

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">{t("priceLabel")}</dt>
              <dd className="text-lg font-bold text-[#e76f51]">
                {formatCurrency(item.harga, locale)}
              </dd>
            </div>

            <div>
              <dt className="sr-only">{t("nameLabel")}</dt>
              <dd className="text-xl font-bold text-gray-900 mt-0.5">
                {item.nama_menu}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs border-t border-gray-100 pt-3">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-[#e76f51]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-600">{t("estimateLabel")}</p>
                <p className="font-medium text-gray-700">
                  {item.estimasi || t("estimateDefault")}
                </p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                className="size-4 text-[#e76f51] shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-600">{t("statusLabel")}</p>
                <p className={`font-medium ${item.tersedia !== false ? "text-gray-700" : "text-gray-400"}`}>
                  {item.tersedia !== false ? t("statusAvailable") : t("statusUnavailable")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Link
              href={`/product/${item.id}`}
              className="block w-full bg-[#e76f51] hover:bg-[#d95d3f] text-white font-semibold py-2.5 rounded-lg transition shadow-sm active:scale-[0.98] text-center"
            >
              {t("buyNow")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}