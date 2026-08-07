"use client";

import { useState, useEffect } from "react";

export interface ModalItem {
  id: string | number;
  nama_menu: string;
  harga: number;
  deskripsi: string;
  gambar?: string;
  estimasi?: string;
  rating?: string;
}

interface ItemModalProps {
  item: ModalItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const totalPrice = item.harga * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
        <div className="relative h-56 w-full">
          <img
            src={item.gambar || "/assets/fallback.jpg"}
            alt={item.nama_menu}
            className="h-full w-full object-cover"
          />
          <button
            onClick={onClose}
            type="button"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-gray-900 shadow-md backdrop-blur-md transition font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 leading-snug">
              {item.nama_menu}
            </h3>
            <span className="text-lg font-bold text-[#e76f51] whitespace-nowrap">
              Rp {item.harga.toLocaleString("id-ID")}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {item.deskripsi}
          </p>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs border-t border-b border-gray-100 py-3">
            <div className="flex items-center gap-2">
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
              <div>
                <p className="text-[10px] text-gray-400">Estimasi</p>
                <p className="font-medium text-gray-700">
                  {item.estimasi || "10-15 Mnt"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <div>
                <p className="text-[10px] text-gray-400">Rating</p>
                <p className="font-medium text-gray-700">
                  {item.rating || "4.8 / 5.0"}
                </p>
              </div>
            </div>
          </div>

          <div className="my-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">
              Jumlah Pembelian
            </span>
            <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e76f51] text-white hover:bg-[#d95d3f] transition font-bold text-sm active:scale-95"
              >
                -
              </button>
              <span className="text-xs font-bold text-gray-800 min-w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e76f51] text-white hover:bg-[#d95d3f] transition font-bold text-sm active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
            <div className="shrink-0">
              <p className="text-[10px] text-gray-400 font-medium">Total Harga</p>
              <p className="text-base font-bold text-[#e76f51]">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-linear-to-r from-[#e76f51] to-[#f4a261] hover:opacity-90 text-white text-xs font-semibold py-3 rounded-xl transition shadow-md shadow-[#e76f51]/20 active:scale-[0.98] text-center"
            >
              + Masukkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}