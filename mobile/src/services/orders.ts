import { supabase } from '../lib/supabase';

export type CartItem = { name: string; quantity: number; price: number };
export type DeliveryMethod = 'delivery' | 'pickup';

export async function createOrder(items: CartItem[], deliveryMethod: DeliveryMethod) {
  if (!items.length) throw new Error('El pedido no puede estar vacio.');
  for (const item of items) {
    if (!item.name.trim() || !Number.isInteger(item.quantity) || item.quantity < 1 || item.price < 0) {
      throw new Error('Hay un producto invalido en el pedido.');
    }
  }

  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) throw new Error('Debes iniciar sesion para realizar un pedido.');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_id: auth.user.id, delivery_method: deliveryMethod, subtotal, total: subtotal })
    .select('id,order_number,status,total,created_at')
    .single();
  if (orderError) throw orderError;

  const { error: itemsError } = await supabase.from('order_items').insert(
    items.map((item) => ({ order_id: order.id, item_name: item.name.trim(), quantity: item.quantity, price: item.price })),
  );
  if (itemsError) {
    // No ocultamos un pedido parcialmente creado: el caller recibe el error y el
    // registro queda visible para conciliacion administrativa.
    throw itemsError;
  }
  return order;
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
