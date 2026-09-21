/**
 * Gate de reproducción del splash animado (mobile/assets/app/splash-animation.mp4
 * — instrucciones, sección 7).
 *
 * ⚠️ ESTADO ACTUAL: el archivo de video real TODAVÍA NO existe en
 * mobile/assets/app/. Igual que con las fuentes (ver useAppFonts.ts), no se
 * hace `require()` de un archivo inexistente — eso rompería Metro. Este hook
 * retorna `ready: true` de inmediato, así el splash nativo estático se oculta
 * normalmente y la app entra directo (sin el paso de video) mientras el
 * archivo no exista.
 *
 * CUÁNDO ACTIVAR EL VIDEO REAL:
 * 1. Agregar `mobile/assets/app/splash-animation.mp4` (ver README de esa carpeta).
 * 2. Agregar la dependencia `expo-video` (ya documentada en package.json/
 *    decisiones-tecnicas.md con convención "*").
 * 3. Reemplazar este hook por una pantalla `SplashVideoScreen` que reproduzca
 *    el video una sola vez (autoplay, muted, sin loop, sin controles,
 *    pantalla completa, respetando aspect ratio) y llame a `onFinish` al
 *    terminar (o si el video falla) para entrar a la app.
 * 4. Coordinar con `SplashScreen.preventAutoHideAsync()` en app/_layout.tsx
 *    (ya implementado ahí) para que el splash nativo no se oculte hasta que
 *    fuentes + video estén listos.
 */
export interface SplashVideoReadyResult {
  ready: boolean;
}

export function useSplashVideoReady(): SplashVideoReadyResult {
  return { ready: true };
}
