import type { TextStyle } from 'react-native';

/**
 * Tipografía oficial de Bite Club.
 * FUENTE: BITE_CLUB_FRONTEND_MASTER_PROMPT.md, secciones 4-5 (confirma y
 * reemplaza los nombres de familia propuestos en Fase Frontend 1 — la escala
 * de tamaños/line-heights ya coincidía exactamente).
 *
 * ⚠️ Los 4 archivos de fuente reales TODAVÍA NO existen en
 * mobile/assets/fonts/ (ver README en esa carpeta y src/hooks/useAppFonts.ts).
 * Mientras no se carguen, estos nombres de familia no resuelven a nada
 * embebido y React Native cae automáticamente al font del sistema — la app
 * sigue compilando y renderizando sin romperse.
 */
export const fontFamily = {
  /** Logo, display, "Algo rico", promociones, elementos gráficos importantes. */
  display: 'GlikerBlack',
  /** H1, H2, títulos importantes. */
  bold: 'GothamBold',
  /** H3, botones, navegación, labels, precios destacados. */
  medium: 'GothamMedium',
  /** Body, ingredientes, descripciones, textos secundarios. */
  book: 'GothamBook',
} as const;

interface TypeStyle extends Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'> {}

/** Escala tipográfica — fuente: master prompt, sección 4 (valores exactos). */
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
