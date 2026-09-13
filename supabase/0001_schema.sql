-- ============================================================
-- Grafikantin — 0001_schema.sql
-- Jalankan di Supabase SQL Editor (sekali).
-- Mengikuti ERD: users, stands, menus, orders, history
-- + tambahan hasil diskusi: stands.telepon/pemilik,
--   stands.id_penjual, menus.stand_id/stok/gambar/tersedia,
--   orders.id_menu/jumlah
-- ============================================================

-- ---------- TABEL ----------

-- users (fallback: jika belum dibuat Better Auth; jika sudah ada, hanya
-- memastikan kolom role ada karena seed & RLS membutuhkannya)
create table if not exists public.users (
  id         uuid primary key,
  username   text,
  email      text unique,
  role       text not null default 'siswa' check (role in ('admin','penjual','siswa')),
  created_at timestamptz not null default now()
);

alter table public.users add column if not exists role text not null default 'siswa';

create table if not exists public.stands (
  id          bigint generated always as identity primary key,
  nama_stand  text not null,
  nomor_stand text,
  pemilik     text,
  telepon     text,
  status      text not null default 'Buka' check (status in ('Buka','Tutup')),
  id_penjual  uuid references public.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists public.menus (
  id        bigint generated always as identity primary key,
  stand_id  bigint not null references public.stands(id) on delete cascade,
  nama      text not null,
  kategori  text not null default 'Makanan' check (kategori in ('Makanan','Minuman','Snack')),
  estimasi  integer default 0,
  deskripsi text,
  harga     bigint not null default 0,
  rating    numeric(2,1) default 0,
  stok      integer not null default 0,
  gambar    text,
  tersedia  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id                bigint generated always as identity primary key,
  kode_transaksi    text not null unique,
  id_user           uuid references public.users(id) on delete set null,
  id_stand          bigint not null references public.stands(id) on delete restrict,
  id_menu           bigint references public.menus(id) on delete set null,
  jumlah            integer not null default 1 check (jumlah > 0),
  total_harga       bigint not null default 0,
  metode_pembayaran text default 'QRIS',
  status            text not null default 'Menunggu'
                    check (status in ('Menunggu','Diproses','Selesai','Dibatalkan')),
  created_at        timestamptz not null default now()
);

create index if not exists orders_id_stand_idx    on public.orders (id_stand);
create index if not exists orders_id_user_idx     on public.orders (id_user);
create index if not exists orders_id_menu_idx     on public.orders (id_menu);
create index if not exists orders_created_at_idx  on public.orders (created_at);

create table if not exists public.history (
  id_histori bigint generated always as identity primary key,
  id_user    uuid not null references public.users(id) on delete cascade,
  kategori   text,
  id_menu    bigint references public.menus(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists history_id_user_idx on public.history (id_user);

-- ---------- HELPER FUNCTIONS (security definer, hindari rekursi RLS) ----------

create or replace function public.auth_role()
returns text
language sql stable security definer set search_path = public as
$$ select role from public.users where id = auth.uid() $$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as
$$ select coalesce(public.auth_role() = 'admin', false) $$;

create or replace function public.my_stand_id()
returns bigint
language sql stable security definer set search_path = public as
$$ select id from public.stands where id_penjual = auth.uid() limit 1 $$;

-- ---------- RLS ----------

alter table public.stands  enable row level security;
alter table public.menus   enable row level security;
alter table public.orders  enable row level security;
alter table public.history enable row level security;
alter table public.users   enable row level security;

-- users: diri sendiri boleh baca/update, admin bebas
drop policy if exists users_select on public.users;
create policy users_select on public.users
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists users_update on public.users;
create policy users_update on public.users
  for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- stands: semua boleh lihat; tulis: admin atau pemilik stand
drop policy if exists stands_select on public.stands;
create policy stands_select on public.stands
  for select to anon, authenticated using (true);

drop policy if exists stands_write on public.stands;
create policy stands_write on public.stands
  for all to authenticated
  using (public.is_admin() or id_penjual = auth.uid())
  with check (public.is_admin() or id_penjual = auth.uid());

-- menus: semua boleh lihat; tulis: admin atau penjual pemilik stand menu tsb
drop policy if exists menus_select on public.menus;
create policy menus_select on public.menus
  for select to anon, authenticated using (true);

drop policy if exists menus_write on public.menus;
create policy menus_write on public.menus
  for all to authenticated
  using (
    public.is_admin()
    or exists (select 1 from public.stands s
               where s.id = menus.stand_id and s.id_penjual = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.stands s
               where s.id = stand_id and s.id_penjual = auth.uid())
  );

-- orders: admin semua; penjual lihat/update pesanan stand-nya; siswa lihat+buat miliknya
drop policy if exists orders_select on public.orders;
create policy orders_select on public.orders
  for select to authenticated
  using (public.is_admin() or id_user = auth.uid() or id_stand = public.my_stand_id());

drop policy if exists orders_insert on public.orders;
create policy orders_insert on public.orders
  for insert to authenticated
  with check (id_user = auth.uid() or public.is_admin());

drop policy if exists orders_update on public.orders;
create policy orders_update on public.orders
  for update to authenticated
  using (public.is_admin() or id_stand = public.my_stand_id())
  with check (public.is_admin() or id_stand = public.my_stand_id());

drop policy if exists orders_delete on public.orders;
create policy orders_delete on public.orders
  for delete to authenticated
  using (public.is_admin());

-- history: milik sendiri + admin
drop policy if exists history_rw on public.history;
create policy history_rw on public.history
  for all to authenticated
  using (id_user = auth.uid() or public.is_admin())
  with check (id_user = auth.uid() or public.is_admin());

-- ---------- STORAGE: bucket gambar menu ----------

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

drop policy if exists menu_images_read on storage.objects;
create policy menu_images_read on storage.objects
  for select using (bucket_id = 'menu-images');

drop policy if exists menu_images_write on storage.objects;
create policy menu_images_write on storage.objects
  for insert to authenticated
  with check (bucket_id = 'menu-images');

drop policy if exists menu_images_update on storage.objects;
create policy menu_images_update on storage.objects
  for update to authenticated
  using (bucket_id = 'menu-images')
  with check (bucket_id = 'menu-images');

drop policy if exists menu_images_delete on storage.objects;
create policy menu_images_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'menu-images');
