import type { TextStyle } from 'react-native';

/** Familias tipográficas oficiales cargadas por `useAppFonts`. */
export const fontFamily = {
  display: 'GlikerBlack',
  bold: 'GothamBold',
  medium: 'GothamMedium',
  book: 'GothamBook',
} as const;

interface TypeStyle extends Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'> {}

/** Escala tipográfica oficial de Bite Club + roles reutilizables de UI. */
export const typography = {
  display: { fontFamily: fontFamily.display, fontSize: 40, lineHeight: 48 } satisfies TypeStyle,
  h1: { fontFamily: fontFamily.bold, fontSize: 30, lineHeight: 38 } satisfies TypeStyle,
  h2: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 } satisfies TypeStyle,
  h3: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 24 } satisfies TypeStyle,
  body: { fontFamily: fontFamily.book, fontSize: 16, lineHeight: 22 } satisfies TypeStyle,
  caption: { fontFamily: fontFamily.book, fontSize: 13, lineHeight: 18 } satisfies TypeStyle,
  micro: { fontFamily: fontFamily.medium, fontSize: 11, lineHeight: 14 } satisfies TypeStyle,
  promo: { fontFamily: fontFamily.display, fontSize: 22, lineHeight: 28 } satisfies TypeStyle,
  button: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22 } satisfies TypeStyle,
  navLabel: { fontFamily: fontFamily.medium, fontSize: 11, lineHeight: 14 } satisfies TypeStyle,
  price: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 24 } satisfies TypeStyle,
  sectionTitle: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 } satisfies TypeStyle,
} as const;

export type TypographyToken = keyof typeof typography;
