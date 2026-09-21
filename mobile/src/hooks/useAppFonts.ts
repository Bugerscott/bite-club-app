/**
 * Carga de fuentes personalizadas de Bite Club (GlikerBlack, GothamBook,
 * GothamMedium, GothamBold) — fuente: master prompt, secciones 4 y 7.
 *
 * ⚠️ ESTADO ACTUAL: los 4 archivos de fuente reales TODAVÍA NO existen en
 * mobile/assets/fonts/ (ver README en esa carpeta para el detalle exacto de
 * qué archivos hacen falta: Gotham-Bold.ttf, Gotham-Book.otf,
 * Gotham-Medium.otf, Gliker-Black.ttf).
 *
 * Por eso este hook NO llama todavía a `useFonts()` de expo-font con
 * `require()` apuntando a archivos que no existen — eso rompería el bundler
 * de Metro y la app dejaría de compilar. En su lugar, retorna `loaded: true`
 * de inmediato: los textos que usan los tokens de theme/typography.ts (que ya
 * referencian 'GlikerBlack', 'GothamBook', 'GothamMedium', 'GothamBold') caen
 * automáticamente al font del sistema mientras tanto, sin romper nada.
 *
 * CUÁNDO ACTIVAR LAS FUENTES REALES:
 * 1. Coloca los 4 archivos en mobile/assets/fonts/ con los nombres exactos
 *    documentados en el README de esa carpeta.
 * 2. Descomenta el bloque `useFonts(...)` de abajo.
 * 3. Borra el `return` temporal que sigue después del bloque comentado.
 */

// import { useFonts } from 'expo-font';

export interface AppFontsResult {
  loaded: boolean;
  error: Error | null;
}

export function useAppFonts(): AppFontsResult {
  // const [loaded, error] = useFonts({
  //   GlikerBlack: require('../../assets/fonts/Gliker-Black.ttf'),
  //   GothamBook: require('../../assets/fonts/Gotham-Book.otf'),
  //   GothamMedium: require('../../assets/fonts/Gotham-Medium.otf'),
  //   GothamBold: require('../../assets/fonts/Gotham-Bold.ttf'),
  // });
  // return { loaded, error: error ?? null };

  return { loaded: true, error: null };
}
