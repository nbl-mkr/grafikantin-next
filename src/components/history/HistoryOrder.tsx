import Link from "next/link";

export default function HistoryOrder() {
  return (
    <div className="max-w-[85vw] w-full mx-auto py-8 pb-28 grow">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pesanan Saya</h1>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex justify-center">
        <div className="max-w-md w-full text-center">
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

          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Belum Ada Riwayat Pesanan
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Kamu belum pernah melakukan pemesanan makanan atau minuman. Yuk, pesan makanan favoritmu sekarang!
          </p>

          <div className="mt-6">
            <Link
              href="/#menu-populer"
              className="block rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:bg-slate-50 hover:border-gray-300 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 text-sm">Menu Populer</h3>
              <p className="mt-0.5 text-xs text-gray-500">Temukan rekomendasi menu paling laris hari ini</p>
            </Link>
          </div>

          <Link
            href="/order"
            className="mt-4 block w-full rounded-xl bg-[#e76f51] hover:bg-[#d95d3f] px-6 py-3 text-sm font-semibold text-white transition-all shadow-md active:scale-[0.98]"
          >
            Eksplor Menu Kantin
          </Link>
        </div>
      </div>
    </div>
  );
}