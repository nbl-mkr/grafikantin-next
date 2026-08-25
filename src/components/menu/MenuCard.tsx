"use client";

import Link from "next/link";

export interface MenuItem {
  id: number | string;
  nama_menu: string;
  harga: number;
  gambar: string;
  estimasi?: string;
  rating?: string;
}

interface MenuCardProps {
  item: MenuItem;
  category?: "makanan" | "camilan" | string;
  onSelect?: (item: MenuItem, category: string) => void;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="group rounded-lg bg-white p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={item.gambar}
            alt={item.nama_menu}
            className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Harga</dt>
              <dd className="text-lg font-bold text-[#e76f51]">
                Rp {item.harga.toLocaleString("id-ID")}
              </dd>
            </div>

            <div>
              <dt className="sr-only">Nama Menu</dt>
              <dd className="text-xl font-bold text-gray-900 mt-0.5">
                {item.nama_menu}
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
                  {item.estimasi || "10-15 Mnt"}
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
                  {item.rating || "4.8 / 5.0"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Link
              href={`/product/${item.id}`}
              className="block w-full bg-[#e76f51] hover:bg-[#d95d3f] text-white font-semibold py-2.5 rounded-xl transition shadow-sm active:scale-[0.98] text-center"
            >
              Beli Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}