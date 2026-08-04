"use client";

import { useState } from "react";
import Image from "next/image";
import ComplaintBanner from "@/components/home/ComplaintBanner";
import ItemModal from "../ItemModal";

export interface PopularMenuItem {
  id: number | string;
  nama_menu: string;
  harga: number;
  deskripsi: string;
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
  const [selectedItem, setSelectedItem] = useState<PopularMenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: PopularMenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div id="menu-populer" className="w-full bg-[#f8fafc] py-12">
      <div className="flex flex-col items-center text-center mb-12 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Menu Populer <span className="text-[#f97316]">Minggu Ini</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-md">
          Nikmati santapan paling diminati siswa dengan penyajian cepat dan rasa terjamin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-4 max-w-[85vw] mb-16">
        {items.map((food) => (
          <div
            key={food.id}
            className="group rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={food.gambar}
                  alt={food.nama_menu}
                  className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <dl>
                  <div>
                    <dt className="sr-only">Harga</dt>
                    <dd className="text-lg font-bold text-[#f97316]">
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

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {food.deskripsi}
                </p>

                <div className="mt-4 flex items-center justify-center gap-6 text-xs border-t border-gray-100 pt-3">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="size-4 text-[#f97316]"
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
                      className="size-4 text-[#f97316]"
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
                  <button
                    type="button"
                    onClick={() => handleOpenModal(food)}
                    className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold py-2.5 rounded-xl transition shadow-sm active:scale-[0.98]"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ComplaintBanner />

      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}