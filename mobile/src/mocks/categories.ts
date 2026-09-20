import type { ProductCategory } from '../types';

/**
 * Categorías estructurales para el menú. "drinks" y "combos" todavía no
 * tienen productos mock asociados (ver products.ts) — quedan definidas para
 * que CategoryChip y el futuro filtro de menú tengan las 4 disponibles.
 */
export const mockCategories: ProductCategory[] = [
  { id: 'bites', label: 'Bites' },
  { id: 'sides', label: 'Acompañantes' },
  { id: 'drinks', label: 'Bebidas' },
  { id: 'combos', label: 'Combos' },
];
