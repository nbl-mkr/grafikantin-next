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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="relative h-52 w-full">
          <img
            src={item.gambar || "/assets/fallback.jpg"}
            alt={item.nama_menu}
            className="h-full w-full object-cover"
          />
          <button
            onClick={onClose}
            type="button"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-sm transition font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">
              {item.nama_menu}
            </h3>
            <span className="text-lg font-bold text-[rgb(51,51,204)] whitespace-nowrap">
              Rp {item.harga.toLocaleString("id-ID")}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {item.deskripsi}
          </p>

          <hr className="my-4 border-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900">
              Jumlah Pembelian
            </span>
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgb(51,51,204)] text-white hover:bg-[rgb(43,43,173)] transition font-bold text-sm"
              >
                -
              </button>
              <span className="text-xs font-bold text-gray-800 min-w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgb(51,51,204)] text-white hover:bg-[rgb(43,43,173)] transition font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4">
            <div className="shrink-0">
              <p className="text-[10px] text-gray-400 font-medium">Total Harga</p>
              <p className="text-base font-bold text-gray-900">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[rgb(51,51,204)] hover:bg-[rgb(43,43,173)] text-white text-xs font-semibold py-3 rounded-xl transition shadow-sm active:scale-[0.98] text-center"
            >
              + Masukkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}