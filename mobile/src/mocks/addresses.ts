import type { Address } from '../types';

/**
 * Direcciones mock/dev para probar el flujo de Delivery/Direcciones
 * (instrucciones, sección 21). Sin mapas, geocoding ni APIs externas — CRUD
 * 100% local vía AppStateContext.
 */
export const mockAddresses: Address[] = [
  {
    id: 'addr-dev-1',
    label: 'Casa',
    line1: '[DEV] Dirección de ejemplo 1',
    line2: null,
    city: 'Managua',
    isDefault: true,
  },
  {
    id: 'addr-dev-2',
    label: 'Oficina',
    line1: '[DEV] Dirección de ejemplo 2',
    line2: null,
    city: 'Managua',
    isDefault: false,
  },
];
