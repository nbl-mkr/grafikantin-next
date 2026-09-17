import type { Role } from "@/lib/roles";

export interface DbUser {
  username: string | null;
}

export interface DbStandRef {
  id: number;
  nama_stand: string;
}

export interface DbMenuRef {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  gambar: string | null;
  stand: DbStandRef | null;
}

export interface OrderRow {
  id: number;
  kode_transaksi: string;
  id_user: string | null;
  id_stand: number;
  total_harga: number;
  metode_pembayaran: string | null;
  status: "Menunggu" | "Diproses" | "Selesai" | "Dibatalkan";
  jumlah: number;
  created_at: string;
  user: DbUser | null;
  stand: DbStandRef | null;
  menu: DbMenuRef | null;
}

export interface StandRow {
  id: number;
  nama_stand: string;
  nomor_stand: string | null;
  pemilik: string | null;
  telepon: string | null;
  status: "Buka" | "Tutup";
  id_penjual: string | null;
  menus?: { count: number }[];
}

export interface MenuRow {
  id: number;
  nama: string;
  kategori: "Makanan" | "Snack";
  harga: number;
  stok: number;
  tersedia: boolean;
  estimasi: number | null;
  deskripsi: string | null;
  rating: number | null;
  gambar: string | null;
  stand_id: number;
  stand: DbStandRef | null;
}

export interface DashboardContext {
  role: Role;
  userId: string;
  standId: number | null;
}
