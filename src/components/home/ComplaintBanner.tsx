export default function ComplaintBanner() {
    return (
        <div className="mx-auto px-4 max-w-[85vw]">
        <div className="bg-[rgb(51,51,204)] text-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-3/4 text-center md:text-left">
              <h3 className="text-3xl md:text-[40px] font-bold leading-tight mb-3">
                Keluhan Siswa
              </h3>
              <p className="text-gray-100 text-base md:text-lg leading-relaxed">
                Suara Siswa sangat berarti bagi sekolah. Sampaikan kritik dan
                saran Anda untuk membantu Grafikantin memberikan pelayanan yang
                lebih baik lagi.
              </p>
            </div>

            <div className="w-full md:w-1/4 text-center md:text-right shrink-0">
              <a
                href="#"
                className="inline-block bg-white text-gray-900 hover:bg-gray-100 text-base font-bold px-6 py-2.5 rounded-xl transition shadow"
              >
                Klik Di Sini
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}