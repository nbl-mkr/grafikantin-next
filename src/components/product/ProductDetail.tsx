"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductActionBar from "./ProductActionBar";
import { mockStands } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

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
      gambar: product.gambar,
      quantity: quantity,
      stand_id: product.stand_id || 1,
    });
  };

  const standName = useMemo(() => {
    if (!product.stand_id) return "Stand Melati";
    const stand = mockStands.find((s) => String(s.id) === String(product.stand_id));
    return stand?.nama_stand || "Stand Melati";
  }, [product.stand_id]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#e76f51] transition">
          Beranda
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium truncate max-w-50 sm:max-w-xs">
          {product.nama_menu}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
        <div className="w-full h-full">
          <ProductGallery gambar={product.gambar} namaMenu={product.nama_menu} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-full bg-[#e76f51]/10 px-3 py-1 text-xs font-semibold text-[#e76f51]">
              {standName}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-amber-400 text-sm">★</span>
              <span className="font-bold text-gray-800">
                {product.rating || "4.8 / 5.0"}
              </span>
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl tracking-tight">
            {product.nama_menu}
          </h1>

          <p className="mt-2 text-2xl font-extrabold text-[#e76f51]">
            Rp {product.harga.toLocaleString("id-ID")}
          </p>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Deskripsi Menu
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 max-w-prose">
              {product.deskripsi}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-gray-100 text-sm">
            <div>
              <p className="text-gray-400 text-xs">Estimasi Penyajian</p>
              <p className="font-bold text-gray-800 mt-0.5">
                {product.estimasi || "10-15 Mnt"}
              </p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-gray-400 text-xs">Status Stok</p>
              <p className="font-bold text-emerald-600 mt-0.5">Tersedia</p>
            </div>
          </div>

          <div className="mt-6 lg:mt-8">
            <ProductActionBar
              price={product.harga}
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