import Image from "next/image";
import Link from "next/link";

interface Stand {
  id: number | string;
  nama_stand: string;
  deskripsi: string;
  gambar?: string;
}

interface StandCardsProps {
  stands: Stand[];
}

export default function StandCards({ stands }: StandCardsProps) {
  return (
    <div
      id="cards"
      className="relative py-12 text-center bg-cover bg-center bg-no-repeat bg-[linear-gradient(rgba(51,51,204,0.50),rgba(51,51,204,0.50)),url('/assets/card-image.jpg')]"
    >
      <div className="mx-auto max-w-[85vw] pt-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {stands.map((stand) => (
            <div
              key={stand.id}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden">
                  <Image
                    src={`/assets/${stand.gambar || "menu.jpg"}`}
                    alt={stand.nama_stand}
                    width={400}
                    height={208}
                    className="h-52 w-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-300 block"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xl font-bold text-gray-900">
                      {stand.nama_stand}
                    </h5>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {stand.deskripsi}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs border-t border-gray-100 pt-3 text-gray-500">
                    <svg
                      className="size-4 text-[#3333cc] shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V5"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">
                      Area Kantin SMK Negeri 4 Malang
                    </span>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/menu?stand_id=${stand.id}`}
                      className="inline-block w-full text-center bg-[#3333cc] hover:bg-[#2b2bad] text-white font-semibold py-2.5 rounded-xl transition shadow-sm active:scale-[0.98] focus:outline-none"
                    >
                      Kunjungi Stand
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}