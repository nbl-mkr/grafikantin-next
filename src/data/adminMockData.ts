export interface Order {
  id: string;
  customer: string;
  menu: string;
  stand: string;
  total: number;
  status: "Selesai" | "Diproses" | "Menunggu";
  time: string;
}

export interface TopMenu {
  id: number;
  nama_menu: string;
  stand: string;
  terjual: number;
  gambar: string;
}

export interface SalesData {
  day: string;
  amount: number;
}

export interface StandStatus {
  id: number;
  nama_stand: string;
  status: "Buka" | "Tutup";
  terjual: number;
}

export const adminStats = [
  {
    label: "Pendapatan Bulanan",
    value: "Rp 18.000.000",
    change: "12.5%",
    positive: true,
    period: "dari bulan lalu",
  },
  {
    label: "Pelanggan Aktif",
    value: "1.000",
    change: "5%",
    positive: true,
    period: "dari minggu lalu",
  },
  {
    label: "Tingkat Penolakan Stok",
    value: "0.8%",
    change: "0.5%",
    positive: true,
    period: "dari bulan lalu",
  },
];

export const revenueRangesByPeriod = {
  "6m": {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    values: [1000000, 1250000, 1100000, 1750000, 1900000, 2250000],
  },
  "12m": {
    labels: [
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
    ],
    values: [
      600000, 750000, 850000, 1200000, 1150000, 1400000, 1000000, 1250000,
      1100000, 1750000, 1900000, 2250000,
    ],
  },
};

export const lineChartData: SalesData[] = [
  { day: "Jan", amount: 1000000 },
  { day: "Feb", amount: 1250000 },
  { day: "Mar", amount: 1100000 },
  { day: "Apr", amount: 1750000 },
  { day: "Mei", amount: 1950000 },
  { day: "Jun", amount: 2250000 },
];

export const barChartData: SalesData[] = [
  { day: "Melati", amount: 450000 },
  { day: "Cempaka", amount: 320000 },
  { day: "Kenanga", amount: 280000 },
  { day: "Anggrek", amount: 190000 },
  { day: "Mawar", amount: 150000 },
  { day: "Dahlia", amount: 120000 },
];

export const recentOrders: Order[] = [
  {
    id: "GRF-001",
    customer: "Ahmadinezka Evan",
    menu: "Teriyaki Chicken",
    stand: "Stand Melati",
    total: 15000,
    status: "Selesai",
    time: "10:23",
  },
  {
    id: "GRF-002",
    customer: "Akhmad Daqiqul",
    menu: "Katsu Chicken",
    stand: "Stand Cempaka",
    total: 20000,
    status: "Diproses",
    time: "10:45",
  },
  {
    id: "GRF-003",
    customer: "Devin Adinata",
    menu: "Mie Pangsit",
    stand: "Stand Kenanga",
    total: 50000,
    status: "Selesai",
    time: "11:02",
  },
  {
    id: "GRF-004",
    customer: "Rizky Zidane",
    menu: "Roti Bakar",
    stand: "Stand Anggrek",
    total: 25000,
    status: "Menunggu",
    time: "11:15",
  },
];

export const topMenus: TopMenu[] = [
  {
    id: 1,
    nama_menu: "Teriyaki Chicken",
    stand: "Stand Melati",
    terjual: 142,
    gambar: "/assets/teriyaki-chicken.jpg",
  },
  {
    id: 2,
    nama_menu: "Katsu Chicken",
    stand: "Stand Melati",
    terjual: 128,
    gambar: "/assets/katsu-chicken.jpg",
  },
  {
    id: 3,
    nama_menu: "Mie Pangsit",
    stand: "Stand Cempaka",
    terjual: 96,
    gambar: "/assets/mie-pangsit.jpg",
  },
  {
    id: 4,
    nama_menu: "Roti Bakar",
    stand: "Stand Kenanga",
    terjual: 84,
    gambar: "/assets/roti-bakar.jpg",
  },
  {
    id: 5,
    nama_menu: "Pangsit Rebus",
    stand: "Stand Anggrek",
    terjual: 72,
    gambar: "/assets/pangsit-rebus.jpg",
  },
  {
    id: 6,
    nama_menu: "Lumpia Pastel",
    stand: "Stand Mawar",
    terjual: 65,
    gambar: "/assets/lumpia-pastel.jpg",
  },
];

export const standStatuses: StandStatus[] = [
  { id: 1, nama_stand: "Stand Melati", status: "Buka", terjual: 142 },
  { id: 2, nama_stand: "Stand Cempaka", status: "Buka", terjual: 96 },
  { id: 3, nama_stand: "Stand Kenanga", status: "Buka", terjual: 84 },
  { id: 4, nama_stand: "Stand Anggrek", status: "Buka", terjual: 72 },
  { id: 5, nama_stand: "Stand Mawar", status: "Buka", terjual: 64 },
  { id: 6, nama_stand: "Stand Dahlia", status: "Buka", terjual: 58 },
];

export interface OrderTargetData {
  month: string;
  orders: number;
  target: number;
}

export const orderTargetData: OrderTargetData[] = [
  { month: "Jan", orders: 210, target: 230 },
  { month: "Feb", orders: 245, target: 230 },
  { month: "Mar", orders: 228, target: 230 },
  { month: "Apr", orders: 268, target: 260 },
  { month: "Mei", orders: 289, target: 260 },
  { month: "Jun", orders: 312, target: 260 },
  { month: "Jul", orders: 275, target: 290 },
  { month: "Agu", orders: 305, target: 290 },
  { month: "Sep", orders: 320, target: 290 },
  { month: "Okt", orders: 340, target: 320 },
  { month: "Nov", orders: 315, target: 320 },
  { month: "Des", orders: 365, target: 320 },
];

export interface Stand {
  id: number;
  nama: string;
  pemilik: string;
  telepon: string;
  status: "Buka" | "Tutup";
  totalMenu: number;
  pendapatan: number;
}

export const standsData: Stand[] = [
  { id: 1, nama: "Stand Melati", pemilik: "Sari Dewi", telepon: "08112345001", status: "Buka", totalMenu: 12, pendapatan: 4800000 },
  { id: 2, nama: "Stand Cempaka", pemilik: "Budi Santoso", telepon: "08112345002", status: "Buka", totalMenu: 8, pendapatan: 3200000 },
  { id: 3, nama: "Stand Kenanga", pemilik: "Rina Wati", telepon: "08112345003", status: "Tutup", totalMenu: 10, pendapatan: 2750000 },
  { id: 4, nama: "Stand Anggrek", pemilik: "Dani Prasetyo", telepon: "08112345004", status: "Buka", totalMenu: 7, pendapatan: 1900000 },
  { id: 5, nama: "Stand Mawar", pemilik: "Fitri Lestari", telepon: "08112345005", status: "Buka", totalMenu: 9, pendapatan: 1500000 },
  { id: 6, nama: "Stand Dahlia", pemilik: "Agus Suryadi", telepon: "08112345006", status: "Tutup", totalMenu: 6, pendapatan: 1200000 },
];

export interface Menu {
  id: number;
  nama: string;
  stand: string;
  kategori: "Makanan" | "Minuman" | "Snack";
  harga: number;
  stok: number;
  terjual: number;
  tersedia: boolean;
}

export const menusData: Menu[] = [
  { id: 1, nama: "Teriyaki Chicken", stand: "Stand Melati", kategori: "Makanan", harga: 15000, stok: 50, terjual: 142, tersedia: true },
  { id: 2, nama: "Katsu Chicken", stand: "Stand Melati", kategori: "Makanan", harga: 20000, stok: 30, terjual: 128, tersedia: true },
  { id: 3, nama: "Mie Pangsit", stand: "Stand Cempaka", kategori: "Makanan", harga: 12000, stok: 40, terjual: 96, tersedia: true },
  { id: 4, nama: "Roti Bakar", stand: "Stand Kenanga", kategori: "Snack", harga: 8000, stok: 60, terjual: 84, tersedia: false },
  { id: 5, nama: "Pangsit Rebus", stand: "Stand Anggrek", kategori: "Makanan", harga: 10000, stok: 35, terjual: 72, tersedia: true },
  { id: 6, nama: "Lumpia Pastel", stand: "Stand Mawar", kategori: "Snack", harga: 5000, stok: 80, terjual: 65, tersedia: true },
  { id: 7, nama: "Es Teh Manis", stand: "Stand Dahlia", kategori: "Minuman", harga: 5000, stok: 100, terjual: 58, tersedia: false },
  { id: 8, nama: "Jus Alpukat", stand: "Stand Melati", kategori: "Minuman", harga: 12000, stok: 25, terjual: 47, tersedia: true },
];

export interface ReportSummary {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  period: string;
}

export const reportSummary: ReportSummary[] = [
  { label: "Total Pendapatan", value: "Rp 15.350.000", change: "12.5%", positive: true, period: "dari bulan lalu" },
  { label: "Total Pesanan", value: "1.852", change: "8.3%", positive: true, period: "dari bulan lalu" },
  { label: "Rata-rata Pesanan", value: "Rp 8.287", change: "3.1%", positive: false, period: "dari bulan lalu" },
  { label: "Stand Aktif", value: "4 / 6", change: "0%", positive: true, period: "tidak berubah" },
];

export interface ReportRow {
  stand: string;
  pesanan: number;
  pendapatan: number;
  menuTerlaris: string;
  persentase: number;
}

export const reportRows: ReportRow[] = [
  { stand: "Stand Melati", pesanan: 642, pendapatan: 4800000, menuTerlaris: "Teriyaki Chicken", persentase: 34.6 },
  { stand: "Stand Cempaka", pesanan: 412, pendapatan: 3200000, menuTerlaris: "Mie Pangsit", persentase: 22.3 },
  { stand: "Stand Kenanga", pesanan: 356, pendapatan: 2750000, menuTerlaris: "Roti Bakar", persentase: 19.2 },
  { stand: "Stand Anggrek", pesanan: 248, pendapatan: 1900000, menuTerlaris: "Pangsit Rebus", persentase: 13.4 },
  { stand: "Stand Mawar", pesanan: 194, pendapatan: 1500000, menuTerlaris: "Lumpia Pastel", persentase: 10.5 },
];