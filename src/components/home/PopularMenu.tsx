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
  return (
    <div id="menu-populer" className="w-full bg-white py-12 scroll-mt-16">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Menu Populer <span className="text-[#e76f51]">Minggu Ini</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-xl">
          Nikmati santapan paling diminati siswa dengan penyajian cepat dan rasa terjamin.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((food) => (
            <div
              key={food.id}
              className="group rounded-lg bg-white p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={food.gambar}
                    alt={food.nama_menu}
                    className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Harga</dt>
                      <dd className="text-lg font-bold text-[#e76f51]">
                        Rp {food.harga.toLocaleString("id-ID")}
                      </dd>
                    </div>

                    <div>
                      <dt className="sr-only">Nama Menu</dt>
                      <dd className="text-xl font-bold text-gray-900 mt-0.5">
                        {food.nama_menu}
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
                          {food.estimasi || "10-15 Mnt"}
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
                          {food.rating || "4.8 / 5.0"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/product/${food.id}`}
                      className="block w-full bg-[#e76f51] hover:bg-[#d95d3f] text-white font-semibold py-2.5 rounded-xl transition shadow-sm active:scale-[0.98] text-center"
                    >
                      Beli Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ComplaintBanner />
    </div>
  );
}