"use client";

import { useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductActionBar from "./ProductActionBar";

export interface ProductData {
  id: string | number;
  nama_menu: string;
  harga: number;
  deskripsi: string;
  gambar?: string;
  estimasi?: string;
  rating?: string;
  stand_id?: string | number;
}

interface ProductDetailProps {
  product: ProductData;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [catatan, setCatatan] = useState("");

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#e76f51] transition">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.nama_menu}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-6 bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-xs">
        <div className="md:col-span-5 h-full min-h-65 md:min-h-0">
          <ProductGallery gambar={product.gambar} namaMenu={product.nama_menu} />
        </div>

        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#e76f51]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#e76f51]">
                Stand Melati
              </span>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <span className="text-amber-400">★</span>
                <span className="font-bold text-gray-800">{product.rating || "4.8 / 5.0"}</span>
              </div>
            </div>

            <h1 className="mt-2 text-xl font-extrabold text-gray-900 sm:text-2xl">
              {product.nama_menu}
            </h1>

            <p className="mt-1.5 text-xl font-extrabold text-[#e76f51]">
              Rp {product.harga.toLocaleString("id-ID")}
            </p>

            <div className="mt-4 border-t border-gray-100 pt-3">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Deskripsi Menu
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {product.deskripsi}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fafafa] p-3 border border-gray-100 text-[11px]">
              <div>
                <p className="text-gray-400">Estimasi Penyajian</p>
                <p className="font-bold text-gray-800 mt-0.5">{product.estimasi || "10-15 Mnt"}</p>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <p className="text-gray-400">Status Stok</p>
                <p className="font-bold text-emerald-600 mt-0.5">Tersedia</p>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="catatan" className="block text-[11px] font-bold text-gray-700">
                Catatan Pesanan (Opsional)
              </label>
              <textarea
                id="catatan"
                rows={2}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: Pedas sedang, tidak pakai sayur..."
                className="mt-1.5 w-full rounded-xl border border-gray-200 p-2.5 text-xs focus:border-[#e76f51] focus:outline-none focus:ring-1 focus:ring-[#e76f51] resize-none"
              />
            </div>
          </div>

          <ProductActionBar
            price={product.harga}
            quantity={quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
        </div>
      </div>
    </div>
  );
}