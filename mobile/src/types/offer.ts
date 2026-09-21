/**
 * Tipo de oferta para la fase de frontend con datos mock. Deliberadamente
 * separado de `Offer` en src/types/database.ts. No hay promociones oficiales
 * con descuento todavía (instrucciones, sección 26) — `mocks/offers.ts` está
 * vacío a propósito; este tipo queda listo para cuando exista contenido de
 * marketing aprobado.
 */
export interface PromoOffer {
  id: string;
  title: string;
  description: string | null;
  originalPrice: number | null;
  offerPrice: number | null;
  imageKey: string | null;
  active: boolean;
}
