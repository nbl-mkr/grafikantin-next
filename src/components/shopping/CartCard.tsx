"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

interface StandRef {
  id: number;
  nama_stand: string;
}

export default function CartCard({ stands = [] }: { stands?: StandRef[] }) {
  const t = useTranslations("shopping");
  const locale = useLocale();
  const router = useRouter();
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

  const handleRemoveItem = (id: string | number) => {
    removeFromCart(id);
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    toast.info(t("itemRemoved"));
  };

  const handleDecreaseQuantity = (id: string | number, currentQty: number) => {
    if (currentQty <= 1) {
      removeFromCart(id);
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
      toast.info(t("itemRemoved"));
    } else {
      updateQuantity(id, currentQty - 1);
    }
  };

  const handleRemoveSelected = () => {
    const count = selectedIds.length;
    if (count === 0) return;
    selectedIds.forEach((id) => removeFromCart(id));
    setSelectedIds([]);
    toast.info(t("selectedItemsRemoved", { count }));
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
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t("title")}
        </h1>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-[#fafafa] p-6">
            <svg
              className="size-8 text-gray-600"
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
            {t("emptyTitle")}
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-md">
            {t("emptyBody")}
          </p>
          <Link
            href="/#menu-populer"
            className="mt-6 block w-full max-w-sm rounded-xl border border-gray-100 bg-[#fafafa] p-4 text-left transition-colors duration-300 hover:bg-slate-100"
          >
            <p className="text-sm font-bold text-gray-900">{t("popularTitle")}</p>
            <p className="text-xs text-gray-600 mt-0.5">
              {t("popularSubtitle")}
            </p>
          </Link>
          <Link
            href="/order"
            className="mt-6 w-full max-w-sm rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43]"
          >
            {t("browseStands")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t("title")}
      </h1>

      <div className="mb-4 flex items-center rounded-2xl border border-gray-100 bg-white px-4 py-4 text-sm font-semibold text-gray-600 shadow-sm sm:px-6">
        <label className="flex cursor-pointer items-center gap-4">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#e76f51]"
          />
          <span>{t("colProduct")}</span>
        </label>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(groupedCart).map(([standId, items]) => {
          const standName =
            stands.find((s) => String(s.id) === String(standId))
              ?.nama_stand || t("defaultStand");

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
              <div className="flex items-center gap-3 border-b border-gray-50 bg-white px-4 py-3.5 sm:px-6">
                <input
                  type="checkbox"
                  checked={isStandAllSelected}
                  onChange={handleSelectStand}
                  aria-label={standName}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#e76f51]"
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
                      className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-x-3 gap-y-4 px-4 py-5 sm:grid-cols-[16px_minmax(180px,0.38fr)_minmax(0,1fr)] sm:items-stretch sm:gap-x-5 sm:px-5"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectItem(item.id)}
                        aria-label={item.nama_menu}
                        className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#e76f51]"
                      />
                      {(() => {
                        const isPlaceholder = (item.gambar || "").includes("-icon.png");
                        return (
                          <div
                            className={`relative col-start-2 aspect-video w-full overflow-hidden rounded-xl ${
                              isPlaceholder
                                ? "bg-amber-50/40 flex items-center justify-center"
                                : "bg-slate-200"
                            } sm:row-start-1`}
                          >
                            {isPlaceholder ? (
                              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                                <Image
                                  src={item.gambar || "/assets/food-icon.png"}
                                  alt={item.nama_menu}
                                  fill
                                  sizes="48px"
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <Image
                                src={item.gambar || "/assets/food-icon.png"}
                                alt={item.nama_menu}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 38vw, 380px"
                                className="object-cover"
                              />
                            )}
                          </div>
                        );
                      })()}

                      <div className="col-start-2 flex min-w-0 flex-col justify-between gap-5 text-left sm:col-start-3 sm:row-start-1 sm:h-full">
                        <div className="grid min-w-0 grid-cols-2 gap-x-4 sm:gap-x-6">
                          <p className="min-w-0 break-words text-xl font-semibold leading-6 text-gray-900">
                            {item.nama_menu}
                          </p>
                          <p className="min-w-0 break-words text-right text-lg font-semibold tabular-nums text-gray-700">
                            <span className="sr-only">{t("colUnitPrice")}: </span>
                            {formatCurrency(item.harga, locale)}
                          </p>
                        </div>

                        <div className="grid min-w-0 grid-cols-2 items-center gap-x-4 sm:gap-x-6">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <div
                              role="group"
                              aria-label={`${t("colQuantity")}: ${item.quantity}`}
                              className="flex shrink-0 items-center rounded-lg border border-gray-200 bg-[#fafafa]"
                            >
                              <button
                                type="button"
                                aria-label={`${t("colQuantity")} -`}
                                onClick={() =>
                                  handleDecreaseQuantity(item.id, item.quantity)
                                }
                                className="flex h-8 w-6 items-center justify-center rounded-l-lg text-sm text-gray-600 hover:bg-gray-200"
                              >
                                -
                              </button>
                              <span className="min-w-5 text-center text-sm font-semibold tabular-nums text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`${t("colQuantity")} +`}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-8 w-6 items-center justify-center rounded-r-lg text-sm text-gray-600 hover:bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={t("delete")}
                              onClick={() => handleRemoveItem(item.id)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                            >
                              <svg
                                className="h-4 w-4"
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
                            </button>
                          </div>
                          <p className="min-w-0 break-words text-right text-lg font-semibold tabular-nums text-[#e76f51]">
                            <span className="sr-only">{t("colTotalPrice")}: </span>
                            {formatCurrency(item.harga * item.quantity, locale)}
                          </p>
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
                className="h-4 w-4 rounded border-gray-300 accent-[#e76f51] cursor-pointer"
              />
              <span>{t("selectAll", { count: selectedIds.length })}</span>
            </label>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleRemoveSelected}
                className="text-xs font-medium text-gray-600 hover:text-red-500 transition"
              >
                {t("deleteSelected")}
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-600">
                {t("totalLabel", { count: totalProduk })}
              </span>
              <span className="text-xl font-extrabold text-[#e76f51]">
                {formatCurrency(totalHarga, locale)}
              </span>
            </div>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => {
                if (selectedIds.length > 0) {
                  localStorage.setItem("checkout_items", JSON.stringify(selectedItems));
                  router.push("/checkout");
                }
              }}
              className={`rounded-xl px-8 py-3 text-sm font-bold text-white transition ${
                selectedIds.length > 0
                  ? "bg-[#e76f51] hover:bg-[#d55f43] cursor-pointer"
                  : "bg-[#d55f43] opacity-60 cursor-not-allowed"
              }`}
            >
              {t("checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}