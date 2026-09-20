import type { TextStyle } from 'react-native';

/**
 * Tipografía oficial de Bite Club.
 * FUENTE: instrucciones del usuario, secciones "4. TIPOGRAFÍA OFICIAL" y
 * "5. ESCALA TIPOGRÁFICA INICIAL".
 *
 * ⚠️ Los archivos de fuente reales (Gliker, Gotham Book/Medium/Bold) TODAVÍA
 * NO existen en mobile/assets/fonts/ (ver README en esa carpeta y
 * src/hooks/useAppFonts.ts). Mientras no se carguen, estos nombres de familia
 * no resuelven a nada embebido y React Native cae automáticamente al font del
 * sistema — la app sigue compilando y renderizando sin romperse.
 */
export const fontFamily = {
  /** Logo, display, titulares gráficos, banners promocionales. */
  display: 'Gliker',
  /** H1, H2, títulos principales, CTA fuertes. */
  bold: 'Gotham-Bold',
  /** H3, labels, énfasis, botones secundarios. */
  medium: 'Gotham-Medium',
  /** Body, descripción, navegación, captions, información secundaria. */
  book: 'Gotham-Book',
} as const;

interface TypeStyle extends Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'> {}

/**
 * Line-height por nivel — DECISIÓN TÉCNICA PENDIENTE DE APROBACIÓN.
 * El usuario definió los `fontSize` exactos (sección 5); el line-height no fue
 * especificado. Se usó una proporción ~1.25–1.35, estándar para UI, pendiente
 * de confirmar o ajustar.
 */
export const typography = {
  display: { fontFamily: fontFamily.display, fontSize: 40, lineHeight: 48 } satisfies TypeStyle,
  h1: { fontFamily: fontFamily.bold, fontSize: 30, lineHeight: 38 } satisfies TypeStyle,
  h2: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 } satisfies TypeStyle,
  h3: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 24 } satisfies TypeStyle,
  body: { fontFamily: fontFamily.book, fontSize: 16, lineHeight: 22 } satisfies TypeStyle,
  caption: { fontFamily: fontFamily.book, fontSize: 13, lineHeight: 18 } satisfies TypeStyle,
  micro: { fontFamily: fontFamily.book, fontSize: 11, lineHeight: 14 } satisfies TypeStyle,
} as const;

export type TypographyToken = keyof typeof typography;
