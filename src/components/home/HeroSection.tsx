"use client";

export default function HeroSection() {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("menu-populer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-20 flex items-center justify-center overflow-hidden">
      <div className="relative mx-auto flex max-w-6xl w-full flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="w-full text-center md:text-left md:w-8/12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            Pesan Menu <span className="italic text-[#e76f51]">Favoritmu.</span>
          </h1>

          <p className="mt-3 text-base italic text-gray-600">
            Makan nikmat tanpa antre, khusus siswa SMK Negeri 4 Malang.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 max-w-lg">
            <strong className="text-gray-900 font-semibold">Grafikantin</strong> menyediakan berbagai menu pilihan variatif dengan penyajian cepat. Rasa nikmat, suasana nyaman, dan pengalaman pesan makanan yang serba praktis.
          </p>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-end shrink-0">
          <a
            href="#menu-populer"
            onClick={handleScrollToMenu}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#e76f51] to-[#f4a261] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/25 transition-all duration-200 hover:opacity-90 hover:shadow-[#E76F51]/35 active:scale-[0.98]"
          >
            <span>Pesan Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
}