-- Bite Club App — Esquema inicial
-- Exportado desde Supabase (proyecto: Bite Club app, ydhhlofbssdrcgfzgcfe)
-- Fecha de aplicación original: 2026-09-17

-- ============================================================
-- profiles: extiende auth.users
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  points_balance integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- rewards: catálogo de canjes por puntos
-- ============================================================
create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  points_cost integer not null,
  image_url text,
  category text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- offers: ofertas con precio
-- ============================================================
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  original_price numeric(10,2),
  offer_price numeric(10,2),
  image_url text,
  valid_from time,
  valid_until time,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- orders: pedidos
-- ============================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','confirmed','delivering','completed','cancelled')),
  delivery_method text not null check (delivery_method in ('delivery','pickup')),
  scheduled_time timestamptz,
  total numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- order_items: productos dentro de cada pedido
-- ============================================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_name text not null,
  quantity integer not null default 1,
  price numeric(10,2) not null default 0,
  is_reward_redemption boolean not null default false
);

-- ============================================================
-- points_transactions: historial de puntos
-- ============================================================
create table public.points_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Índices
-- ============================================================
create index idx_orders_user_id on public.orders(user_id);
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_points_transactions_user_id on public.points_transactions(user_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.rewards enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.points_transactions enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Anyone can view active rewards" on public.rewards for select using (active = true);
create policy "Anyone can view active offers" on public.offers for select using (active = true);

create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create own orders" on public.orders for insert with check (auth.uid() = user_id);

create policy "Users can view own order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

create policy "Users can view own points transactions" on public.points_transactions for select using (auth.uid() = user_id);
