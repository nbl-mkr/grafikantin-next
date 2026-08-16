import ProductDetail from "@/components/product/ProductDetail";
import { mockMakanan, mockCamilan, mockPopularFoods } from "@/data/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const allItems = [...mockMakanan, ...mockCamilan, ...mockPopularFoods];
  const product = allItems.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="grow bg-white flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Tidak Ditemukan</h1>
          <p className="mt-2 text-sm text-gray-500">
            Menu dengan ID {id} tidak ada di sistem.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grow bg-white flex flex-col">
      <ProductDetail product={product} />
    </div>
  );
}