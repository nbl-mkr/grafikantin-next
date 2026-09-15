"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductActionBarProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
}

export default function ProductActionBar({
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
    <div className="flex items-center justify-between gap-3 sm:gap-4 border-t border-gray-100 pt-6">
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Jumlah
        </span>
        <div className="flex h-11 items-center rounded-xl bg-white ring-1 ring-gray-200">
          <button
            type="button"
            onClick={onDecrease}
            disabled={quantity <= 1}
            className="flex h-11 w-9 sm:w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 rounded-l-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="flex h-11 items-center justify-center w-9 sm:w-12 text-center text-sm font-semibold text-gray-900 select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            className="flex h-11 w-9 sm:w-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 rounded-r-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end min-w-0">
        <button
          type="button"
          onClick={handleAddToCartAndRedirect}
          className="flex h-11 items-center justify-center gap-2 w-full sm:w-auto flex-1 max-w-xs truncate rounded-xl bg-[#e76f51] px-4 sm:px-6 text-center text-sm font-bold text-white transition hover:bg-[#d55f43] active:scale-95"
        >
          <Image
            src="/assets/shopping-cart.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 object-contain brightness-0 invert"
          />
          Masukkan Keranjang
        </button>
      </div>
    </div>
  );
}