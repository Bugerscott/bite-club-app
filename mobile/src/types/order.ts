export type DeliveryMethod = 'delivery' | 'pickup';

/**
 * Estados de seguimiento de pedido (instrucciones, sección 24). Sin GPS ni
 * mapas — solo timeline/progreso local.
 */
export type OrderTrackingStatus = 'received' | 'preparing' | 'ready' | 'on_the_way' | 'delivered';

export interface MockOrderItem {
  cartItemId: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

/**
 * Pedido mock completo — usado en Inicio ("últimos pedidos"), historial,
 * confirmación y tracking. Totalmente local/frontend, no ligado a la tabla
 * `orders` de Supabase (ver src/types/database.ts) en esta fase.
 */
export interface MockOrder {
  id: string;
  orderNumber: string;
  items: MockOrderItem[];
  subtotal: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  addressLabel: string | null;
  status: OrderTrackingStatus;
  createdAt: string;
}
