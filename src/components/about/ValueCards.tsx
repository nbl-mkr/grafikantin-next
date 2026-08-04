export default function ValueCards() {
  return (
    <section className="w-full bg-[#f97316] py-14 md:py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
            Prinsip Utama
          </span>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Nilai Utama Kami
          </h2>
          <p className="mt-2 text-sm sm:text-base text-indigo-100">
            Prinsip yang selalu kami pegang dalam melayani seluruh warga sekolah
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#f97316]/10 group-hover:bg-[#f97316] transition-colors duration-300">
                  <svg className="size-6 text-[#f97316] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-gray-300 group-hover:text-[#f97316]/40 transition-colors">
                  01
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f97316] transition-colors">
                Kehigienisan yang Terjaga
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                Semua makanan dan minuman diproduksi dengan standar kebersihan tinggi serta menggunakan bahan-bahan segar pilihan setiap harinya.
              </p>
            </div>

            <div className="mt-6 h-1 w-8 rounded-full bg-gray-100 group-hover:w-full group-hover:bg-[#f97316] transition-all duration-300" />
          </div>

          <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#f97316]/10 group-hover:bg-[#f97316] transition-colors duration-300">
                  <svg className="size-6 text-[#f97316] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-gray-300 group-hover:text-[#f97316]/40 transition-colors">
                  02
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f97316] transition-colors">
                Kemudahan Pemesanan
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                Mengintegrasikan teknologi web untuk mempermudah siswa memesan makanan favorit tanpa perlu mengantre lama saat jam istirahat sekolah.
              </p>
            </div>

            <div className="mt-6 h-1 w-8 rounded-full bg-gray-200 group-hover:w-full group-hover:bg-[#f97316] transition-all duration-300" />
          </div>

          <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#f97316]/10 group-hover:bg-[#f97316] transition-colors duration-300">
                  <svg className="size-6 text-[#f97316] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-black text-gray-300 group-hover:text-[#f97316]/40 transition-colors">
                  03
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f97316] transition-colors">
                Nutrisi Seimbang & Terjangkau
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                Menyajikan menu yang kaya akan nutrisi dengan porsi yang pas, serta harga yang tetap bersahabat dan pas di kantong para pelajar.
              </p>
            </div>

            <div className="mt-6 h-1 w-8 rounded-full bg-gray-100 group-hover:w-full group-hover:bg-[#f97316] transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}