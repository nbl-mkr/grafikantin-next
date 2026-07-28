export default function HeroSection() {
    return (
        <div className="w-full bg-[#f8fafc] text-center py-12">
            <div className="flex flex-col md:flex-row items-center justify-between mx-auto px-4 max-w-[85vw] gap-8">

                <div className="w-full md:w-1/2 text-left">
                    <h1 className="font-bold text-gray-900 text-[40px] leading-tight">PESAN MENU FAVORITMU</h1>
                    <h2 className="text-[30px] mb-0 text-gray-800 leading-snug">DI GRAFIKANTIN</h2>
                    <p className="text-gray-500 mt-4">
                        Grafikantin, bagian dari SMK Negeri 4 Malang, Menyediakan berbagai menu pilihan yang variatif.
                        Menyajikan rasa nikmat dan suasana nyaman bagi siswa.
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img src="../assets/mie.png" alt="Menu Image" className="w-full max-w-125 h-auto object-contain" />
                </div>

            </div>
        </div>
    );
}