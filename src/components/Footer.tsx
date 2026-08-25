import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Grafikantin</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
                    Kantin SMK Negeri 4 Malang yang menyediakan berbagai pilihan makanan dan minuman dengan pelayanan
                    cepat, bersih, dan nyaman.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">

                <div>
                    <p className="font-semibold text-gray-900">Menu</p>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li>
                            <a href="/"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="/order"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                Pesan
                            </a>
                        </li>
                        <li>
                            <a href="/about"
                                className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                Tentang
                            </a>
                        </li>
                        <li>
                            <a href="/" className="text-gray-600 transition hover:text-gray-900 hover:underline">
                                Lainnya
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold text-gray-900">Informasi</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li>SMK Negeri 4 Malang</li>
                        <li>Senin - Jumat: 09.20 - 13.00 WIB</li>
                        <li>(0341) 000000</li>
                    </ul>
                </div>

            </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-center text-gray-500">
                &copy; 2026 Grafikantin | SMK Negeri 4 Malang. All rights reserved.
            </p>
        </div>
    </div>
</footer>
  );
}