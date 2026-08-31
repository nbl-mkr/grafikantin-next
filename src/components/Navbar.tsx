"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const isDropdownActive =
    pathname === "/history" ||
    pathname === "/kritik-saran" ||
    pathname === "/auth/login";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="w-full flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-gray-900 text-lg">
          <Image
            src="/assets/logo.png"
            alt="Logo Grafikantin"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span>Grafikantin</span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  href="/"
                  className={`transition-colors hover:text-[#e76f51] ${
                    isActive("/")
                      ? "font-semibold text-[#e76f51]"
                      : "font-normal text-gray-500"
                  }`}
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/order"
                  className={`transition-colors hover:text-[#e76f51] ${
                    isActive("/order")
                      ? "font-semibold text-[#e76f51]"
                      : "font-normal text-gray-500"
                  }`}
                >
                  Pesan
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`transition-colors hover:text-[#e76f51] ${
                    isActive("/about")
                      ? "font-semibold text-[#e76f51]"
                      : "font-normal text-gray-500"
                  }`}
                >
                  Tentang
                </Link>
              </li>

              <li className="relative group">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 py-2 transition-colors hover:text-[#e76f51] focus:outline-none ${
                    isDropdownActive
                      ? "font-semibold text-[#e76f51]"
                      : "font-normal text-gray-500"
                  }`}
                >
                  <span>Lainnya</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-3.5 text-gray-400 group-hover:text-[#e76f51] group-hover:rotate-180 transition-transform duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                <div
                  role="menu"
                  className="absolute right-0 top-full mt-1 w-48 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                >
                  <div className="py-1">
                    <Link
                      href="/history"
                      className={`block px-4 py-2 text-xs transition-colors hover:bg-gray-50 hover:text-[#e76f51] ${
                        isActive("/history")
                          ? "font-semibold text-[#e76f51] bg-blue-50/50"
                          : "font-normal text-gray-600"
                      }`}
                      role="menuitem"
                    >
                      Riwayat Pesanan
                    </Link>

                    <Link
                      href="/kritik-saran"
                      className={`block px-4 py-2 text-xs transition-colors hover:bg-gray-50 hover:text-[#e76f51] ${
                        isActive("/kritik-saran")
                          ? "font-semibold text-[#e76f51] bg-blue-50/50"
                          : "font-normal text-gray-600"
                      }`}
                      role="menuitem"
                    >
                      Kritik & Saran
                    </Link>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/auth/login"
                      className={`block px-4 py-2 text-xs transition-colors hover:bg-blue-50 ${
                        isActive("/auth/login")
                          ? "font-semibold text-[#e76f51]"
                          : "font-medium text-[#e76f51]"
                      }`}
                      role="menuitem"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <form className="flex items-center gap-2" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                placeholder="Search..."
                className="hidden sm:block w-36 lg:w-48 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e]"
              />
              <button
                type="submit"
                className="p-1.5 text-gray-600 hover:opacity-80 transition"
              >
                <Image
                  src="/assets/search.png"
                  alt="Search Icon"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </button>
            </form>

            <Link
              href="/shopping"
              className="p-1.5 text-gray-600 hover:opacity-80 transition"
            >
              <Image
                src="/assets/shopping-cart.png"
                alt="Shopping Cart Icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block p-1.5 text-gray-600 hover:opacity-80 transition md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              {isOpen ? (
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  isActive("/")
                    ? "bg-blue-50 font-semibold text-[#e76f51]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  isActive("/order")
                    ? "bg-blue-50 font-semibold text-[#e76f51]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Pesan
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  isActive("/about")
                    ? "bg-blue-50 font-semibold text-[#e76f51]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  isActive("/history")
                    ? "bg-blue-50 font-semibold text-[#e76f51]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Riwayat Pesanan
              </Link>
            </li>
            <li>
              <Link
                href="/kritik-saran"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  isActive("/kritik-saran")
                    ? "bg-blue-50 font-semibold text-[#e76f51]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Kritik & Saran
              </Link>
            </li>
            <li className="pt-2 border-t border-gray-100">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-lg bg-[#e76f51] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#2b2bad]"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}