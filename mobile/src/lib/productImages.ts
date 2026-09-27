/** Mapa central de imageKey -> fotografía local optimizada. */
export const productImageMap: Record<string, number> = {
  'bs-bite-01': require('../../assets/products/bs-bite-01.jpg'),
  'bs-bite-02': require('../../assets/products/bs-bite-02.jpg'),
  'bs-bite-03': require('../../assets/products/bs-bite-03.jpg'),
  'bs-bite-04': require('../../assets/products/bs-bite-04.jpg'),
  'cheesy-bite-01': require('../../assets/products/cheesy-bite-01.jpg'),
  'cheesy-bite-02': require('../../assets/products/cheesy-bite-02.jpg'),
  'cheesy-bite-03': require('../../assets/products/cheesy-bite-03.jpg'),
  'cheesy-bite-04': require('../../assets/products/cheesy-bite-04.jpg'),
  'mediterranea-01': require('../../assets/products/mediterranea-01.jpg'),
  'mediterranea-02': require('../../assets/products/mediterranea-02.jpg'),
  'mediterranea-03': require('../../assets/products/mediterranea-03.jpg'),
  'mediterranea-04': require('../../assets/products/mediterranea-04.jpg'),
  'mediterranea-05': require('../../assets/products/mediterranea-05.jpg'),
  'mordida-nica-01': require('../../assets/products/mordida-nica-01.jpg'),
  'mordida-nica-02': require('../../assets/products/mordida-nica-02.jpg'),
  'mordida-nica-03': require('../../assets/products/mordida-nica-03.jpg'),
  'mordida-nica-04': require('../../assets/products/mordida-nica-04.jpg'),
  'mordida-nica-05': require('../../assets/products/mordida-nica-05.jpg'),
  'mordida-nica-06': require('../../assets/products/mordida-nica-06.jpg'),
  'mordida-nica-07': require('../../assets/products/mordida-nica-07.jpg'),
  'mordida-nica-08': require('../../assets/products/mordida-nica-08.jpg'),
  'sweet-bite-01': require('../../assets/products/sweet-bite-01.jpg'),
  'sweet-bite-02': require('../../assets/products/sweet-bite-02.jpg'),
  'sweet-bite-03': require('../../assets/products/sweet-bite-03.jpg'),
  'sweet-bite-04': require('../../assets/products/sweet-bite-04.jpg'),
};

export function resolveProductImage(imageKey: string | null | undefined): number | null {
  if (!imageKey) return null;
  return productImageMap[imageKey] ?? null;
}

/** Thumbnails de baja memoria para cards/listas. */
export const productThumbnailMap: Record<string, number> = {
  'bs-bite': require('../../assets/products/bs-bite-01-thumb.jpg'),
  'sweet-bite': require('../../assets/products/sweet-bite-01-thumb.jpg'),
  'cheesy-bite': require('../../assets/products/cheesy-bite-01-thumb.jpg'),
  'mediterranea': require('../../assets/products/mediterranea-01-thumb.jpg'),
  'mordida-nica': require('../../assets/products/mordida-nica-01-thumb.jpg'),
};

export function resolveProductThumbnail(productId: string | null | undefined): number | null {
  if (!productId) return null;
  return productThumbnailMap[productId] ?? null;
}
