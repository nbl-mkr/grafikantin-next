import Link from "next/link";
import { Stand } from "@/data/mockData";

interface HeroSectionProps {
  stand?: Stand;
}

export default function HeroSection({ stand }: HeroSectionProps) {
  const defaultStand: Stand = {
    id: 1,
    nama_stand: "Kantin Utama",
    deskripsi: "Pilihan menu makanan dan minuman lezat untuk menemani harimu.",
  };

  const activeStand = stand || defaultStand;

  return (
    <div className="w-full py-12 bg-slate-50">
      <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 max-w-[85vw]">
        
        <div className="w-full md:w-8/12 text-left">
          <nav className="mb-2 text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/order" className="text-[#3333cc] hover:underline font-medium">
                  Stand
                </Link>
              </li>
              <li><span className="text-slate-400">/</span></li>
              <li className="text-slate-600 font-medium" aria-current="page">
                {activeStand.nama_stand}
              </li>
            </ol>
          </nav>

          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl mb-2">
            {activeStand.nama_stand} - Pilihan Menu
          </h1>
          <p className="text-slate-500 mb-6 text-base">
            {activeStand.deskripsi}
          </p>

          <div className="flex gap-2">
            <a
              href="#food-section"
              className="px-4 py-2 bg-[#3333cc] hover:bg-[#2b2bad] text-white font-semibold text-sm rounded-lg transition-colors inline-block"
            >
              Makanan
            </a>
            <a
              href="#snack-section"
              className="px-4 py-2 bg-[#3333cc] hover:bg-[#2b2bad] text-white font-semibold text-sm rounded-lg transition-colors inline-block"
            >
              Camilan
            </a>
          </div>
        </div>

        <div className="w-full md:w-4/12 text-left md:text-right mt-6 md:mt-0">
          <Link
            href="/order"
            className="inline-block rounded-xl bg-[#3333cc] px-6 py-2.5 text-base font-semibold text-white transition hover:bg-[#2b2bad] active:scale-95"
          >
            Kembali ke Utama
          </Link>
        </div>

      </div>
    </div>
  );
}