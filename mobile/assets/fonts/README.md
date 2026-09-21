# Fuentes — Bite Club

Archivos esperados (nombres exactos, fuente: master prompt sección 4):

| Archivo | Familia lógica |
|---|---|
| `Gotham-Bold.ttf` | `GothamBold` |
| `Gotham-Book.otf` | `GothamBook` |
| `Gotham-Medium.otf` | `GothamMedium` |
| `Gliker-Black.ttf` | `GlikerBlack` |

⚠️ **Ninguno de estos 4 archivos existe todavía en esta carpeta.** No usar
Gotham Narrow ni ninguna fuente sustituta — mientras no lleguen los archivos
reales, la app usa el font del sistema automáticamente (ver
`src/hooks/useAppFonts.ts`, que no rompe el build).

## Cómo activar

1. Copiar los 4 archivos aquí con los nombres exactos de la tabla.
2. Descomentar el bloque `useFonts(...)` en `mobile/src/hooks/useAppFonts.ts`.
3. Los tokens de `mobile/src/theme/typography.ts` ya usan estos nombres de
   familia (`GlikerBlack`, `GothamBold`, `GothamMedium`, `GothamBook`) — no
   requieren ningún cambio adicional.
