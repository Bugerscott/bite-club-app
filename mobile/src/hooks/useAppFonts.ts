/**
 * Carga de fuentes personalizadas de Bite Club (Gliker, Gotham Book/Medium/Bold).
 *
 * ⚠️ ESTADO ACTUAL: los 4 archivos de fuente reales TODAVÍA NO existen en
 * mobile/assets/fonts/ (ver README en esa carpeta para el detalle exacto de
 * qué archivos hacen falta).
 *
 * Por eso este hook NO llama todavía a `useFonts()` de expo-font con
 * `require()` apuntando a archivos que no existen — eso rompería el bundler
 * de Metro y la app dejaría de compilar. En su lugar, retorna `loaded: true`
 * de inmediato: los textos que usan los tokens de theme/typography.ts (que ya
 * referencian 'Gotham-Book', 'Gotham-Medium', 'Gotham-Bold', 'Gliker') caen
 * automáticamente al font del sistema mientras tanto, sin romper nada.
 *
 * CUÁNDO ACTIVAR LAS FUENTES REALES:
 * 1. Coloca los 4 archivos en mobile/assets/fonts/ con los nombres exactos
 *    documentados en el README de esa carpeta.
 * 2. Descomenta el bloque `useFonts(...)` de abajo.
 * 3. Borra el `return` temporal que sigue después del bloque comentado.
 * 4. Ajusta las extensiones de archivo (.otf / .ttf) si no coinciden con el
 *    ejemplo — deben coincidir exactamente con lo que entregues.
 */

// import { useFonts } from 'expo-font';

export interface AppFontsResult {
  loaded: boolean;
  error: Error | null;
}

export function useAppFonts(): AppFontsResult {
  // const [loaded, error] = useFonts({
  //   'Gliker': require('../../assets/fonts/Gliker.otf'),
  //   'Gotham-Book': require('../../assets/fonts/Gotham-Book.otf'),
  //   'Gotham-Medium': require('../../assets/fonts/Gotham-Medium.otf'),
  //   'Gotham-Bold': require('../../assets/fonts/Gotham-Bold.otf'),
  // });
  // return { loaded, error: error ?? null };

  return { loaded: true, error: null };
}
