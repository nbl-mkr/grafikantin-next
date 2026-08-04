export default function OrderInformation() {
  return (
    <div className="w-full bg-slate-50 py-12 md:py-16 text-gray-900 border-y border-gray-200/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-stretch">
        
        <div className="w-full text-left md:w-6/12 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f97316] mb-2">
            Panduan Pesanan
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Alur Pengambilan Pesanan
          </h3>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Setelah menyelesaikan proses checkout, kamu akan mendapatkan kode pesanan digital. Cukup tunjukkan kode tersebut ke stand terkait untuk mengambil makananmu tanpa perlu mengantre lama.
          </p>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        <div className="w-full text-left md:w-5/12 flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            Penting untuk Diingat
          </h4>

          <ul className="space-y-2.5 text-sm text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-[#f97316] font-bold">•</span>
              <span>Pesanan hanya dapat diambil pada jam istirahat sekolah.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#f97316] font-bold">•</span>
              <span>Pastikan saldo digital mencukupi dan metode pembayaran sesuai sebelum membuat pesanan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#f97316] font-bold">•</span>
              <span>Harap mengambil pesanan paling lambat 15 menit sebelum bel masuk kelas berbunyi.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}