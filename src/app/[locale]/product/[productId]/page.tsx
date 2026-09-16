import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { fetchPublicCatalog } from "@/lib/data/public";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params;
  const { items, stands } = await fetchPublicCatalog();

  const product = items.find((item) => String(item.id) === String(productId));
  if (!product) notFound();

  const stand = stands.find((s) => s.id === product.stand_id);

  return (
    <div className="grow bg-white flex flex-col">
      <ProductDetail product={product} standName={stand?.nama_stand} />
    </div>
  );
}
