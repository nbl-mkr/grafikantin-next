import Image from "next/image";
import { TopMenu, StandStatus } from "@/data/adminMockData";

interface BottomSectionProps {
  menus: TopMenu[];
  stands: StandStatus[];
}

export default function BottomSection({ menus, stands }: BottomSectionProps) {
  const targetHarian = 2000000;
  const terjualHarian = 1240000;
  const progressPercent = Math.min((terjualHarian / targetHarian) * 100, 100);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-500">Target Harian</p>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-2xl font-extrabold text-gray-900">Rp {terjualHarian.toLocaleString("id-ID")}</p>
        <p className="mt-1 text-xs text-gray-500">dari target Rp {targetHarian.toLocaleString("id-ID")}</p>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600">Progress</span>
            <span className="text-xs font-bold text-[#e76f51]">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#e76f51] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e76f51]" />
              <span className="text-gray-600 font-medium">Tercapai</span>
            </div>
            <span className="text-gray-900 font-bold">Rp {terjualHarian.toLocaleString("id-ID")}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Rp {targetHarian.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-gray-500">Menu Terlaris</p>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col gap-4">
          {menus.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image src={item.gambar} alt={item.nama_menu} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{item.nama_menu}</p>
                <p className="text-xs text-gray-500">{item.stand}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{item.terjual}</p>
                <p className="text-[10px] text-gray-400 uppercase">porsi</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-gray-500">Status Stand</p>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          {stands.map((stand) => (
            <div key={stand.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stand.status === "Buka" ? "bg-emerald-50" : "bg-red-50"}`}>
                  <svg className={`h-4 w-4 ${stand.status === "Buka" ? "text-emerald-600" : "text-red-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M15 16h.01M9 12h.01M15 12h.01M9 8h.01M15 8h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{stand.nama_stand}</p>
                  <p className="text-xs text-gray-500">{stand.terjual} porsi terjual</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  stand.status === "Buka"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stand.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}