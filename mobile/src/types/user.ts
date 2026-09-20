/**
 * Miembro mock para la pantalla Club (MemberCard, PointsCard). Separado de
 * `Profile` en src/types/database.ts (tabla `profiles` de Supabase, con
 * `points_balance` marcado server-controlled — ver docs/security-review.md).
 * Este tipo es solo para la fase de frontend con datos mock.
 */
export interface MockMember {
  id: string;
  displayName: string;
  pointsBalance: number;
  memberSince: string;
}
