export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-15 flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-6xl w-full flex-col items-center justify-between gap-12 px-6 md:flex-row">
        <div className="w-full text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Pesan Menu <span className="italic text-[#e76f51]">Favoritmu.</span>
          </h1>

          <p className="mt-4 text-base italic text-gray-600">
            Makan nikmat tanpa antre, khusus siswa SMK Negeri 4 Malang.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-lg">
            <strong className="text-gray-900 font-semibold">Grafikantin</strong> menyediakan berbagai menu pilihan variatif dengan penyajian cepat. Rasa nikmat, suasana nyaman, dan pengalaman pesan makanan yang serba praktis.
          </p>

          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href="/order"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#e76f51] to-[#f4a261] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/25 transition-all duration-200 hover:opacity-90 hover:shadow-[#E76F51]/35 active:scale-[0.98]"
            >
              <span>Pesan Sekarang</span>
            </a>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 justify-end items-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            <div className="absolute inset-4 rounded-full bg-[#e76f51]" />

            <div className="absolute -top-2 -right-2 h-24 w-24 rounded-tr-3xl rounded-bl-3xl bg-[#f4a261]" />

            <div className="absolute -bottom-3 left-6 h-16 w-3/4 rounded-full bg-[#f8e1d4]" />

            <div className="absolute -bottom-4 right-0 h-28 w-16 rounded-tl-full rounded-tr-3xl bg-[#2a9d8f]" />

            <div className="absolute -left-4 top-10 h-10 w-10 rounded-full bg-[#f4a261]" />
            <div className="absolute left-2 bottom-12 h-14 w-14 rounded-full bg-[#2a9d8f]" />

            <img
              src="../assets/mie.png"
              alt="Menu Utama Grafikantin"
              className="relative z-10 w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}