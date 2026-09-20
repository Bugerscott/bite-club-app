/**
 * Tipos de producto para la fase de frontend con datos mock.
 *
 * Nota: Supabase todavía no tiene una tabla `products` (solo `offers` y
 * `rewards`, ver supabase/migrations/). Este tipo es independiente del
 * esquema de base de datos (src/types/database.ts) a propósito — se
 * reconciliarán cuando se diseñe el backend real de catálogo/menú.
 */
export type ProductCategoryId = 'bites' | 'sides' | 'drinks' | 'combos';

export type ProductBadge = 'nuevo' | 'popular';

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  categoryId: ProductCategoryId;
  /** null = todavía no existe un precio aprobado para este producto. */
  price: number | null;
  /**
   * Referencia local a una imagen mock (ver src/mocks/products.ts). No es una
   * URL — mientras no haya Storage, cada Product Card resuelve esta key a un
   * `require()` local a través de un mapa de imágenes (o a un estado vacío si
   * la key es null).
   */
  imageKey: string | null;
  available: boolean;
  badge: ProductBadge | null;
}
