# ⚠️ Assets temporales — reemplazar antes de compilar para las tiendas

Los 4 archivos en esta carpeta (`icon.png`, `adaptive-icon.png`, `splash.png`, `favicon.png`)
son **placeholders generados automáticamente** (rectángulos grises con texto identificador),
únicamente para que `app.json` no tenga rutas rotas mientras no existe el branding final.

**No usar estos archivos en una build de producción ni en submission a las tiendas.**

| Archivo | Tamaño | Uso |
|---|---|---|
| `icon.png` | 1024×1024 | Ícono de la app (iOS/Android) |
| `adaptive-icon.png` | 1024×1024 | Foreground del ícono adaptativo de Android |
| `splash.png` | 1284×2778 | Pantalla de carga |
| `favicon.png` | 48×48 | Ícono para la versión web (Expo web) |

Reemplázalos por los assets oficiales de Bite Club cuando estén listos, manteniendo los
mismos nombres de archivo (o actualiza las rutas en `app.json` si cambian).
