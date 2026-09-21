# app/ — Assets nativos de la app (íconos, splash)

Archivos esperados (nombres exactos, fuente: master prompt sección 6-7):

| Archivo | Uso en `app.json` |
|---|---|
| `Bite-Club-_adaptive-icon.png` | `android.adaptiveIcon.foregroundImage` |
| `Bite-Club-_favicon.png` | `web.favicon` |
| `Bite-Club-_icon.png` | `icon` |
| `Bite-Club-_monochrome-icon.png` | `android.adaptiveIcon.monochromeImage` (si el SDK lo soporta) |
| `Bite-Club-_splash-logo-static.png` | plugin `expo-splash-screen` → `image` |
| `splash-animation.mp4` | Splash animado (ver sección 7 del master prompt) |

⚠️ **Ninguno de estos 6 archivos existe todavía en esta carpeta.** `app.json`
sigue apuntando a los placeholders técnicos generados en Fase Frontend 1
(`mobile/assets/images/`) — no se referencian aquí archivos que no existen,
para no romper el build de Expo.

## Cómo activar (íconos y splash estático)

1. Copiar los 5 archivos de imagen aquí con los nombres exactos de la tabla.
2. En `mobile/app.json`, actualizar:
   - `icon`: `./assets/app/Bite-Club-_icon.png`
   - `android.adaptiveIcon.foregroundImage`: `./assets/app/Bite-Club-_adaptive-icon.png`
   - `android.adaptiveIcon.backgroundColor`: `#E41A17`
   - `android.adaptiveIcon.monochromeImage` (si el SDK lo soporta): `./assets/app/Bite-Club-_monochrome-icon.png`
   - `web.favicon`: `./assets/app/Bite-Club-_favicon.png`
   - plugin `expo-splash-screen` → `image`: `./assets/app/Bite-Club-_splash-logo-static.png`, `backgroundColor: "#FFFFFF"`
3. Eliminar los placeholders antiguos de `mobile/assets/images/` **solo después**
   de verificar que las nuevas rutas cargan correctamente en Expo.

## Cómo activar (splash animado MP4)

Ver `mobile/src/hooks/useSplashVideoReady.ts` — coordinación ya implementada
en `mobile/app/_layout.tsx` vía `SplashScreen.preventAutoHideAsync()`, lista
para activar el video en cuanto `splash-animation.mp4` exista aquí.
