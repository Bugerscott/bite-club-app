import type { MockOrderSummary } from '../types';

/**
 * Pedidos mock para la sección "últimos pedidos" de Inicio. `total: null` en
 * todos — no hay precios aprobados. `itemsSummary` referencia nombres reales
 * de productos (mocks/products.ts) solo para dar contexto visual, sin
 * inventar cantidades ni precios como si fueran datos reales de un pedido.
 */
export const mockOrders: MockOrderSummary[] = [
  {
    id: 'dev-order-1',
    itemsSummary: "[DEV] 2x B's Bite, 1x Papas Bravas",
    total: null,
    status: 'completed',
    createdAt: '2026-09-15T18:30:00-06:00',
  },
  {
    id: 'dev-order-2',
    itemsSummary: '[DEV] 1x Cheesy Bite',
    total: null,
    status: 'delivering',
    createdAt: '2026-09-20T12:10:00-06:00',
  },
];
