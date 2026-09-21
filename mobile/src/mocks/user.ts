import type { MockMember } from '../types';

/**
 * Miembro mock único para probar MemberCard/PointsCard/Perfil. No representa
 * a ningún usuario real — email/teléfono son placeholders de desarrollo.
 */
export const mockMember: MockMember = {
  id: 'dev-member-1',
  displayName: '[DEV] Usuario de prueba',
  email: 'dev@example.com',
  phone: '[DEV] +505 0000 0000',
  pointsBalance: 250,
  memberSince: '2026-01-10T00:00:00-06:00',
};
