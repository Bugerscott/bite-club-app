/**
 * Tokens de motion de Bite Club — fuente de verdad para cualquier
 * animación (Reanimated). Ningún componente debe hardcodear su propia
 * duración/spring — siempre importar de aquí, igual que colors/spacing.
 */
export const duration = {
  /** Feedback inmediato (press, chip). */
  fast: 150,
  /** Transición estándar (fade, slide de card). */
  normal: 250,
  /** Transiciones más notorias (splash, entrada de secciones). */
  slow: 400,
} as const;

export const spring = {
  /** Botones, press feedback — suave, sin rebote visible. */
  gentle: { damping: 18, stiffness: 220, mass: 0.9 },
  /** Indicador de navegación (tab bar) — firme, con leve overshoot. */
  snappy: { damping: 14, stiffness: 200, mass: 0.8 },
  /** Blob líquido de la tab bar — deformación orgánica. */
  liquid: { damping: 10, stiffness: 160, mass: 1 },
} as const;

export const scale = {
  /** Escala al presionar botones/cards (0.96–0.98 por instrucciones). */
  pressed: 0.97,
  default: 1,
} as const;

export type MotionDuration = keyof typeof duration;
export type MotionSpring = keyof typeof spring;
