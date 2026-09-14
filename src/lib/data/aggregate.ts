import type { OrderRow, StandRow, MenuRow } from "@/lib/data/types";

export interface ChartPeriod {
  labels: string[];
  values: number[];
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  period: string;
}

const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const rupiah = (n: number) =>
  "Rp " + Math.round(n).toLocaleString("id-ID");

const pctChange = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return ((curr - prev) / prev) * 100;
};

const fmtPct = (v: number) => `${v >= 0 ? "" : "-"}${Math.abs(v).toFixed(1)}%`;

const inRange = (d: Date, start: Date, end: Date) => d >= start && d < end;

export function buildRevenueCharts(orders: OrderRow[]): {
  "6m": ChartPeriod;
  "12m": ChartPeriod;
} {
  const now = new Date();
  const make = (months: number): ChartPeriod => {
    const labels: string[] = [];
    const values: number[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      labels.push(MONTHS_ID[start.getMonth()]);
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

export function buildStats(orders: OrderRow[], stands: StandRow[], menus: MenuRow[]): DashboardStat[] {
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

  return [
    {
      label: "Pendapatan Bulanan",
      value: rupiah(revThis),
      change: fmtPct(revChange),
      positive: revChange >= 0,
      period: "dari bulan lalu",
    },
    {
      label: "Pelanggan Aktif",
      value: activeCustomers.toLocaleString("id-ID"),
      change: "minggu ini",
      positive: true,
      period: `dari ${stands.filter((s) => s.status === "Buka").length} stand buka`,
    },
    {
      label: "Menu Habis",
      value: outOfStock.toString(),
      change: fmtPct(rejectRate),
      positive: rejectRate <= 5,
      period: "tingkat pembatalan pesanan",
    },
  ];
}

export function buildStandRevenue(orders: OrderRow[]) {
  const map = new Map<number, number>();
  for (const o of orders) {
    if (o.status === "Dibatalkan") continue;
    map.set(o.id_stand, (map.get(o.id_stand) ?? 0) + Number(o.total_harga));
  }
  return map;
}

export function buildReportCharts(orders: OrderRow[]): {
  "6m": { labels: string[]; pendapatan: number[]; pesanan: number[] };
  "12m": { labels: string[]; pendapatan: number[]; pesanan: number[] };
} {
  const now = new Date();
  const make = (months: number) => {
    const labels: string[] = [];
    const pendapatan: number[] = [];
    const pesanan: number[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const valid = orders.filter(
        (o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end)
      );
      labels.push(MONTHS_ID[start.getMonth()]);
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

export function buildOrderCharts(orders: OrderRow[]): OrderChartData {
  const now = new Date();
  const make = (months: number): OrderChartPeriod => {
    const labels: string[] = [];
    const pesanan: number[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      labels.push(MONTHS_ID[start.getMonth()]);
      pesanan.push(
        orders.filter(
          (o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end)
        ).length
      );
    }
    return { labels, pesanan };
  };
  const twelve = make(12);
  const avg = twelve.pesanan.reduce((s, v) => s + v, 0) / 12;
  const target = Math.max(5, Math.round(avg / 5) * 5);
  return { "6m": make(6), "12m": twelve, target };
}

export interface ReportData {
  summary: DashboardStat[];
  rows: {
    stand: string;
    pesanan: number;
    pendapatan: number;
    menuTerlaris: string;
    persentase: number;
  }[];
}

export function buildReport(orders: OrderRow[], stands: StandRow[]): ReportData {
  const valid = orders.filter((o) => o.status !== "Dibatalkan");
  const totalRevenue = valid.reduce((s, o) => s + Number(o.total_harga), 0);
  const avg = valid.length ? totalRevenue / valid.length : 0;
  const openStands = stands.filter((s) => s.status === "Buka").length;

  const perStand = stands.map((s) => {
    const so = valid.filter((o) => o.id_stand === s.id);
    const revenue = so.reduce((sum, o) => sum + Number(o.total_harga), 0);
    const byMenu = new Map<string, number>();
    for (const o of so) {
      if (!o.menu) continue;
      byMenu.set(o.menu.nama, (byMenu.get(o.menu.nama) ?? 0) + o.jumlah);
    }
    const best = [...byMenu.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      stand: s.nama_stand,
      pesanan: so.length,
      pendapatan: revenue,
      menuTerlaris: best?.[0] ?? "-",
      persentase: Math.round((totalRevenue ? (revenue / totalRevenue) * 100 : 0) * 10) / 10,
    };
  });

  return {
    summary: [
      { label: "Total Pendapatan", value: rupiah(totalRevenue), change: "0%", positive: true, period: "semua periode" },
      { label: "Total Pesanan", value: valid.length.toLocaleString("id-ID"), change: "0%", positive: true, period: "semua periode" },
      { label: "Rata-rata Pesanan", value: rupiah(avg), change: "0%", positive: true, period: "semua periode" },
      { label: "Stand Aktif", value: `${openStands} / ${stands.length}`, change: "0%", positive: true, period: "hari ini" },
    ],
    rows: perStand.sort((a, b) => b.pendapatan - a.pendapatan),
  };
}
