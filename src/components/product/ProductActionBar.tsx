interface ProductActionBarProps {
  price: number;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function ProductActionBar({
  price,
  quantity,
  onDecrease,
  onIncrease,
}: ProductActionBarProps) {
  const totalPrice = price * quantity;

  return (
    <div className="mt-5 border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-900">Jumlah</span>
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button
            type="button"
            onClick={onDecrease}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e76f51] text-white hover:bg-[#d95d3f] transition font-bold text-sm active:scale-95"
          >
            -
          </button>
          <span className="text-xs font-bold text-gray-800 min-w-6 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e76f51] text-white hover:bg-[#d95d3f] transition font-bold text-sm active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <p className="text-[10px] text-gray-400 font-medium">Total Pembayaran</p>
          <p className="text-base font-extrabold text-[#e76f51]">
            Rp {totalPrice.toLocaleString("id-ID")}
          </p>
        </div>

        <button
          type="button"
          className="flex-1 bg-linear-to-r from-[#e76f51] to-[#f4a261] hover:opacity-90 text-white text-xs font-semibold py-3 rounded-xl transition shadow-md shadow-[#e76f51]/20 active:scale-[0.98] text-center"
        >
          Masukkan Keranjang
        </button>
      </div>
    </div>
  );
}