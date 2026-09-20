# ⚠️ Fuentes pendientes — archivos que necesito que me proporciones

Esta carpeta está preparada para recibir las fuentes oficiales de Bite Club, pero
**todavía no contiene ningún archivo real**. No se generaron ni sustituyeron fuentes
falsas — eso está explícitamente prohibido.

## Archivos esperados

| Familia | Nombre de archivo esperado (ejemplo) | Uso |
|---|---|---|
| Gliker | `Gliker.otf` (o `.ttf`) | Logo, display, titulares gráficos, banners |
| Gotham Book | `Gotham-Book.otf` (o `.ttf`) | Body, descripción, navegación, captions |
| Gotham Medium | `Gotham-Medium.otf` (o `.ttf`) | H3, labels, énfasis, botones secundarios |
| Gotham Bold | `Gotham-Bold.otf` (o `.ttf`) | H1, H2, títulos principales, CTA fuertes |

**No conozco la extensión real de tus archivos** (`.otf` vs `.ttf`) ni si existen variantes
adicionales (Italic, Light, etc.). Los nombres de arriba son el punto de partida que ya
está referenciado en el código (ver `src/hooks/useAppFonts.ts`, comentado).

## Qué hacer cuando tengas los archivos

1. Copia los 4 archivos a esta carpeta (`mobile/assets/fonts/`).
2. Si el nombre de archivo no coincide exactamente con la tabla de arriba, avísame o
   ajústalo tú mismo en `src/hooks/useAppFonts.ts`.
3. Descomenta el bloque `useFonts(...)` en `src/hooks/useAppFonts.ts` (instrucciones
   dentro del mismo archivo).
4. Corre `npx expo install expo-font` si aún no está resuelta esa dependencia (ya está
   declarada en `package.json`, ver `docs/decisiones-tecnicas.md`).
5. Verifica con `npm run typecheck` y `npx expo start` que todo cargue bien.

## Mientras tanto

El resto de la app **no se rompe** por la ausencia de estos archivos: los estilos de
`src/theme/typography.ts` ya usan los nombres de familia correctos, y React Native cae
automáticamente al font del sistema hasta que las fuentes reales estén cargadas.
