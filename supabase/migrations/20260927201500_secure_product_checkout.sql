-- Checkout seguro: el cliente envia IDs/cantidades; nombre y precio salen del catalogo.
-- Migracion aditiva; NO modifica initial_schema.
alter table public.orders add column if not exists order_number text;
alter table public.orders add column if not exists subtotal numeric(10,2) not null default 0;
alter table public.orders add column if not exists notes text;
alter table public.order_items add column if not exists product_id uuid references public.products(id) on delete restrict;
alter table public.order_items add column if not exists line_total numeric(10,2) not null default 0;
create unique index if not exists idx_orders_order_number on public.orders(order_number) where order_number is not null;

create or replace function public.create_order_with_items(p_delivery_method text, p_items jsonb, p_notes text default null)
returns public.orders language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_user_id uuid := auth.uid(); v_order public.orders; v_subtotal numeric(10,2); v_invalid boolean;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_delivery_method not in ('delivery','pickup') then raise exception 'Invalid delivery method'; end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then raise exception 'Order must contain at least one item'; end if;
  if jsonb_array_length(p_items) > 50 then raise exception 'Too many order items'; end if;

  select exists(
    select 1 from jsonb_array_elements(p_items) item
    left join public.products p on p.id = case when (item->>'product_id') ~* '^[0-9a-f-]{36}$' then (item->>'product_id')::uuid else null end
    where p.id is null or p.active is not true or (item->>'quantity') !~ '^[1-9][0-9]*$' or (item->>'quantity')::int > 99
  ) into v_invalid;
  if v_invalid then raise exception 'Invalid or unavailable product'; end if;

  select round(sum(p.price * (item->>'quantity')::int),2) into v_subtotal
  from jsonb_array_elements(p_items) item join public.products p on p.id = (item->>'product_id')::uuid;

  insert into public.orders(user_id, delivery_method, subtotal, total, notes)
  values(v_user_id, p_delivery_method, v_subtotal, v_subtotal, nullif(btrim(p_notes),'')) returning * into v_order;
  update public.orders set order_number = 'BC-' || upper(substr(replace(v_order.id::text,'-',''),1,8)) where id = v_order.id returning * into v_order;

  insert into public.order_items(order_id, product_id, item_name, quantity, price, line_total, is_reward_redemption)
  select v_order.id, p.id, p.name, (item->>'quantity')::int, p.price, round(p.price * (item->>'quantity')::int,2), false
  from jsonb_array_elements(p_items) item join public.products p on p.id = (item->>'product_id')::uuid;
  return v_order;
end;
$$;
revoke all on function public.create_order_with_items(text,jsonb,text) from public, anon;
grant execute on function public.create_order_with_items(text,jsonb,text) to authenticated;
