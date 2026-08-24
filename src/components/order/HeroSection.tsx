"use client";

export default function HeroSection() {
  const handleScrollToCards = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("cards");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-20 overflow-hidden">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="w-full text-center md:text-left md:w-8/12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            Mau Makan Apa <span className="italic text-[#e76f51]">Hari Ini?</span>
          </h1>

          <p className="mt-3 text-base italic text-gray-600">
            Cari stand dan makanan favoritmu di Grafikantin.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              Penyajian Cepat
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              Bebas Antre
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#e76f51]"></span>
              Menu Variatif
            </span>
          </div>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-start">
          <a
            href="#cards"
            onClick={handleScrollToCards}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e76f51] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E76F51]/25 transition-all duration-200 hover:opacity-95 hover:shadow-[#E76F51]/35 active:scale-[0.98]"
          >
            <span>Pesan Di Sini</span>
          </a>
        </div>
      </div>
    </section>
  );
}