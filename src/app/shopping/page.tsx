import CardCard from "@/components/shopping/CartCard";
import { fetchPublicCatalog } from "@/lib/data/public";

export default async function ShoppingPage() {
  const { stands } = await fetchPublicCatalog();

  return (
    <div className="grow bg-slate-50">
      <CardCard stands={stands.map((s) => ({ id: s.id, nama_stand: s.nama_stand }))} />
    </div>
  );
}
