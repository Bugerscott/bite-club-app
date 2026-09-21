import type { PromoOffer } from '../types';

/**
 * No hay promociones oficiales con descuento todavía (instrucciones, sección
 * 26): no se inventan porcentajes, 2x1, combos, fechas ni precios especiales.
 * La pantalla Ofertas muestra un EmptyState mientras este array esté vacío.
 */
export const mockOffers: PromoOffer[] = [];
