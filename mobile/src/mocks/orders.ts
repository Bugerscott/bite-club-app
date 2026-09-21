import type { MockOrder } from '../types';

/**
 * Pedidos mock completos — usados en Inicio ("últimos pedidos"), historial,
 * confirmación y tracking. `orderNumber`, items y totales son de desarrollo,
 * calculados a partir de precios reales del menú, pero no representan
 * pedidos reales.
 */
export const mockOrders: MockOrder[] = [
  {
    id: 'order-dev-1',
    orderNumber: 'BC-1001',
    items: [
      {
        cartItemId: 'dev-line-1',
        productId: 'bs-bite',
        name: "B's Bite",
        quantity: 2,
        unitPrice: 330,
        lineTotal: 660,
      },
      {
        cartItemId: 'dev-line-2',
        productId: 'papas-bravas',
        name: 'Papas Bravas',
        quantity: 1,
        unitPrice: 200,
        lineTotal: 200,
      },
    ],
    subtotal: 860,
    total: 860,
    deliveryMethod: 'delivery',
    addressLabel: 'Casa',
    status: 'delivered',
    createdAt: '2026-09-15T18:30:00-06:00',
  },
  {
    id: 'order-dev-2',
    orderNumber: 'BC-1002',
    items: [
      {
        cartItemId: 'dev-line-3',
        productId: 'cheesy-bite',
        name: 'Cheesy Bite',
        quantity: 1,
        unitPrice: 250,
        lineTotal: 250,
      },
    ],
    subtotal: 250,
    total: 250,
    deliveryMethod: 'pickup',
    addressLabel: null,
    status: 'on_the_way',
    createdAt: '2026-09-20T12:10:00-06:00',
  },
];
