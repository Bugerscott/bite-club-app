/**
 * Punto de entrada único del Design System de Bite Club.
 * Todos los componentes y pantallas deben importar tokens desde aquí
 * (o desde los archivos individuales), nunca hardcodear valores.
 *
 * Fuente de verdad textual: docs/DESIGN_SYSTEM.md
 */
export { colors, hexToRgba, type ColorToken } from './colors';
export { spacing, screenPaddingHorizontal, sectionGap, type SpacingToken } from './spacing';
export { radius, type RadiusToken } from './radius';
export { sizes, type SizeToken } from './sizes';
export { shadows, type ShadowToken } from './shadows';
export { typography, fontFamily, type TypographyToken } from './typography';

import { colors } from './colors';
import { spacing, screenPaddingHorizontal, sectionGap } from './spacing';
import { radius } from './radius';
import { sizes } from './sizes';
import { shadows } from './shadows';
import { typography, fontFamily } from './typography';

/** Objeto agregador, útil para pasar "el theme completo" a un solo lugar si hace falta. */
export const theme = {
  colors,
  spacing,
  screenPaddingHorizontal,
  sectionGap,
  radius,
  sizes,
  shadows,
  typography,
  fontFamily,
} as const;

export type Theme = typeof theme;
