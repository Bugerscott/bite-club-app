import type { RewardItem } from '../types';

/**
 * No hay catálogo de recompensas aprobado todavía (nombres, costos en puntos
 * reales). Estos 3 items son placeholders de desarrollo, pensados solo para
 * poder probar los 3 estados de RewardCard (available/locked/redeemed) — no
 * son recompensas reales de Bite Club. No se inventan reglas comerciales
 * definitivas (instrucciones, sección 15).
 */
export const mockRewards: RewardItem[] = [
  {
    id: 'dev-reward-available',
    name: '[DEV] Recompensa disponible',
    pointsCost: 500,
    status: 'available',
    imageKey: null,
  },
  {
    id: 'dev-reward-locked',
    name: '[DEV] Recompensa bloqueada',
    pointsCost: 1500,
    status: 'locked',
    imageKey: null,
  },
  {
    id: 'dev-reward-redeemed',
    name: '[DEV] Recompensa canjeada',
    pointsCost: 800,
    status: 'redeemed',
    imageKey: null,
  },
];
