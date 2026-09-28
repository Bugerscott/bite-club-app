-- Seguridad: conserva la funcion historica por compatibilidad de migraciones,
-- pero impide que clientes invoquen el checkout legado que aceptaba precios.
-- La firma segura vigente recibe product_id/cantidad y calcula precios en servidor.
revoke all on function public.create_order_with_items(text,jsonb,timestamptz) from public, anon, authenticated;
