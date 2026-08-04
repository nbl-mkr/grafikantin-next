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
    <section id="cards" className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Pilih Stand favoritmu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            erbagai pilihan stand makanan dan minuman tersedia di Grafikantin
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {stands.map((stand) => (
            <div
              key={stand.id}
              className="group w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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

                <div className="p-5 flex flex-col justify-between">
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
                      className="size-4 text-[#f97316] shrink-0"
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
                      className="inline-block w-full text-center bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold py-2.5 rounded-xl transition shadow-sm active:scale-[0.98] focus:outline-none"
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
    </section>
  );
}