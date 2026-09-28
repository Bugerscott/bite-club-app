import { supabase } from '../lib/supabase';
import type { MockOrder, OrderTrackingStatus } from '../types';

export type CheckoutItem = { productId: string; quantity: number };
export type Order = {
  id: string;
  order_number: string | null;
  status: string;
  delivery_method: string;
  subtotal: number;
  total: number;
  created_at: string;
  order_items?: {
    id: string;
    quantity: number;
    item_name: string;
    price: number;
    line_total: number;
    product_id?: string | null;
  }[];
};

const ORDER_SELECT = 'id,order_number,status,delivery_method,subtotal,total,created_at,order_items(id,product_id,quantity,item_name,price,line_total)';

export async function createOrder(items: CheckoutItem[], deliveryMethod: 'delivery' | 'pickup', notes?: string) {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) throw new Error('AUTH_REQUIRED');
  if (!items.length) throw new Error('EMPTY_CART');
  if (items.length > 50 || items.some((item) => !item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 99)) throw new Error('INVALID_ITEMS');

  const { data, error } = await supabase.rpc('create_order_with_items', {
    p_items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
    p_delivery_method: deliveryMethod,
    p_notes: notes?.trim() || null,
  });
  if (error) throw error;
  return data;
}

export async function getMyOrders(): Promise<Order[]> {
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) throw new Error('AUTH_REQUIRED');

  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_SELECT)
    .eq('user_id', auth.user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeOrder) as Order[];
}

export async function getMyOrder(orderId: string): Promise<Order | null> {
  if (!orderId) return null;
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!auth.user) throw new Error('AUTH_REQUIRED');

  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_SELECT)
    .eq('id', orderId)
    .eq('user_id', auth.user.id)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeOrder(data as Order) : null;
}

function normalizeOrder(order: Order): Order {
  return { ...order, subtotal: Number(order.subtotal), total: Number(order.total) };
}

function uiStatus(status: string): OrderTrackingStatus {
  switch (status) {
    case 'confirmed':
    case 'preparing':
      return 'preparing';
    case 'ready':
      return 'ready';
    case 'delivering':
    case 'on_the_way':
      return 'on_the_way';
    case 'completed':
    case 'delivered':
      return 'delivered';
    case 'received':
    case 'pending':
    default:
      return 'received';
  }
}

export function toUiOrder(order: Order): MockOrder {
  const items = (order.order_items ?? []).map((item) => ({
    cartItemId: item.id,
    productId: item.product_id ?? '',
    name: item.item_name,
    quantity: item.quantity,
    unitPrice: Number(item.price),
    lineTotal: Number(item.line_total),
  }));
  return {
    id: order.id,
    orderNumber: order.order_number ?? 'Pedido',
    items,
    subtotal: Number(order.subtotal),
    total: Number(order.total),
    deliveryMethod: order.delivery_method === 'delivery' ? 'delivery' : 'pickup',
    addressLabel: null,
    status: uiStatus(order.status),
    createdAt: order.created_at,
  };
}
