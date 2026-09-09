"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { adminNavItems, publicLinks } from "@/data/adminMockData";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLainnyaOpen, setIsLainnyaOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (nav.scrollTop !== 0) {
      nav.scrollTop = 0;
    }
  }, [isLainnyaOpen]);

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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16.25 shrink-0 items-center gap-2 border-b border-gray-100 px-4 text-gray-900 text-lg sm:px-6 lg:px-8">
          <Image
            src="/assets/logo.png"
            alt="Logo Grafikantin"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span>Grafikantin</span>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-50 hover:text-gray-700 lg:hidden"
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav
          ref={navRef}
          className="flex-1 overflow-y-scroll px-4 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [overflow-anchor:none]"
        >
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
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

          <div className="mt-6 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setIsLainnyaOpen(!isLainnyaOpen)}
              aria-expanded={isLainnyaOpen}
              aria-controls="sidebar-lainnya"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 transition hover:text-[#e76f51]"
            >
              Lainnya
              <svg
                aria-hidden="true"
                className={`size-4 shrink-0 transition-transform duration-300 ${isLainnyaOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLainnyaOpen && (
              <ul id="sidebar-lainnya" className="space-y-1 pt-2">
                {publicLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`block rounded-xl px-4 py-2.5 text-sm transition ${
                          isActive
                            ? "bg-gray-50 font-semibold text-[#e76f51]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#e76f51]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="mt-2 block rounded-xl bg-[#e76f51] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#d55f43]"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-3 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </>
  );
}
