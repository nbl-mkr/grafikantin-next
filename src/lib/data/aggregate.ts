import type { OrderRow, StandRow, MenuRow } from "@/lib/data/types";

export interface ChartPeriod {
  labels: string[];
  values: number[];
}

export type ChartTimeframe = "daily" | "weekly" | "monthly";
export type ChartMonthRange = "6m" | "12m";

export interface ChartRanges<T> {
  daily: T;
  weekly: T;
  monthly: Record<ChartMonthRange, T>;
}

interface TimeBucket {
  start: Date;
  end: Date;
  label: string;
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

const formatShortDate = (date: Date, locale: string) =>
  date.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "short",
  });

function makeDailyBuckets(now: Date, locale: string): TimeBucket[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Array.from({ length: 7 }, (_, index) => {
    const start = new Date(today);
    start.setDate(today.getDate() - (6 - index));
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return { start, end, label: formatShortDate(start, locale) };
  });
}

function makeWeeklyBuckets(now: Date, locale: string): TimeBucket[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oldest = new Date(today);
  oldest.setDate(today.getDate() - 27);

  return Array.from({ length: 4 }, (_, index) => {
    const start = new Date(oldest);
    start.setDate(oldest.getDate() + index * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const lastDay = new Date(end);
    lastDay.setDate(end.getDate() - 1);
    return {
      start,
      end,
      label: `${formatShortDate(start, locale)} - ${formatShortDate(lastDay, locale)}`,
    };
  });
}

function makeMonthlyBuckets(now: Date, locale: string, monthsCount: number): TimeBucket[] {
  const months = monthNames(locale);
  return Array.from({ length: monthsCount }, (_, index) => {
    const monthOffset = monthsCount - index - 1;
    const start = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - monthOffset + 1, 1);
    return { start, end, label: months[start.getMonth()] };
  });
}

function groupOrdersByBucket(orders: OrderRow[], buckets: TimeBucket[]): OrderRow[][] {
  return buckets.map(({ start, end }) =>
    orders.filter((order) => inRange(new Date(order.created_at), start, end))
  );
}

export function buildRevenueCharts(orders: OrderRow[], locale: string): ChartRanges<ChartPeriod> {
  const now = new Date();
  const validOrders = orders.filter((order) => order.status !== "Dibatalkan");
  const make = (buckets: TimeBucket[]): ChartPeriod => ({
    labels: buckets.map((bucket) => bucket.label),
    values: groupOrdersByBucket(validOrders, buckets).map((bucketOrders) =>
      bucketOrders.reduce((sum, order) => sum + Number(order.total_harga), 0)
    ),
  });

  return {
    daily: make(makeDailyBuckets(now, locale)),
    weekly: make(makeWeeklyBuckets(now, locale)),
    monthly: {
      "6m": make(makeMonthlyBuckets(now, locale, 6)),
      "12m": make(makeMonthlyBuckets(now, locale, 12)),
    },
  };
}

export function buildStats(orders: OrderRow[], stands: StandRow[], menus: MenuRow[], locale: string): DashboardStat[] {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const revenue = (start: Date, end: Date) =>
    orders
      .filter((o) => o.status !== "Dibatalkan" && inRange(new Date(o.created_at), start, end))
      .reduce((s, o) => s + Number(o.total_harga), 0);

  const revThis = revenue(monthStart, now);
  const revPrev = revenue(prevMonthStart, monthStart);
  const revChange = pctChange(revThis, revPrev);

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
      label: locale === "en" ? "Active Stands" : "Stand Aktif",
      value: openStands.toLocaleString(locale === "en" ? "en-US" : "id-ID"),
      positive: true,
      period: locale === "en" ? `of ${stands.length} stands` : `dari ${stands.length} stand`,
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

export function buildStandRevenue(orders: { id_stand: number; total_harga: number }[]) {
  const map = new Map<number, number>();
  for (const o of orders) {
    map.set(o.id_stand, (map.get(o.id_stand) ?? 0) + Number(o.total_harga));
  }
  return map;
}

export interface ReportChartPeriod {
  labels: string[];
  pendapatan: number[];
  pesanan: number[];
}

export function buildReportCharts(orders: OrderRow[], locale: string): ChartRanges<ReportChartPeriod> {
  const now = new Date();
  const validOrders = orders.filter((order) => order.status !== "Dibatalkan");
  const make = (buckets: TimeBucket[]): ReportChartPeriod => {
    const groupedOrders = groupOrdersByBucket(validOrders, buckets);
    return {
      labels: buckets.map((bucket) => bucket.label),
      pendapatan: groupedOrders.map((bucketOrders) =>
        bucketOrders.reduce((sum, order) => sum + Number(order.total_harga), 0)
      ),
      pesanan: groupedOrders.map((bucketOrders) => bucketOrders.length),
    };
  };

  return {
    daily: make(makeDailyBuckets(now, locale)),
    weekly: make(makeWeeklyBuckets(now, locale)),
    monthly: {
      "6m": make(makeMonthlyBuckets(now, locale, 6)),
      "12m": make(makeMonthlyBuckets(now, locale, 12)),
    },
  };
}

export interface OrderChartPeriod {
  labels: string[];
  pesanan: number[];
}

export interface OrderChartData extends ChartRanges<OrderChartPeriod> {
  target: number;
}

export function buildOrderCharts(orders: OrderRow[], locale: string): OrderChartData {
  const now = new Date();
  const validOrders = orders.filter((o) => o.status !== "Dibatalkan");
  const make = (buckets: TimeBucket[]): OrderChartPeriod => ({
    labels: buckets.map((bucket) => bucket.label),
    pesanan: groupOrdersByBucket(validOrders, buckets).map((bucketOrders) => bucketOrders.length),
  });
  const monthly6m = make(makeMonthlyBuckets(now, locale, 6));
  const monthly12m = make(makeMonthlyBuckets(now, locale, 12));
  const target = Math.round(monthly12m.pesanan.reduce((sum, count) => sum + count, 0) / 12);

  return {
    daily: make(makeDailyBuckets(now, locale)),
    weekly: make(makeWeeklyBuckets(now, locale)),
    monthly: {
      "6m": monthly6m,
      "12m": monthly12m,
    },
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
        period: locale === "en" ? "last 12 months" : "12 bulan terakhir",
      },
      {
        label: locale === "en" ? "Total Orders" : "Total Pesanan",
        value: totalOrders.toLocaleString(locale === "en" ? "en-US" : "id-ID"),
        change: "",
        positive: true,
        period: locale === "en" ? "last 12 months" : "12 bulan terakhir",
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