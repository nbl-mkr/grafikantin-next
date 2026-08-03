export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#fafafa] py-16 md:py-24 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 md:flex-row">
        <div className="w-full text-left md:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Pesan Menu <span className="italic text-[#3333cc]">Favoritmu.</span>
          </h1>

          <p className="mt-4 text-base italic text-gray-600">
            Makan nikmat tanpa antre, khusus siswa SMK Negeri 4 Malang.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-lg">
            <strong className="text-gray-900 font-semibold">Grafikantin</strong> menyediakan berbagai menu pilihan variatif dengan penyajian cepat. Rasa nikmat, suasana nyaman, dan pengalaman pesan makanan yang serba praktis.
          </p>

          <div className="mt-8">
            <a
              href="/order"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3333cc] to-[#4d4dff] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:opacity-95 hover:shadow-indigo-500/35 active:scale-[0.98]"
            >
              <span>Pesan Sekarang</span>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
                src="../assets/mie.png"
                alt="Menu Utama Grafikantin"
                className="w-full max-w-md h-auto object-contain"
            />
        </div>
      </div>
    </section>
  );
}