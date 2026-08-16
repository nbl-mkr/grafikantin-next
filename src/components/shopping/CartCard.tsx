"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { mockStands } from "@/data/mockData";

export default function CartCard() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const isAllSelected =
    cart.length > 0 && selectedIds.length === cart.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = () => {
    selectedIds.forEach((id) => removeFromCart(id));
    setSelectedIds([]);
  };

  const selectedItems = cart.filter((item) => selectedIds.includes(item.id));
  const totalHarga = selectedItems.reduce(
    (sum, item) => sum + item.harga * item.quantity,
    0
  );
  const totalProduk = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const groupedCart = cart.reduce((acc, item) => {
    const standId = item.stand_id || 1;
    if (!acc[standId]) acc[standId] = [];
    acc[standId].push(item);
    return acc;
  }, {} as Record<string | number, typeof cart>);

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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Keranjang Belanja Saya
      </h1>

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-6 py-4 text-sm font-semibold text-gray-500 shadow-sm">
        <div className="flex items-center gap-4 w-2/5">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-[#e76f51] focus:ring-[#e76f51] cursor-pointer"
          />
          <span>Produk</span>
        </div>
        <div className="grid grid-cols-4 w-3/5 text-center">
          <span>Harga Satuan</span>
          <span>Kuantitas</span>
          <span>Total Harga</span>
          <span>Aksi</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(groupedCart).map(([standId, items]) => {
          const standName =
            mockStands.find((s) => String(s.id) === String(standId))
              ?.nama_stand || "Stand Melati";

          const isStandAllSelected = items.every((item) =>
            selectedIds.includes(item.id)
          );

          const handleSelectStand = () => {
            if (isStandAllSelected) {
              setSelectedIds((prev) =>
                prev.filter((id) => !items.some((item) => item.id === id))
              );
            } else {
              const itemIds = items.map((item) => item.id);
              setSelectedIds((prev) => Array.from(new Set([...prev, ...itemIds])));
            }
          };

          return (
            <div
              key={standId}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-gray-50 px-6 py-3.5 bg-white">
                <input
                  type="checkbox"
                  checked={isStandAllSelected}
                  onChange={handleSelectStand}
                  className="h-4 w-4 rounded border-gray-300 text-[#e76f51] focus:ring-[#e76f51] cursor-pointer"
                />
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M15 16h.01M9 12h.01M15 12h.01M9 8h.01M15 8h.01"
                    />
                  </svg>
                  <span>{standName}</span>
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {items.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-6 py-4 text-sm"
                    >
                      <div className="flex items-center gap-4 w-2/5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectItem(item.id)}
                          className="h-4 w-4 rounded border-gray-300 text-[#e76f51] focus:ring-[#e76f51] cursor-pointer"
                        />
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                          {item.gambar && (
                            <Image
                              src={item.gambar}
                              alt={item.nama_menu}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-900">
                            {item.nama_menu}
                          </span>
                          <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                            Makanan
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 w-3/5 items-center text-center">
                        <span className="text-gray-600 font-medium">
                          Rp {item.harga.toLocaleString("id-ID")}
                        </span>

                        <div className="flex items-center justify-center">
                          <div className="flex items-center rounded-lg border border-gray-200 bg-slate-50">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <span className="font-bold text-[#e76f51]">
                          Rp {(item.harga * item.quantity).toLocaleString("id-ID")}
                        </span>

                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-[#e76f51] focus:ring-[#e76f51] cursor-pointer"
              />
              <span>Pilih Semua ({selectedIds.length})</span>
            </label>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleRemoveSelected}
                className="text-xs font-medium text-gray-500 hover:text-red-500 transition"
              >
                Hapus Terpilih
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">
                Total ({totalProduk} Produk):
              </span>
              <span className="text-xl font-extrabold text-[#e76f51]">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => {
                if (selectedIds.length > 0) {
                  localStorage.setItem("checkout_items", JSON.stringify(selectedItems));
                  window.location.href = "/checkout";
                }
              }}
              className={`rounded-xl px-8 py-3 text-sm font-bold text-white transition ${
                selectedIds.length > 0
                  ? "bg-[#e76f51] hover:bg-[#d55f43] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}