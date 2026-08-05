import Link from "next/link";

export default function HistoryOrder() {
  return (
    <div className="mx-auto max-w-md text-center py-12 px-4">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-indigo-50 text-[#e76f51]">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
          />
        </svg>
      </div>

      <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
        Belum Ada Riwayat Pesanan
      </h2>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        Kamu belum pernah melakukan pemesanan makanan atau minuman. Yuk, pesan makanan favoritmu sekarang!
      </p>

      <div className="mt-8 space-y-3">
        <Link
          href="/order"
          className="block w-full rounded-xl bg-[#e76f51] hover:bg-[#d95d3f] px-6 py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.98]"
        >
          Eksplor Menu Kantin
        </Link>
      </div>
    </div>
  );
}