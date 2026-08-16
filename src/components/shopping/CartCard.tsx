"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartCard() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalHarga = cart.reduce(
    (sum, item) => sum + item.harga * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Keranjang Belanja Saya
        </h1>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-slate-50 p-6">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Keranjang Masih Kosong
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md">
            Kamu belum menambahkan menu ke keranjang. Yuk, cari makanan
            favoritmu sekarang!
          </p>
          <div className="mt-6 w-full max-w-sm rounded-xl border border-gray-100 bg-slate-50 p-4 text-left">
            <p className="text-sm font-bold text-gray-900">Menu Populer</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Temukan rekomendasi menu paling laris hari ini
            </p>
          </div>
          <Link
            href="/order"
            className="mt-6 w-full max-w-sm rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            Lihat Daftar Stand
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Keranjang Belanja Saya
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {item.gambar && (
                  <Image
                    src={item.gambar}
                    alt={item.nama_menu}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {item.nama_menu}
                  </h3>
                  <p className="text-xs font-semibold text-[#e76f51] mt-1">
                    Rp {item.harga.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Ringkasan Pesanan
          </h2>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Total Harga</span>
            <span className="font-semibold text-gray-900">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="border-t border-gray-100 my-4" />
          <div className="flex justify-between text-base font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span className="text-[#e76f51]">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            type="button"
            className="w-full rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}