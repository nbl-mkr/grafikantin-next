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
];