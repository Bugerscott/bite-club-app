/**
 * Tipos de producto/menú — Fase Frontend 2 (menú real, ver
 * BITE_CLUB_FRONTEND_MASTER_PROMPT.md secciones 10-11).
 *
 * Sigue independiente del esquema de Supabase (src/types/database.ts): no
 * existe todavía una tabla `products` en el backend. Se reconciliarán cuando
 * se diseñe el catálogo/menú real.
 */
export type MenuCategoryId =
  | 'smash-burgers'
  | 'especialidades'
  | 'starters'
  | 'shakes-postres'
  | 'bebidas';

export type SauceOption = 'salsa-bite' | 'alioli' | 'bbq' | 'salsa-brava';

export type ProductBadge = 'nuevo' | 'popular';

export interface Product {
  id: string;
  name: string;
  categoryId: MenuCategoryId;
  /** Descripción oficial del menú (fuente: instrucciones del usuario, sección 10). */
  description: string;
  price: number;
  /**
   * Referencias locales a imágenes mock (ver src/mocks/products.ts). No son
   * URLs — se resuelven a través de un mapa de imágenes local
   * (src/lib/productImages.ts). Array vacío = sin fotografía real todavía
   * (placeholder visual).
   */
  images: string[];
  /** Aparece en secciones destacadas de Inicio. */
  featured: boolean;
  /** Producto estrella (Mordida Nica) — mayor protagonismo visual. */
  starProduct: boolean;
  includesFries: boolean;
  available: boolean;
  /** IDs de extras disponibles para este producto (ver src/mocks/extras.ts). */
  extrasAvailable?: string[];
  /** Opciones de salsa (solo "Algo Rico" por ahora). */
  saucesAvailable?: SauceOption[];
  /**
   * Texto informativo oficial adicional (ej. nota de donación de "Algo Rico").
   * NO es un slogan — es información puntual del producto, dada textualmente
   * por el usuario. No convertir en claim general de marca.
   */
  additionalInfo?: string;
  badge?: ProductBadge | null;
}
