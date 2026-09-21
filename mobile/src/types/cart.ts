import type { SauceOption } from './product';

export interface CartLineExtra {
  id: string;
  name: string;
  price: number;
}

/**
 * Línea de carrito local (estado en memoria vía CartContext, no persistido a
 * backend). Dos configuraciones distintas del mismo producto (ej. diferente
 * salsa) son líneas separadas — cada una con su propio `cartItemId`.
 */
export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageKey: string | null;
  selectedSauce?: SauceOption;
  selectedExtras: CartLineExtra[];
}
