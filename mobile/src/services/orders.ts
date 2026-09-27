import { supabase } from '../lib/supabase';

export type CartItem = { name: string; quantity: number; price: number };
export type DeliveryMethod = 'delivery' | 'pickup';

export async function createOrder(items: CartItem[], deliveryMethod: DeliveryMethod) {
  if (!items.length) throw new Error('El pedido no puede estar vacio.');
  for (const item of items) {
    if (!item.name.trim() || !Number.isInteger(item.quantity) || item.quantity < 1 || !Number.isFinite(item.price) || item.price < 0) {
      throw new Error('Hay un producto invalido en el pedido.');
    }
  }

  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) throw new Error('Debes iniciar sesion para realizar un pedido.');

  const { data, error } = await supabase.rpc('create_order_with_items', {
    p_delivery_method: deliveryMethod,
    p_items: items.map((item) => ({
      name: item.name.trim(),
      quantity: item.quantity,
      price: Number(item.price.toFixed(2)),
    })),
  });
  if (error) throw error;

  // PostgreSQL returns the composite order row from the RPC.
  return data;
}

export async function getMyOrders() {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('id,order_number,status,delivery_method,subtotal,total,created_at,order_items(id,item_name,quantity,price,is_reward_redemption)')
    .eq('user_id', auth.user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
