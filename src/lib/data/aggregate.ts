import type { OrderRow, StandRow, MenuRow } from "@/lib/data/types";

export interface ChartPeriod {
  labels: string[];
  values: number[];
}

export interface DashboardStat {
  label: string;
  value: string;
  positive: boolean;
  period: string;
}

export interface ReportStat {
  key: "revenue" | "orders" | "average" | "stands";
  value: string;
  change: string;
  positive: boolean;
}

const monthNames = (locale: string): string[] => {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), i, 1);
    return d.toLocaleString(locale === "en" ? "en-US" : "id-ID", { month: "short" });
  });
};

const rupiah = (n: number, locale: string) =>
  "Rp " + Math.round(n).toLocaleString(locale === "en" ? "en-US" : "id-ID");

const pctChange = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return ((curr - prev) / prev) * 100;
};

const inRange = (d: Date, start: Date, end: Date) => d >= start && d < end;

export function buildRevenueCharts(orders: OrderRow[], locale: string): {
  "6m": ChartPeriod;
  "12m": ChartPeriod;
} {
  const now = new Date();
  const months = monthNames(locale);
  const make = (monthsCount: number): ChartPeriod => {
    const labels: string[] = [];
    const values: number[] = [];
    for (let i = monthsCount - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      labels.push(months[start.getMonth()]);
      values.push(
        orders
          .filter((o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end))
          .reduce((sum, o) => sum + Number(o.total_harga), 0)
      );
    }
    return { labels, values };
  };
  return { "6m": make(6), "12m": make(12) };
}

export function buildStats(orders: OrderRow[], stands: StandRow[], menus: MenuRow[], locale: string): DashboardStat[] {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const weekStart = new Date(now.getTime() - 7 * 864e5);

  const revenue = (start: Date, end: Date) =>
    orders
      .filter((o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end))
      .reduce((s, o) => s + Number(o.total_harga), 0);

  const revThis = revenue(monthStart, now);
  const revPrev = revenue(prevMonthStart, monthStart);
  const revChange = pctChange(revThis, revPrev);

  const activeCustomers = new Set(
    orders.filter((o) => inRange(new Date(o.created_at), weekStart, now) && o.id_user).map((o) => o.id_user)
  ).size;

  const rejected = orders.filter((o) => o.status === "Dibatalkan").length;
  const rejectRate = orders.length ? (rejected / orders.length) * 100 : 0;

  const outOfStock = menus.filter((m) => !m.tersedia || m.stok <= 0).length;
  const openStands = stands.filter((s) => s.status === "Buka").length;

  const stats: DashboardStat[] = [
    {
      label: locale === "en" ? "Monthly Revenue" : "Pendapatan Bulanan",
      value: rupiah(revThis, locale),
      positive: revChange >= 0,
      period: locale === "en" ? "from last month" : "dari bulan lalu",
    },
    {
      label: locale === "en" ? "Active Customers" : "Pelanggan Aktif",
      value: activeCustomers.toLocaleString(locale === "en" ? "en-US" : "id-ID"),
      positive: true,
      period: locale === "en" ? `from ${openStands} open stands` : `dari ${openStands} stand buka`,
    },
    {
      label: locale === "en" ? "Out of Stock" : "Menu Habis",
      value: outOfStock.toString(),
      positive: rejectRate <= 5,
      period: locale === "en" ? "order cancellation rate" : "tingkat pembatalan pesanan",
    },
  ];

  return stats;
}

export function buildStandRevenue(orders: OrderRow[]) {
  const map = new Map<number, number>();
  for (const o of orders) {
    if (o.status === "Dibatalkan") continue;
    map.set(o.id_stand, (map.get(o.id_stand) ?? 0) + Number(o.total_harga));
  }
  return map;
}

export function buildReportCharts(orders: OrderRow[], locale: string): {
  "6m": { labels: string[]; pendapatan: number[]; pesanan: number[] };
  "12m": { labels: string[]; pendapatan: number[]; pesanan: number[] };
} {
  const now = new Date();
  const months = monthNames(locale);
  const make = (monthsCount: number) => {
    const labels: string[] = [];
    const pendapatan: number[] = [];
    const pesanan: number[] = [];
    for (let i = monthsCount - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const valid = orders.filter(
        (o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end)
      );
      labels.push(months[start.getMonth()]);
      pendapatan.push(valid.reduce((s, o) => s + Number(o.total_harga), 0));
      pesanan.push(valid.length);
    }
    return { labels, pendapatan, pesanan };
  };
  return { "6m": make(6), "12m": make(12) };
}

export interface OrderChartPeriod {
  labels: string[];
  pesanan: number[];
}

export interface OrderChartData {
  "6m": OrderChartPeriod;
  "12m": OrderChartPeriod;
  target: number;
}

export function buildOrderCharts(orders: OrderRow[], locale: string): OrderChartData {
  const now = new Date();
  const months = monthNames(locale);
  const validOrders = orders.filter((o) => o.status !== "Dibatalkan");
  const make = (monthsCount: number) => {
    const labels: string[] = [];
    const pesanan: number[] = [];
    for (let i = monthsCount - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const valid = validOrders.filter((o) => inRange(new Date(o.created_at), start, end));
      labels.push(months[start.getMonth()]);
      pesanan.push(valid.length);
    }
    return { labels, pesanan };
  };
  const range6m = make(6);
  const range12m = make(12);
  const target = Math.round(range12m.pesanan.reduce((sum, count) => sum + count, 0) / 12);

  return {
    "6m": range6m,
    "12m": range12m,
    target,
  };
}

export function buildReport(orders: OrderRow[], stands: StandRow[], locale: string) {
  const totalRevenue = orders
    .filter((o) => o.status !== "Dibatalkan")
    .reduce((s, o) => s + Number(o.total_harga), 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;
  const activeStands = new Set(orders.map((o) => o.id_stand)).size;

  return {
    summary: [
      {
        label: locale === "en" ? "Total Revenue" : "Total Pendapatan",
        value: rupiah(totalRevenue, locale),
        change: "",
        positive: true,
        period: locale === "en" ? "all period" : "semua periode",
      },
      {
        label: locale === "en" ? "Total Orders" : "Total Pesanan",
        value: totalOrders.toLocaleString(locale === "en" ? "en-US" : "id-ID"),
        change: "",
        positive: true,
        period: locale === "en" ? "all period" : "semua periode",
      },
      {
        label: locale === "en" ? "Average Order" : "Rata-rata Pesanan",
        value: rupiah(avgOrder, locale),
        change: "",
        positive: true,
        period: locale === "en" ? "average order" : "rata-rata pesanan",
      },
      {
        label: locale === "en" ? "Active Stands" : "Stand Aktif",
        value: activeStands.toString(),
        change: "",
        positive: true,
        period: locale === "en" ? "active stands" : "stand aktif",
      },
    ],
    rows: [],
  };
}