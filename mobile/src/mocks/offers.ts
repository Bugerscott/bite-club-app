import type { PromoOffer } from '../types';

/**
 * No hay ofertas comerciales aprobadas todavía. Para poder probar PromoCard y
 * HeroBanner en esta fase se incluye UNA oferta claramente marcada como
 * placeholder de desarrollo — no representa ninguna promoción real de Bite
 * Club. Reemplazar/completar cuando exista contenido de marketing aprobado.
 */
export const mockOffers: PromoOffer[] = [
  {
    id: 'dev-placeholder-offer',
    title: '[DEV] Oferta de ejemplo',
    description: 'Placeholder de desarrollo — sin oferta real aprobada todavía.',
    originalPrice: null,
    offerPrice: null,
    imageKey: null,
    active: true,
  },
];
