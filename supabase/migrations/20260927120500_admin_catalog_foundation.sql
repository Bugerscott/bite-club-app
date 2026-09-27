-- Bite Club: base segura para catalogo y panel administrativo.
-- Migracion aditiva; no modifica la migracion historica initial_schema.

create table public.admin_users (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role text not null default 'editor' check (role in ('editor','manager','owner')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_recipes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  ingredients jsonb not null default '[]'::jsonb,
  preparation text,
  internal_notes text,
  updated_at timestamptz not null default now()
);

create index idx_products_active_sort on public.products(active, sort_order);
create index idx_admin_users_active on public.admin_users(active) where active = true;

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.product_recipes enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid()) and active = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create policy "Users can view own admin membership" on public.admin_users
for select to authenticated using (user_id = (select auth.uid()));

create policy "Anyone can view active products" on public.products
for select using (active = true or public.is_admin());
create policy "Admins can insert products" on public.products
for insert to authenticated with check (public.is_admin());
create policy "Admins can update products" on public.products
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete products" on public.products
for delete to authenticated using (public.is_admin());

create policy "Admins can view recipes" on public.product_recipes
for select to authenticated using (public.is_admin());
create policy "Admins can insert recipes" on public.product_recipes
for insert to authenticated with check (public.is_admin());
create policy "Admins can update recipes" on public.product_recipes
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete recipes" on public.product_recipes
for delete to authenticated using (public.is_admin());

create policy "Admins can manage offers" on public.offers
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage rewards" on public.rewards
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can view all orders" on public.orders
for select to authenticated using (public.is_admin());
create policy "Admins can update orders" on public.orders
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can view all order items" on public.order_items
for select to authenticated using (public.is_admin());
