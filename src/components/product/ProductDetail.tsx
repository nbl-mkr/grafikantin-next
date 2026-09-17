"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProductGallery from "./ProductGallery";
import ProductActionBar from "./ProductActionBar";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export interface ProductData {
  id: string | number;
  nama_menu: string;
  harga: number;
  deskripsi?: string;
  gambar?: string;
  estimasi?: string;
  rating?: string;
  stand_id?: string | number;
}

interface ProductDetailProps {
  product: ProductData;
  standName?: string;
}

export default function ProductDetail({ product, standName }: ProductDetailProps) {
  const t = useTranslations("product");
  const locale = useLocale();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      nama_menu: product.nama_menu,
      harga: product.harga,
      gambar: product.gambar || "/placeholder.png",
      quantity: quantity,
      stand_id: product.stand_id || 1,
    });
  };

  const resolvedStandName = standName || t("defaultStand");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-[#e76f51] transition">
          {t("breadcrumbHome")}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium truncate max-w-50 sm:max-w-xs">
          {product.nama_menu}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch pb-6 md:pb-10">
        <div className="w-full h-full">
          <ProductGallery gambar={product.gambar} namaMenu={product.nama_menu} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-full bg-[#e76f51]/10 px-3 py-1 text-xs font-semibold text-[#e76f51]">
              {resolvedStandName}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="text-amber-400 text-sm">★</span>
              <span className="font-bold text-gray-800">
                {product.rating || t("ratingDefault")}
              </span>
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl tracking-tight">
            {product.nama_menu}
          </h1>

          <p className="mt-2 text-2xl font-extrabold text-[#e76f51]">
            {formatCurrency(product.harga, locale)}
          </p>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              {t("descriptionTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 max-w-prose">
              {product.deskripsi}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-gray-100 text-sm">
            <div>
              <p className="text-gray-600 text-xs">{t("estimateTitle")}</p>
              <p className="font-bold text-gray-800 mt-0.5">
                {product.estimasi || t("estimateDefault")}
              </p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-gray-600 text-xs">{t("stockTitle")}</p>
              <p className="font-bold text-emerald-600 mt-0.5">{t("stockAvailable")}</p>
            </div>
          </div>

          <div className="mt-6 lg:mt-8">
            <ProductActionBar
              quantity={quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}