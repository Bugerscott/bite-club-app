import type { PointsHistoryEntry } from '../types';

/** Historial de puntos mock — instrucciones, sección 32. */
export const mockPointsHistory: PointsHistoryEntry[] = [
  {
    id: 'points-dev-1',
    type: 'earned',
    points: 41,
    description: '[DEV] Puntos por pedido BC-1002',
    date: '2026-09-20T12:10:00-06:00',
  },
  {
    id: 'points-dev-2',
    type: 'earned',
    points: 33,
    description: '[DEV] Puntos por pedido BC-1001',
    date: '2026-09-15T18:30:00-06:00',
  },
  {
    id: 'points-dev-3',
    type: 'redeemed',
    points: -500,
    description: '[DEV] Canje de recompensa',
    date: '2026-09-05T16:00:00-06:00',
  },
];
