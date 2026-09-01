"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!isProfileModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileModalOpen]);
  const [fullName, setFullName] = useState("Admin");
  const [email, setEmail] = useState("admin@grafikantin.id");
  const [teamName, setTeamName] = useState("Grafikantin");
  const [photoProfile, setPhotoProfile] = useState("/assets/photo_profile.jpg");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProfile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeProfileModal();
  };

  const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Pesanan",
    href: "/admin/order",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    label: "Daftar Stand",
    href: "/admin/stand",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M15 16h.01M9 12h.01M15 12h.01M9 8h.01M15 8h.01" />
      </svg>
    ),
  },
  {
    label: "Daftar Menu",
    href: "/admin/menu",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Laporan",
    href: "/admin/report",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Pengaturan",
    href: "/admin/setting",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-gray-100 bg-white lg:flex">
      <div className="flex h-16.25 items-center gap-2 border-b border-gray-100 px-4 sm:px-6 lg:px-8 text-gray-900 text-lg">
        <Image
          src="/assets/logo.png"
          alt="Logo Grafikantin"
          width={32}
          height={32}
          className="h-8 w-auto object-contain"
        />
        <span>Grafikantin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-50 text-[#e76f51]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#e76f51]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-3 shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
              <img
                src={photoProfile}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{fullName}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeProfileModal}
        >
          <div
            className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-bold text-gray-900">Profil</h1>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Tutup profil"
                    onClick={closeProfileModal}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <button
                    type="submit"
                    form="profile-form"
                    className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
                  >
                    Simpan perubahan
                  </button>
                </div>
              </div>

              <form
                id="profile-form"
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h2 className="text-sm font-medium text-gray-900">Profil</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 flex flex-col items-center justify-center gap-4">
                    <label htmlFor="photo-profile-upload" className="cursor-pointer">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-200">
                        <img
                          src={photoProfile}
                          alt="Foto Profil"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </label>
                    <span className="text-sm font-medium text-gray-900">{fullName}</span>
                    <input
                      type="file"
                      id="photo-profile-upload"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama lengkap
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Alamat email
                    </label>
                    <input
                      type="email"
                      id="email-address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="team-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama tim
                    </label>
                    <input
                      type="text"
                      id="team-name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="mt-1 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}