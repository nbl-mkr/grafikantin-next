export default function OrderInformation() {
    return (
        <div className="bg-slate-50 py-12 text-gray-900">
            <div className="mx-auto flex max-w-[85vw] flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                <div className="w-full text-left md:w-6/12">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                        Alur Pengambilan Pesanan
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                        Setelah menyelesaikan proses checkout, kamu akan mendapatkan kode pesanan digital. Cukup tunjukkan
                        kode tersebut ke stand terkait untuk mengambil makananmu tanpa perlu mengantre lama.
                    </p>
                </div>

                <div className="w-full text-left md:w-5/12">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">
                            Penting untuk Diingat
                        </h4>
                    </div>

                    <ul className="list-disc pl-5 text-[0.95rem] text-gray-600 space-y-1.5 leading-normal">
                        <li>Pesanan hanya dapat diambil pada jam istirahat sekolah.</li>
                        <li>Pastikan saldo digital mencukupi dan metode pembayaran sesuai sebelum membuat pesanan.</li>
                        <li>Harap mengambil pesanan paling lambat 15 menit sebelum bel masuk kelas berbunyi.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}