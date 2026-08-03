export default function ComplaintBanner() {
  return (
    <div className="mx-auto px-4 max-w-[85vw]">
      <div className="relative overflow-hidden rounded-3xl bg-[#3333cc] p-8 text-white shadow-lg md:p-12">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="w-full text-center md:w-3/4 md:text-left">
            <h3 className="text-3xl font-extrabold tracking-tight leading-tight mb-3 md:text-[40px]">
              Keluhan Siswa
            </h3>
            <p className="text-indigo-100 text-base leading-relaxed md:text-lg">
              Suara Siswa sangat berarti bagi sekolah. Sampaikan kritik dan
              saran Anda untuk membantu Grafikantin memberikan pelayanan yang
              lebih baik lagi.
            </p>
          </div>

          <div className="w-full text-center md:w-auto md:text-right shrink-0">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-[#3333cc] shadow-md transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
            >
              <span>Klik Di Sini</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}