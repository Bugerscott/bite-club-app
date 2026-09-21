/**
 * Miembro mock para la pantalla Club y Perfil. Separado de `Profile` en
 * src/types/database.ts (tabla `profiles` de Supabase, con `points_balance`
 * marcado server-controlled — ver docs/security-review.md). Todos los campos
 * son datos de desarrollo/mock, no información real de un usuario.
 */
export interface MockMember {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  pointsBalance: number;
  memberSince: string;
}
