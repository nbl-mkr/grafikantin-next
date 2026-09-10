"use client";

import Link from "next/link";
import ComplaintBanner from "@/components/home/ComplaintBanner";

export interface PopularMenuItem {
  id: number | string;
  nama_menu: string;
  harga: number;
  deskripsi?: string;
  gambar: string;
  stand_id?: number | string;
  estimasi?: string;
  rating?: string;
}

interface PopularMenuProps {
  items: PopularMenuItem[];
  onSelect?: (item: PopularMenuItem) => void;
}

export default function PopularMenu({ items, onSelect }: PopularMenuProps) {
  const featured = items[0];

  const handleBuyClick = () => {
    if (!featured) return;
    onSelect?.(featured);
  };

  return (
    <div id="menu-populer" className="w-full bg-white py-16 sm:py-20 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_352px] lg:gap-14">
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl leading-[1.1]">
              Menu Populer <span className="text-[#e76f51]">Minggu Ini</span>
            </h2>
            <p className="mt-4 text-base text-gray-600 max-w-md leading-relaxed">
              Nikmati santapan paling diminati siswa dengan penyajian cepat dan rasa terjamin.
            </p>

            {featured && (
              <>
                <div className="mt-8">
                  <p className="text-xs font-medium text-gray-400">Harga mulai dari</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Rp {featured.harga.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="border-l-2 border-[#e76f51] pl-4">
                    <p className="text-lg font-bold text-gray-900">
                      {featured.estimasi || "10-15 Mnt"}
                    </p>
                    <p className="text-xs text-gray-500">Estimasi Penyajian</p>
                  </div>
                  <div className="border-l-2 border-[#e76f51] pl-4">
                    <p className="text-lg font-bold text-gray-900">
                      {featured.rating || "4.8 / 5.0"}
                    </p>
                    <p className="text-xs text-gray-500">Rating Siswa</p>
                  </div>
                </div>
              </>
            )}

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center text-sm font-semibold text-gray-900 transition-colors hover:text-[#e76f51]"
            >
              Lihat Semua Menu
            </Link>
          </div>

          {featured && (
            <div className="group rounded-lg bg-white p-4 shadow-sm hover:shadow-[0_0_16px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between w-full max-w-[352px] mx-auto lg:justify-self-end lg:mx-0">
              <div>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={featured.gambar}
                    alt={featured.nama_menu}
                    className="h-52 w-full object-cover"
                  />
                </div>

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Harga</dt>
                      <dd className="text-lg font-bold text-[#e76f51]">
                        Rp {featured.harga.toLocaleString("id-ID")}
                      </dd>
                    </div>

                    <div>
                      <dt className="sr-only">Nama Menu</dt>
                      <dd className="text-xl font-bold text-gray-900 mt-0.5">
                        {featured.nama_menu}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex items-center justify-center gap-6 text-xs border-t border-gray-100 pt-3">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        className="size-4 text-[#e76f51]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-400">Estimasi</p>
                        <p className="font-medium text-gray-700">
                          {featured.estimasi || "10-15 Mnt"}
                        </p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <svg
                        className="size-4 text-[#e76f51]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-400">Rating</p>
                        <p className="font-medium text-gray-700">
                          {featured.rating || "4.8 / 5.0"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/product/${featured.id}`}
                      onClick={handleBuyClick}
                      className="block w-full bg-[#e76f51] hover:bg-[#d95d3f] text-white font-semibold py-2.5 rounded-lg transition shadow-sm active:scale-[0.98] text-center"
                    >
                      Beli Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 sm:mt-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-[1.1] sm:text-4xl">
            Kami <span className="text-[#e76f51]">Mendengarmu</span>
          </h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl leading-relaxed sm:text-lg">
            Punya pengalaman makan yang menyenangkan, atau menemukan kendala saat memesan? Sampaikan lewat fitur ini agar kantin tumbuh lebih baik.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ComplaintBanner />
      </div>
    </div>
  );
}
