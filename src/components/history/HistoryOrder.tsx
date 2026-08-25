import Link from "next/link";

export default function HistoryOrder() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 pb-32">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Riwayat Pesanan Saya
      </h1>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
        <div className="mb-4 rounded-full bg-slate-50 p-6">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          Belum Ada Riwayat Pesanan
        </h2>

        <p className="mt-2 text-sm text-gray-500 max-w-md">
          Kamu belum pernah melakukan pemesanan makanan atau minuman. Yuk, pesan makanan favoritmu sekarang!
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
          Eksplor Menu Kantin
        </Link>
      </div>
    </div>
  );
}