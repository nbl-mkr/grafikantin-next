-- ============================================================
-- Grafikantin — 0002_seed.sql  (OPSIONAL, untuk demo/dev)
-- Jalankan SETELAH 0001_schema.sql.
-- TIDAK membuat akun — memakai user yang sudah ada di
-- public.users (dipilih berdasarkan role).
-- Idempotent: setiap bagian hanya jalan jika tabel masih kosong.
-- ============================================================

-- ---------- STANDS ----------
insert into public.stands (nama_stand, nomor_stand, pemilik, telepon, status, id_penjual)
select v.nama, v.nomor, v.pemilik, v.telp, v.status,
       (select id from public.users where role = 'penjual' order by id limit 1)
from (values
  ('Stand Melati',   'A1', 'Sari Dewi',     '08112345001', 'Buka'),
  ('Stand Cempaka',  'A2', 'Budi Santoso',  '08112345002', 'Buka'),
  ('Stand Kenanga',  'B1', 'Rina Wati',     '08112345003', 'Tutup'),
  ('Stand Anggrek',  'B2', 'Dani Prasetyo', '08112345004', 'Buka'),
  ('Stand Mawar',    'C1', 'Fitri Lestari', '08112345005', 'Buka'),
  ('Stand Dahlia',   'C2', 'Agus Suryadi',  '08112345006', 'Tutup')
) as v(nama, nomor, pemilik, telp, status)
where not exists (select 1 from public.stands);

-- ---------- MENUS ----------
-- Setiap stand punya daftar menu yang SAMA (mengikuti data frontend sementara):
-- Makanan: Teriyaki Chicken, Katsu Chicken, Mie Pangsit
-- Camilan: Roti Bakar, Pangsit Rebus, Lumpia Pastel

insert into public.menus (stand_id, nama, kategori, estimasi, deskripsi, harga, rating, stok, gambar, tersedia)
select s.id, v.nama, v.kategori, v.estimasi, v.deskripsi, v.harga, v.rating, v.stok, v.gambar, v.tersedia
from public.stands s
cross join (values
  ('Teriyaki Chicken', 'Makanan', 15, 'Teriyaki chicken dengan topping telur orak-arik, salad, dan selada.',  8000, 4.8, 50, '/assets/teriyaki-chicken.jpg', true),
  ('Katsu Chicken',    'Makanan', 15, 'Katsu chicken yang renyah dan disajikan dengan saus spesial.',         10000, 4.8, 30, '/assets/katsu-chicken.jpg',    true),
  ('Mie Pangsit',      'Makanan', 15, 'Mie pangsit dengan taburan ayam cincang, selada segar, dan pangsit renyah.', 10000, 4.8, 25, '/assets/mie-pangsit.jpg',  true),
  ('Roti Bakar',       'Snack',   15, 'Roti bakar cokelat keju.',                                             5000, 4.8, 15, '/assets/roti-bakar.jpg',       true),
  ('Pangsit Rebus',    'Snack',   15, 'Pangsit rebus dengan kuah kaldu.',                                      5000, 4.8, 20, '/assets/pangsit-rebus.jpg',    true),
  ('Lumpia Pastel',    'Snack',   15, 'Lumpia pastel isi sayur.',                                              5000, 4.8, 18, '/assets/lumpia-pastel.jpg',    true)
) as v(nama, kategori, estimasi, deskripsi, harga, rating, stok, gambar, tersedia)
where not exists (select 1 from public.menus x where x.stand_id = s.id and x.nama = v.nama)
order by s.id, case v.nama
  when 'Teriyaki Chicken' then 1
  when 'Katsu Chicken'    then 2
  when 'Mie Pangsit'      then 3
  when 'Roti Bakar'       then 4
  when 'Pangsit Rebus'    then 5
  else 6
end;

-- ---------- ORDERS (menyebar 6 bulan terakhir, pakai user yang sudah ada) ----------
do $$
declare
  m record;
  v_pembeli uuid;
  statuses text[] := array['Menunggu','Diproses','Selesai','Selesai','Selesai','Selesai','Dibatalkan'];
  v_status text;
  v_jumlah int;
  v_created timestamptz;
  v_seq int := 0;
begin
  if exists (select 1 from public.orders) then return; end if;
  if not exists (select 1 from public.users) then return; end if;

  -- pembeli utama: user role siswa pertama (fallback: user pertama apa pun)
  select id into v_pembeli from public.users where role = 'siswa' order by id limit 1;
  if v_pembeli is null then select id into v_pembeli from public.users order by id limit 1; end if;

  for m in select id, stand_id, harga from public.menus order by random() loop
    v_seq := v_seq + 1;
    v_status := statuses[1 + (v_seq % array_length(statuses, 1))];
    v_jumlah := 1 + (v_seq % 3);
    v_created := now() - (random() * interval '180 days');
    insert into public.orders (kode_transaksi, id_user, id_stand, id_menu, jumlah, total_harga, metode_pembayaran, status, created_at)
    values (
      'GRF-' || lpad(v_seq::text, 3, '0'),
      case when v_seq % 4 = 0 then (select id from public.users order by random() limit 1) else v_pembeli end,
      m.stand_id, m.id, v_jumlah, m.harga * v_jumlah,
      case when v_seq % 3 = 0 then 'Cash' else 'QRIS' end,
      v_status, v_created
    );
  end loop;
end $$;

-- ---------- HISTORY ----------
insert into public.history (id_user, kategori, id_menu)
select o.id_user, m.kategori, o.id_menu
from public.orders o join public.menus m on m.id = o.id_menu
where o.id_user is not null and o.status = 'Selesai'
  and not exists (select 1 from public.history);
