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
    label: "Pendapatan Hari Ini",
    value: "Rp 1.250.000",
    change: "+12.5%",
    positive: true,
    period: "Hari Ini",
  },
  {
    label: "Total Pesanan",
    value: "86",
    change: "+8.2%",
    positive: true,
    period: "Hari Ini",
  },
  {
    label: "Menu Terjual",
    value: "142 Porsi",
    change: "-3.1%",
    positive: false,
    period: "Hari Ini",
  },
  {
    label: "Stand Aktif",
    value: "6 Stand",
    change: "Semua buka",
    positive: true,
    period: "Saat Ini",
  },
];

export const lineChartData: SalesData[] = [
  { day: "Sen", amount: 450000 },
  { day: "Sel", amount: 620000 },
  { day: "Rab", amount: 580000 },
  { day: "Kam", amount: 890000 },
  { day: "Jum", amount: 1240000 },
  { day: "Sab", amount: 950000 },
  { day: "Min", amount: 720000 },
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
    id: "ORD-001",
    customer: "Ahmad Rizky",
    menu: "Teriyaki Chicken Rice Bowl",
    stand: "Stand Melati",
    total: 8000,
    status: "Selesai",
    time: "10:23",
  },
  {
    id: "ORD-002",
    customer: "Dewi Lestari",
    menu: "Katsu Chicken Rice Bowl",
    stand: "Stand Melati",
    total: 10000,
    status: "Diproses",
    time: "10:45",
  },
  {
    id: "ORD-003",
    customer: "Budi Santoso",
    menu: "Mie Pangsit",
    stand: "Stand Cempaka",
    total: 10000,
    status: "Menunggu",
    time: "11:02",
  },
  {
    id: "ORD-004",
    customer: "Siti Aminah",
    menu: "Roti Bakar",
    stand: "Stand Kenanga",
    total: 5000,
    status: "Selesai",
    time: "11:15",
  },
  {
    id: "ORD-005",
    customer: "Rudi Hartono",
    menu: "Pangsit Rebus",
    stand: "Stand Anggrek",
    total: 5000,
    status: "Diproses",
    time: "11:30",
  },
];

export const topMenus: TopMenu[] = [
  {
    id: 1,
    nama_menu: "Teriyaki Chicken Rice Bowl",
    stand: "Stand Melati",
    terjual: 142,
    gambar: "/assets/teriyaki-chicken.jpg",
  },
  {
    id: 2,
    nama_menu: "Katsu Chicken Rice Bowl",
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
];

export const standStatuses: StandStatus[] = [
  { id: 1, nama_stand: "Stand Melati", status: "Buka", terjual: 142 },
  { id: 2, nama_stand: "Stand Cempaka", status: "Buka", terjual: 96 },
  { id: 3, nama_stand: "Stand Kenanga", status: "Buka", terjual: 84 },
  { id: 4, nama_stand: "Stand Anggrek", status: "Buka", terjual: 72 },
  { id: 5, nama_stand: "Stand Mawar", status: "Buka", terjual: 64 },
  { id: 6, nama_stand: "Stand Dahlia", status: "Buka", terjual: 58 },
];