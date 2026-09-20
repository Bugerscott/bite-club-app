import type { MockMember } from '../types';

/**
 * Miembro mock único para probar MemberCard/PointsCard en la pantalla Club.
 * No representa a ningún usuario real.
 */
export const mockMember: MockMember = {
  id: 'dev-member-1',
  displayName: '[DEV] Usuario de prueba',
  pointsBalance: 250,
  memberSince: '2026-01-10T00:00:00-06:00',
};
