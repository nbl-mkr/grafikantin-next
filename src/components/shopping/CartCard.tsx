export default function CartCard() {
    return (
        <div className="max-w-[85vw] w-full mx-auto py-8 pb-28 grow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja Saya</h1>

            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex justify-center">
                <div className="max-w-md w-full text-center">
                    <img src="../assets/shopping-cart.png" alt="Shopping Cart Icon"
                        className="mx-auto w-20 h-20 object-contain opacity-50" />

                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Keranjang Masih Kosong</h2>

                    <p className="mt-2 text-sm text-gray-600">
                        Kamu belum menambahkan menu ke keranjang. Yuk, cari makanan favoritmu sekarang!
                    </p>

                    <div className="mt-6">
                        <a href="/#menu-populer"
                            className="block rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:bg-slate-50 hover:border-gray-300 shadow-sm">
                            <h3 className="font-semibold text-gray-900 text-sm">Menu Populer</h3>
                            <p className="mt-0.5 text-xs text-gray-500">Temukan rekomendasi menu paling laris hari ini</p>
                        </a>
                    </div>

                    <a href="/order"
                        className="mt-4 block w-full rounded-xl bg-[#3333cc] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2b2bad] shadow-md active:scale-[0.98]">
                        Lihat Daftar Stand
                    </a>
                </div>
            </div>
    </div>
    );
}