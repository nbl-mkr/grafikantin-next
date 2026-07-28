import { PopularMenuItem } from "@/components/home/PopularMenu";
import { MenuItem } from "@/components/menu/MenuCard";

export interface Stand {
  id: number | string;
  nama_stand: string;
  deskripsi: string;
  gambar?: string;
}

export const mockPopularFoods: PopularMenuItem[] = [
  {
    id: "1",
    nama_menu: "Teriyaki Chicken Rice Bowl",
    harga: 8000,
    deskripsi: "Teriyaki chicken rice bowl dengan topping telur orak-arik, salad, dan selada.",
    gambar: "/assets/teriyaki-chicken.jpg",
    stand_id: 1,
  },
  {
    id: "2",
    nama_menu: "Katsu Chicken Rice Bowl",
    harga: 10000,
    deskripsi: "Katsu chicken rice bowl yang renyah dan disajikan dengan saus spesial.",
    gambar: "/assets/katsu-chicken.jpg",
    stand_id: 1,
  },
  {
    id: "3",
    nama_menu: "Mie Pangsit",
    harga: 10000,
    deskripsi: "Mie pangsit dengan taburan ayam cincang, selada segar, dan pangsit renyah.",
    gambar: "/assets/mie-pangsit.jpg",
    stand_id: 1,
  },
];

export const mockMakanan: MenuItem[] = [
  {
    id: 1,
    nama_menu: "Teriyaki Chicken Rice Bowl",
    harga: 8000,
    deskripsi: "Teriyaki chicken rice bowl dengan topping telur orak-arik, salad, dan selada.",
    gambar: "/assets/teriyaki-chicken.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
  {
    id: 2,
    nama_menu: "Katsu Chicken Rice Bowl",
    harga: 10000,
    deskripsi: "Katsu chicken rice bowl yang renyah dan disajikan dengan saus spesial.",
    gambar: "/assets/katsu-chicken.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
  {
    id: 3,
    nama_menu: "Mie Pangsit",
    harga: 10000,
    deskripsi: "Mie pangsit dengan taburan ayam cincang, selada segar, dan pangsit renyah.",
    gambar: "/assets/mie-pangsit.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
];

export const mockCamilan: MenuItem[] = [
  {
    id: 1,
    nama_menu: "Roti Bakar",
    harga: 5000,
    deskripsi: "Roti bakar dengan berbagai pilihan topping melimpah.",
    gambar: "/assets/roti-bakar.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
  {
    id: 2,
    nama_menu: "Pangsit Rebus",
    harga: 5000,
    deskripsi: "Pangsit rebus yang gurih dan disiram minyak cabai pedas.",
    gambar: "/assets/pangsit-rebus.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
  {
    id: 3,
    nama_menu: "Lumpia Pastel",
    harga: 5000,
    deskripsi: "Jajanan krispi berkulit lumpia dengan cetakan pastel dengan berbagai pilihan topping.",
    gambar: "/assets/lumpia-pastel.jpg",
    estimasi: "10-15 Mnt",
    rating: "4.8 / 5.0",
  },
];

export const mockStands: Stand[] = [
  {
    id: 1,
    nama_stand: "Stand Melati",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
  {
    id: 2,
    nama_stand: "Stand Cempaka",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
  {
    id: 3,
    nama_stand: "Stand Kenanga",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
  {
    id: 4,
    nama_stand: "Stand Anggrek",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
  {
    id: 5,
    nama_stand: "Stand Mawar",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
  {
    id: 6,
    nama_stand: "Stand Dahlia",
    deskripsi: "Menyediakan berbagai menu pilihan bagi siswa.",
    gambar: "menu.jpg",
  },
];