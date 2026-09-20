/**
 * Tipo de oferta para la fase de frontend con datos mock. Estructuralmente
 * similar a `Offer` en src/types/database.ts (que refleja la tabla `offers`
 * de Supabase), pero deliberadamente separado: este es el tipo que consume la
 * UI (PromoCard/HeroBanner) mientras trabajamos con mocks. Se reconcilian
 * cuando se conecte el backend real.
 */
export interface PromoOffer {
  id: string;
  title: string;
  description: string | null;
  /** null = sin precio aprobado todavía. */
  originalPrice: number | null;
  /** null = sin precio aprobado todavía. */
  offerPrice: number | null;
  imageKey: string | null;
  active: boolean;
}
