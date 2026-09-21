/**
 * Mapa de `imageKey` -> fuente de imagen local. Centraliza la resolución de
 * imágenes de producto para que los componentes nunca hagan `require()`
 * directo (evita romper Metro si un archivo todavía no existe).
 *
 * ⚠️ Los archivos reales de fotografía (B's Bite, Cheesy Bite, Mediterránea,
 * Mordida Nica, Sweet Bite — ver instrucciones, sección 8) TODAVÍA NO existen
 * en mobile/assets/products/. Por eso este mapa está vacío: cualquier
 * `imageKey` resuelve a `null` y los componentes (ProductCard, HeroBanner,
 * etc.) caen a su placeholder visual automáticamente.
 *
 * CUÁNDO ACTIVAR: cuando llegue cada archivo real a mobile/assets/products/
 * con el nombre exacto documentado en el README de esa carpeta, agregar una
 * línea aquí, ej.:
 *
 *   'bs-bite-01': require('../../assets/products/bs-bite-01.jpg'),
 *
 * No se agregan requires especulativos de archivos inexistentes — eso
 * rompería el bundler.
 */
export const productImageMap: Record<string, number> = {};

export function resolveProductImage(imageKey: string | null | undefined): number | null {
  if (!imageKey) return null;
  return productImageMap[imageKey] ?? null;
}
