/**
 * Sistema de espaciado de Bite Club.
 * FUENTE: instrucciones del usuario, sección "7. SPACING".
 *
 * Escala base: 4, 8, 12, 16, 20, 24, 32, 40.
 * No usar valores de spacing arbitrarios dentro de pantallas o componentes —
 * siempre referenciar estos tokens.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

/** Padding horizontal principal de pantalla (instrucciones, sección 7). */
export const screenPaddingHorizontal = spacing.lg; // 20

/**
 * Separación estándar entre secciones: 16 o 24 "según jerarquía" (instrucciones,
 * sección 7, textual). Se exponen ambos; cada pantalla elige cuál según el peso
 * visual de la sección — no es una decisión que se pueda fijar en un solo número.
 */
export const sectionGap = {
  compact: spacing.base, // 16 — secciones relacionadas / mismo bloque
  standard: spacing.xl, // 24 — separación entre bloques principales
} as const;

export type SpacingToken = keyof typeof spacing;
