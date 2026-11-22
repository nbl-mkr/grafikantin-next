import AdaptiveImage from "@/components/common/AdaptiveImage";

interface ProductGalleryProps {
  gambar?: string;
  namaMenu: string;
}

export default function ProductGallery({ gambar, namaMenu }: ProductGalleryProps) {
  const isPlaceholder = (gambar || "").includes("-icon.png");

  return (
    <div
      className={`relative aspect-square h-auto w-full lg:aspect-auto lg:h-full overflow-hidden rounded-2xl ${
        isPlaceholder ? "bg-amber-50/40 flex items-center justify-center" : "bg-gray-50"
      } border border-gray-100`}
    >
      {isPlaceholder ? (
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <AdaptiveImage
            src={gambar || "/assets/food-icon.png"}
            alt={namaMenu}
            fill
            sizes="112px"
            className="object-contain"
            preload
          />
        </div>
      ) : (
        <AdaptiveImage
          src={gambar || "/assets/food-icon.png"}
          alt={namaMenu}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          preload
        />
      )}
    </div>
  );
}
