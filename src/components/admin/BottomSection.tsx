import { Order } from "@/data/adminMockData";

interface BottomSectionProps {
  menus?: { name: string; sales: number }[];
  stands?: { name: string; status: string; statusColor: string }[];
  recentOrders?: Order[];
}

const statusStyles: Record<string, string> = {
  Selesai: "bg-emerald-50 text-emerald-600",
  Diproses: "bg-blue-50 text-blue-600",
  Menunggu: "bg-amber-50 text-amber-600",
  Batal: "bg-red-50 text-red-600",
};

export default function BottomSection({ recentOrders = [] }: BottomSectionProps) {
  const displayOrders = recentOrders.length > 0 ? recentOrders : [
    { id: "#3921", customer: "Ahmadinezka Evan", time: "12 Jun 2025", total: 412000, status: "Selesai" },
    { id: "#3920", customer: "Akhmad Daqiqul", time: "11 Jun 2025", total: 128500, status: "Diproses" },
    { id: "#3919", customer: "Devin Adinata", time: "10 Jun 2025", total: 894200, status: "Selesai" },
    { id: "#3918", customer: "Rizky Zidane", time: "09 Jun 2025", total: 56000, status: "Batal" },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-gray-900">Pesanan Terbaru</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead>
            <tr className="text-left font-medium text-gray-500">
              <th className="px-4 py-3 whitespace-nowrap">ID Pesanan</th>
              <th className="px-4 py-3 whitespace-nowrap">Pelanggan</th>
              <th className="px-4 py-3 whitespace-nowrap">Tanggal</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {displayOrders.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {item.customer}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {item.time}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      statusStyles[item.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                  Rp {item.total.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}