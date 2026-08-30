"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-50">
      <div className="relative flex h-1/2 w-full flex-col justify-between p-6 sm:p-8 lg:h-full lg:w-1/2 lg:p-12 text-white overflow-hidden">
        <Image
          src="/assets/menu.jpg"
          alt="Menu Grafikantin"
          fill
          priority
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10">
          <Link href="/" className="inline-block text-xl sm:text-2xl font-bold tracking-tight text-white">
            Grafikantin
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Pesan Kantin Lebih Cepat & Praktis
          </h2>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed">
            Sistem pemesanan makanan digital resmi untuk warga SMK Negeri 4 Malang. Nikmati kemudahan memesan tanpa antri.
          </p>
        </div>

        <div className="relative z-10" />
      </div>

      <div className="relative flex h-1/2 w-full flex-col justify-center items-center p-4 sm:p-8 lg:h-full lg:w-1/2 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
              Masuk ke akun Grafikantin kamu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
            <div className="space-y-1 sm:space-y-1.5">
              <label htmlFor="username" className="block text-xs sm:text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="25604021130411"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 sm:pr-11 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e] shadow-sm transition"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-3.5 text-gray-400">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-10 sm:pr-11 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-[#62748e] focus:outline-none focus:ring-1 focus:ring-[#62748e] shadow-sm transition"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-3.5 text-gray-400">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => window.location.href = "/"}
              className="w-full rounded-xl bg-[#e76f51] py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#d55f43] shadow-sm"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}