-- Harden the internal admin predicate and make checkout atomic.
-- This migration is additive and does not modify initial_schema.

revoke all on function public.is_admin() from public;
revoke all on function public.is_admin() from anon;
revoke all on function public.is_admin() from authenticated;

create or replace function public.create_order_with_items(
  p_delivery_method text,
  p_items jsonb,
  p_scheduled_time timestamptz default null
)
returns public.orders
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_order public.orders;
  v_subtotal numeric(10,2);
  v_invalid boolean;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_delivery_method not in ('delivery', 'pickup') then
    raise exception 'Invalid delivery method';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  select exists (
    select 1
    from jsonb_array_elements(p_items) as item
    where nullif(btrim(item->>'name'), '') is null
       or (item->>'quantity') is null
       or (item->>'price') is null
       or (item->>'quantity') !~ '^[1-9][0-9]*$'
       or (item->>'price') !~ '^[0-9]+([.][0-9]{1,2})?$'
  ) into v_invalid;

  if v_invalid then
    raise exception 'Invalid order item';
  end if;

  select round(sum(((item->>'price')::numeric * (item->>'quantity')::integer)), 2)
    into v_subtotal
  from jsonb_array_elements(p_items) as item;

  insert into public.orders (user_id, delivery_method, scheduled_time, subtotal, total)
  values (v_user_id, p_delivery_method, p_scheduled_time, v_subtotal, v_subtotal)
  returning * into v_order;

  insert into public.order_items (order_id, item_name, quantity, price, is_reward_redemption)
  select v_order.id,
         btrim(item->>'name'),
         (item->>'quantity')::integer,
         (item->>'price')::numeric(10,2),
         false
  from jsonb_array_elements(p_items) as item;

  return v_order;
end;
$$;

revoke all on function public.create_order_with_items(text, jsonb, timestamptz) from public;
revoke all on function public.create_order_with_items(text, jsonb, timestamptz) from anon;
grant execute on function public.create_order_with_items(text, jsonb, timestamptz) to authenticated;
