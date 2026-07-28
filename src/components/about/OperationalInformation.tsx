export default function OperationalInformation() {
    return (
        <div className="bg-slate-50 py-12 text-gray-900">
        <div className="mx-auto flex max-w-[85vw] flex-col justify-between gap-8 md:flex-row">

            <div className="w-full text-left md:w-5/12">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Informasi Operasional
                </h3>

                <div className="mb-6 border-l-[3px] border-[#3333cc] pl-4">
                    <h6 className="font-bold text-gray-900">
                        Lokasi Fisik
                    </h6>
                    <p className="mt-1 text-sm text-gray-500">
                        Kantin SMK Negeri 4 Malang, Area Timur (Dekat Gerbang Samping)
                    </p>
                </div>

                <div className="border-l-[3px] border-[#3333cc] pl-4">
                    <h6 className="font-bold text-gray-900">
                        Hari & Jam Layanan
                    </h6>
                    <p className="mt-1 text-sm text-gray-500">
                        Senin - Jumat | 09.20 - 13.00 WIB
                    </p>
                </div>
            </div>

            <div className="w-full text-left md:w-5/12">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Hubungi Kami
                </h3>

                <div className="mb-6 border-l-[3px] border-[#3333cc] pl-4">
                    <h6 className="font-bold text-gray-900">
                        WhatsApp Layanan
                    </h6>
                    <p className="mt-1 text-sm text-gray-500">
                        <a href="https://wa.me/62341000000" target="_blank"
                            className="text-[#3333cc] transition-colors duration-200 hover:text-[#2b2bad] hover:underline">
                            (0341) 000000
                        </a>
                    </p>
                </div>

                <div className="border-l-[3px] border-[#3333cc] pl-4">
                    <h6 className="font-bold text-gray-900">
                        Email Resmi
                    </h6>
                    <p className="mt-1 text-sm text-gray-500">
                        <a href="mailto:kantin@smkn4malang.sch.id"
                            className="text-[#3333cc] transition-colors duration-200 hover:text-[#2b2bad] hover:underline">
                            kantin@smkn4malang.sch.id
                        </a>
                    </p>
                </div>
            </div>

        </div>
    </div>
    );
}