"use client";

import { useRouter } from "next/navigation";

interface ProductActionBarProps {
  price: number;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
}

export default function ProductActionBar({
  price,
  quantity,
  onDecrease,
  onIncrease,
  onAddToCart,
}: ProductActionBarProps) {
  const router = useRouter();

  const handleAddToCartAndRedirect = () => {
    onAddToCart();
    router.push("/shopping");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Jumlah
        </span>
        <div className="flex items-center rounded-xl border border-gray-200 bg-white">
          <button
            type="button"
            onClick={onDecrease}
            className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 rounded-l-xl"
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-semibold text-gray-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 rounded-r-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-3 sm:justify-end">
        <button
          type="button"
          onClick={handleAddToCartAndRedirect}
          className="w-full sm:w-auto flex-1 max-w-xs rounded-xl bg-[#e76f51] px-6 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#d55f43] active:scale-95"
        >
          Rp {(price * quantity).toLocaleString("id-ID")}
        </button>
      </div>
    </div>
  );
}