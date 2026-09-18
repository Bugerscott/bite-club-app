// Tipos que reflejan el esquema de supabase/migrations/20260917154027_initial_schema.sql
// (migración histórica, sin modificar — ver docs/security-review.md para hallazgos pendientes)
// TODO: cuando el esquema crezca, generar esto automáticamente con:
//   npx supabase gen types typescript --project-id ydhhlofbssdrcgfzgcfe > src/types/database.ts

export type OrderStatus = 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';
export type DeliveryMethod = 'delivery' | 'pickup';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  /**
   * SERVER-CONTROLLED — nunca se debe escribir desde el cliente.
   * Ver docs/security-review.md: la policy RLS actual de UPDATE en `profiles`
   * no restringe columnas todavía, así que este campo NO debe incluirse en
   * ningún payload de actualización que salga de la app hasta que se corrija
   * con una migración nueva (columna separada, trigger o función RPC).
   */
  points_balance: number;
  created_at: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string | null;
  points_cost: number;
  image_url: string | null;
  category: string | null;
  active: boolean;
  created_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  original_price: number | null;
  offer_price: number | null;
  image_url: string | null;
  valid_from: string | null;
  valid_until: string | null;
  active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  delivery_method: DeliveryMethod;
  scheduled_time: string | null;
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_name: string;
  quantity: number;
  price: number;
  is_reward_redemption: boolean;
}

export interface PointsTransaction {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  created_at: string;
}
