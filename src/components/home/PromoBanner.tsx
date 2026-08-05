export default function PromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#e76f51] py-8 text-white">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative mx-auto flex max-w-[75vw] flex-col items-center justify-between gap-6 p-12 md:flex-row">
        <div className="w-full text-center md:w-auto md:text-left">
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-tight">
            AMBIL <br className="hidden sm:block" />
            <span className="italic text-indigo-100">DI KANTIN</span>
          </h2>
        </div>

        <div className="w-full text-center md:w-auto md:text-left">
          <p className="text-[24px] md:text-[30px] italic leading-snug">
            Pesan, Tanpa Antre. <br className="hidden sm:block" />
            Siap Dalam 15 Menit!
          </p>
        </div>

        <div className="w-full text-center md:w-auto md:text-right">
          <a
            href="/order"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-[16px] font-semibold text-[#f97316] shadow-sm transition-all duration-200 hover:bg-gray-100 active:scale-[0.98]"
          >
            <span>Pesan Di Sini</span>
          </a>
        </div>
      </div>
    </section>
  );
}