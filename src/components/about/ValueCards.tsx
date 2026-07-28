export default function ValueCards() {
    return (
        <div className="bg-[#3333cc] py-12 text-white">
        <div className="mx-auto max-w-[85vw] py-4">

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Nilai Utama Kami
                </h2>
                <p className="mt-1 text-white/70">
                    Prinsip yang selalu kami pegang dalam melayani warga sekolah
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div
                    className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 ease-in-out hover:-translate-y-1">
                    <h5 className="mb-3 text-center text-lg font-bold text-[#3333cc]">
                        Kehigienisan yang Terjaga
                    </h5>
                    <p className="text-center text-sm leading-relaxed text-gray-600">
                        Semua makanan dan minuman diproduksi dengan standar kebersihan tinggi serta menggunakan
                        bahan-bahan segar pilihan setiap harinya.
                    </p>
                </div>

                <div
                    className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 ease-in-out hover:-translate-y-1">
                    <h5 className="mb-3 text-center text-lg font-bold text-[#3333cc]">
                        Kemudahan Pemesanan
                    </h5>
                    <p className="text-center text-sm leading-relaxed text-gray-600">
                        Mengintegrasikan teknologi web untuk mempermudah siswa memesan makanan favorit tanpa perlu
                        mengantre lama saat jam istirahat sekolah.
                    </p>
                </div>

                <div
                    className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-transform duration-200 ease-in-out hover:-translate-y-1">
                    <h5 className="mb-3 text-center text-lg font-bold text-[#3333cc]">
                        Nutrisi Seimbang & Terjangkau
                    </h5>
                    <p className="text-center text-sm leading-relaxed text-gray-600">
                        Menyajikan menu yang kaya akan nutrisi dengan porsi yang pas, serta harga yang tetap bersahabat
                        dan pas di kantong para pelajar.
                    </p>
                </div>

            </div>

        </div>
    </div>
    );
}