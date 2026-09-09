"use client";

import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  onMenuClick: () => void;
}

export default function Header({ title = "Dashboard", onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="w-full flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Buka menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 lg:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <form className="flex items-center gap-2" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search..."
              className="hidden sm:block w-36 lg:w-48 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e]"
            />
            <button type="submit" className="p-1.5 text-gray-600 hover:opacity-80 transition">
              <Image src="/assets/search.png" alt="Search Icon" width={16} height={16} className="w-4 h-4" />
            </button>
          </form>

          <Link href="/shopping" className="p-1.5 text-gray-600 hover:opacity-80 transition">
            <Image src="/assets/shopping-cart.png" alt="Shopping Cart Icon" width={16} height={16} className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
