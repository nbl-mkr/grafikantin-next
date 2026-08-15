interface ProductGalleryProps {
  gambar?: string;
  namaMenu: string;
}

export default function ProductGallery({ gambar, namaMenu }: ProductGalleryProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 aspect-4/3">
      <img
        src={gambar || "/assets/fallback.jpg"}
        alt={namaMenu}
        className="h-full w-full object-cover"
      />
    </div>
  );
}