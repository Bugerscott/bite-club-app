export type RewardStatus = 'available' | 'locked' | 'redeemed';

/**
 * Tipo de recompensa para la fase de frontend con datos mock. Deliberadamente
 * separado de `Reward` en src/types/database.ts (tabla `rewards` de Supabase)
 * por la misma razón que PromoOffer — se reconcilian al conectar backend.
 */
export interface RewardItem {
  id: string;
  name: string;
  pointsCost: number;
  status: RewardStatus;
  imageKey: string | null;
}
