/**
 * Colores oficiales de Bite Club.
 *
 * FUENTE: instrucciones del usuario (2026-09-20), sección "3. COLORES OFICIALES".
 * NO modificar estos 6 valores sin autorización explícita.
 *
 * Cualquier tono adicional (border, disabled, pressed, muted, overlay, divider)
 * se deriva por OPACIDAD de estos 6 colores — nunca se agrega un HEX nuevo.
 */

const official = {
  /** PRIMARY / BITE RED — CTA principal, botones primarios, navegación activa. */
  primary: '#E41A17',
  /** SECONDARY — navegación inactiva, elementos y iconografía de apoyo. */
  secondary: '#748DAF',
  /** BACKGROUND — fondo principal de la aplicación. */
  background: '#FFFFFF',
  /** TEXT — títulos, cuerpo, descripciones, labels, navegación. */
  text: '#53657D',
  /** ACCENT — acentos pequeños, promociones puntuales. */
  accent: '#EE761B',
  /** REWARD / GOLD — puntos, recompensas, fidelización, progreso en Club. */
  reward: '#EEBD1B',
} as const;

/**
 * Convierte un HEX de 6 dígitos a "rgba(r, g, b, alpha)".
 * Único mecanismo permitido para crear variaciones de los colores oficiales.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Tonos derivados — DECISIÓN TÉCNICA PENDIENTE DE APROBACIÓN.
 * El usuario dio 4 ejemplos permitidos de rgba (ver instrucciones, sección 3);
 * el resto de estos nombres/alphas son una propuesta razonable siguiendo el
 * mismo patrón, no un valor confirmado explícitamente uno por uno.
 */
const derived = {
  /** Borde estándar de inputs/cards — TEXT al 16% (ejemplo dado por el usuario). */
  border: hexToRgba(official.text, 0.16),
  /** Línea divisoria sutil entre secciones — TEXT al 8% (ejemplo dado por el usuario). */
  divider: hexToRgba(official.text, 0.08),
  /** Texto/ícono atenuado (placeholders, metadata secundaria) — TEXT al 40% (ejemplo dado por el usuario). */
  muted: hexToRgba(official.text, 0.4),
  /** Fondo de estado disabled sobre superficies claras — TEXT al 16%. Los componentes interactivos (Button, etc.) usan además `opacity` en vez de un color nuevo, por regla explícita. */
  disabledSurface: hexToRgba(official.text, 0.16),
  /** Resalte al presionar un elemento con acento primario — PRIMARY al 10% (ejemplo dado por el usuario). */
  pressedPrimarySurface: hexToRgba(official.primary, 0.1),
  /** Scrim de overlay/modal — TEXT al 40%. */
  overlay: hexToRgba(official.text, 0.4),
} as const;

export const colors = {
  ...official,
  ...derived,
} as const;

export type ColorToken = keyof typeof colors;
