export type MockOrderStatus = 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';

/**
 * Resumen de pedido para la pantalla de Inicio ("últimos pedidos") y para el
 * futuro historial de pedidos. Separado de `Order`/`OrderItem` en
 * src/types/database.ts por la misma razón que el resto de tipos mock.
 */
export interface MockOrderSummary {
  id: string;
  /** Texto ya compuesto, ej. "2x B's Bite, 1x Papas Bravas". No es una lista estructurada todavía. */
  itemsSummary: string;
  /** null = sin precio aprobado todavía. */
  total: number | null;
  status: MockOrderStatus;
  createdAt: string;
}
