import TabNav from "@/components/admin/TabNav";
import ReportSection from "@/components/admin/report/ReportSection";

export default function AdminReportPage() {
  return (
    <div className="space-y-6">
      <TabNav />

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan</h1>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d55f43]"
        >
          Ekspor Laporan
        </button>
      </div>

      <ReportSection />
    </div>
  );
}
