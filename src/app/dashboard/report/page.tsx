import { redirect } from "next/navigation";
import ReportSection from "@/components/dashboard/report/ReportSection";
import { getDashboardContext } from "@/lib/data/context";
import { fetchOrders, fetchStands } from "@/lib/data/queries";
import { buildReport, buildReportCharts } from "@/lib/data/aggregate";

export default async function DashboardReportPage() {
  const ctx = await getDashboardContext();
  if (!ctx) redirect("/auth/login");

  const [orders, stands] = await Promise.all([fetchOrders(ctx), fetchStands()]);
  const report = buildReport(orders, stands);
  const charts = buildReportCharts(orders);

  return (
    <div className="space-y-6">
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

      <ReportSection summary={report.summary} rows={report.rows} charts={charts} />
    </div>
  );
}
