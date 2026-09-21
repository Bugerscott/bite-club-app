import type { Extra } from '../types';

/** Extras/adicionales oficiales — fuente: menú oficial, sección 10. */
export const mockExtras: Extra[] = [
  { id: 'extra-carne', name: 'Carne', price: 60 },
  { id: 'extra-bacon', name: 'Bacon', price: 40 },
  { id: 'extra-papas', name: 'Papas fritas', price: 60 },
  { id: 'extra-queso', name: 'Queso', price: 30 },
  { id: 'extra-huevo', name: 'Huevo', price: 30 },
  { id: 'extra-salsa-bite', name: 'Salsa Bite', price: 30 },
];

const COMBO_EXTRAS = ['extra-carne', 'extra-bacon', 'extra-queso', 'extra-huevo', 'extra-papas'];

/** IDs de extras aplicables a productos de comida (no a bebidas/postres). */
export const defaultFoodExtraIds: string[] = COMBO_EXTRAS;
