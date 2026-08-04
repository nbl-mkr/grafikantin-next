export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#fafafa] py-14 md:py-20 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:gap-12 px-6 md:flex-row md:items-stretch">
        <div className="w-full text-center md:text-left md:w-8/12 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                Lebih Dekat Dengan <span className="italic text-[#3333cc]">Grafikantin</span>
            </h1>

            <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Komitmen kami dalam menghadirkan pilihan kuliner yang sehat, bersih, dan higienis untuk mendukung energi dan produktivitas belajar seluruh warga SMK Negeri 4 Malang.
            </p>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch my-2" />

        <div className="w-full text-center md:text-left md:w-3/12 flex flex-col justify-center whitespace-nowrap">
            <span className="block text-3xl font-extrabold text-gray-900 sm:text-4xl">
                SMKN 4
            </span>
            <span className="text-sm sm:text-base font-semibold text-[#3333cc]">
                Kantin Sehat & Digital
            </span>
        </div>
      </div>
    </section>
  );
}