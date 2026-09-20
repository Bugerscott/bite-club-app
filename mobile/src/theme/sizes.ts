/**
 * Tamaños base de Bite Club.
 * FUENTE: instrucciones del usuario, sección "9. TAMAÑOS BASE".
 */
export const sizes = {
  /** Altura mínima de CTA principal. */
  ctaHeight: 56,
  /** Icon button: 44 x 44. */
  iconButton: 44,
  /** Touch target mínimo (accesibilidad) — igual al icon button. */
  touchTargetMin: 44,
} as const;

export type SizeToken = keyof typeof sizes;
