export default function PromoBanner() {
    return (
        <div className="w-full bg-[rgb(51,51,204)] text-white py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mx-auto p-12 max-w-[75vw] gap-6">

            <div className="w-full md:w-auto text-center md:text-left">
                <h1 className="text-[48px] font-bold leading-tight">
                    AMBIL <br className="hidden sm:block" />DI KANTIN
                </h1>
            </div>

            <div className="w-full md:w-auto text-center md:text-left">
                <h2 className="text-[30px] font-medium leading-snug">
                    Pesan, Tanpa Antri <br className="hidden sm:block" />Siap Dalam 15 Menit
                </h2>
            </div>

            <div className="w-full md:w-auto text-center md:text-right">
                <a href="/order"
                    className="inline-block bg-white text-[rgb(51,51,204)] hover:bg-gray-100 text-[16px] font-bold px-6 py-2.5 rounded-lg transition shadow-sm">
                    Pesan Di Sini
                </a>
            </div>

        </div>
    </div>
    );
}