import AdaptiveImage from "@/components/common/AdaptiveImage";

interface ProductGalleryProps {
  gambar?: string;
  namaMenu: string;
}

export default function ProductGallery({ gambar, namaMenu }: ProductGalleryProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
      <AdaptiveImage
        src={gambar || "/assets/fallback.jpg"}
        alt={namaMenu}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        preload
      />
    </div>
  );
}
