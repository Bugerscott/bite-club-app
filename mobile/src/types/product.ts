/** Tipos de producto/menú usados por la UI oficial de Bite Club. */
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
  description: string;
  price: number;
  images: string[];
  /** URL administrable en Supabase. Las imágenes locales siguen siendo fallback de marca. */
  imageUrl?: string | null;
  featured: boolean;
  starProduct: boolean;
  includesFries: boolean;
  available: boolean;
  extrasAvailable?: string[];
  saucesAvailable?: SauceOption[];
  additionalInfo?: string;
  badge?: ProductBadge | null;
}
