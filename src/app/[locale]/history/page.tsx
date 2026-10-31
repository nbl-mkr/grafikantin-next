import HistoryOrder from "@/components/history/HistoryOrder";
import { fetchUserOrders } from "@/lib/data/queries";
import { getProfile } from "@/lib/supabase/session";

/**
 * Halaman riwayat pesanan user.
 *
 * Mengambil data pesanan langsung dari tabel `orders` di Supabase
 * berdasarkan user ID yang sedang aktif/login.
 */
export default async function HistoryPage() {
  const profile = await getProfile();
  const orders = profile ? await fetchUserOrders(profile.id) : [];
  const currentTime = new Date().toISOString();

  return (
    <div className="grow bg-slate-50">
      <HistoryOrder
        orders={orders}
        isLoggedIn={Boolean(profile)}
        currentTime={currentTime}
      />
    </div>
  );
}
