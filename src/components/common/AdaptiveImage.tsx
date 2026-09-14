import Image from "next/image";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_HOST = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : "";

export function isOptimizableSrc(src: string): boolean {
  if (typeof src !== "string" || src.length === 0) return false;
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return false;
    if (url.search.length > 0) return false;
    return (
      url.hostname === SUPABASE_HOST &&
      url.pathname.startsWith("/storage/v1/object/public/")
    );
  } catch {
    return false;
  }
}

interface AdaptiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  preload?: boolean;
}

export default function AdaptiveImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  preload,
}: AdaptiveImageProps) {
  if (!isOptimizableSrc(src)) {
    // blob:, data: atau host di luar allowlist tidak bisa lewat optimizer
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      className={className}
      preload={preload}
    />
  );
}
