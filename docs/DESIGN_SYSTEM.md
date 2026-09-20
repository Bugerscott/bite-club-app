# Design System — Bite Club

Fuente de verdad textual del sistema visual. El código vive en `mobile/src/theme/`
(`colors.ts`, `spacing.ts`, `radius.ts`, `sizes.ts`, `shadows.ts`, `typography.ts`,
re-exportados desde `mobile/src/theme/index.ts`). Ningún componente o pantalla debe
usar un color, tamaño, radio o fuente escrito a mano — siempre importar de aquí.

Slogan oficial de la marca: **"Algo rico"**. No se usa ningún otro slogan en código
ni documentación.

## 1. Colores oficiales

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#E41A17` | CTA principal, botones primarios, navegación activa |
| `secondary` | `#748DAF` | Navegación inactiva, iconografía de apoyo |
| `background` | `#FFFFFF` | Fondo principal |
| `text` | `#53657D` | Títulos, cuerpo, descripciones, labels |
| `accent` | `#EE761B` | Acentos puntuales, promociones |
| `reward` | `#EEBD1B` | Puntos, recompensas, fidelización (pantalla Club) |

Estos 6 valores son los únicos HEX permitidos. Cualquier variación (borde, divider,
texto atenuado, overlay, estado disabled, superficie presionada) se deriva por
**opacidad** de estos 6 vía `hexToRgba()` — nunca se introduce un HEX nuevo.

| Token derivado | Fórmula | Uso |
|---|---|---|
| `border` | `text` @ 16% | Borde estándar de inputs/cards |
| `divider` | `text` @ 8% | Línea divisoria sutil |
| `muted` | `text` @ 40% | Texto/ícono atenuado |
| `disabledSurface` | `text` @ 16% | Fondo disabled (los componentes interactivos usan `opacity`, no este color, como mecanismo principal) |
| `pressedPrimarySurface` | `primary` @ 10% | Resalte al presionar con acento primario |
| `overlay` | `text` @ 40% | Scrim de overlays/modales/badges sobre imágenes |

⚠️ **Pendiente de aprobación**: de estos 6 derivados, el usuario dio 4 ejemplos exactos
(`border`, `divider`, `muted`, `pressedPrimarySurface`); `disabledSurface` y `overlay`
son una propuesta razonable siguiendo el mismo patrón, no confirmados uno por uno.

## 2. Tipografía

Familias oficiales:

| Token | Familia | Uso |
|---|---|---|
| `fontFamily.display` | Gliker | Logo, display, banners promocionales |
| `fontFamily.bold` | Gotham-Bold | H1, H2, CTAs fuertes |
| `fontFamily.medium` | Gotham-Medium | H3, labels, énfasis |
| `fontFamily.book` | Gotham-Book | Body, descripciones, navegación, captions |

⚠️ Los 4 archivos de fuente reales **no existen todavía** en `mobile/assets/fonts/`.
Mientras tanto, React Native cae al font del sistema automáticamente (no rompe nada).
Ver `mobile/src/hooks/useAppFonts.ts` para el mecanismo de activación futura.

Escala tipográfica (`fontSize` exacto dado por el usuario; `lineHeight` es una
propuesta ~1.25–1.35, **pendiente de aprobación**):

| Token | Familia | Size | Line-height |
|---|---|---|---|
| `display` | Gliker | 40 | 48 |
| `h1` | Gotham-Bold | 30 | 38 |
| `h2` | Gotham-Bold | 22 | 28 |
| `h3` | Gotham-Medium | 18 | 24 |
| `body` | Gotham-Book | 16 | 22 |
| `caption` | Gotham-Book | 13 | 18 |
| `micro` | Gotham-Book | 11 | 14 |

## 3. Spacing

Escala base: `4, 8, 12, 16, 20, 24, 32, 40` → tokens `xs, sm, md, base, lg, xl, xxl, xxxl`.

- Padding horizontal de pantalla: `spacing.lg` (20) — aplicado por el componente `Screen`.
- Separación entre secciones: `sectionGap.compact` (16, bloques relacionados) o
  `sectionGap.standard` (24, entre bloques principales) — decisión por pantalla.

## 4. Radios

| Token | Valor | Uso |
|---|---|---|
| `card` | 20 | Card principal |
| `button` | 16 | Botón |
| `input` | 16 | Input |
| `pill` | 999 | Pill/chip |
| `iconButton` | 999 | Icon button circular (con contenedor 44×44) |

## 5. Tamaños base

| Token | Valor | Uso |
|---|---|---|
| `ctaHeight` | 56 | Altura mínima de CTA principal |
| `iconButton` | 44 | Icon button |
| `touchTargetMin` | 44 | Target táctil mínimo (accesibilidad) |

## 6. Sombras

Una sola sombra suave (`shadows.soft`), reutilizada en todas las cards — nunca una
sombra distinta por pantalla. iOS: `shadowOpacity 0.08`, `shadowRadius 8`. Android:
`elevation 2`. `shadows.none` para elementos sin elevación.

## 7. Iconografía

`@expo/vector-icons`, familia **Feather** (trazo fino, consistente con el estilo
general). Activo: `colors.primary`. Inactivo/secundario: `colors.secondary` o
`colors.text` según contexto. Tamaño estándar de ícono en botón: 20–22px.

## 8. Componentes: estados

Todo componente interactivo soporta, como mínimo:

- **Default** — estilo base.
- **Pressed** — `opacity` reducida (0.7–0.9 según componente), sin color nuevo.
- **Disabled** — `opacity: 0.4`, sin color gris nuevo, sin interacción.
- **Loading** (solo `Button`) — reemplaza el label por `ActivityIndicator`, mismo tamaño.

Estados de pantalla (no de componente individual): `LoadingState`, `EmptyState`,
`ErrorState` — genéricos, reutilizables en cualquier pantalla futura.

## 9. Accesibilidad

- Todo elemento presionable tiene `accessibilityRole="button"` y
  `accessibilityLabel` (explícito o heredado del texto visible).
- Targets táctiles ≥ 44×44 (`sizes.touchTargetMin`).
- `accessibilityState={{ disabled, selected, busy }}` donde aplica.
- Elementos puramente decorativos (`Divider`) están ocultos a lectores de pantalla.

## 10. Safe area

El componente `Screen` aplica `SafeAreaView` con `edges: ['top', 'left', 'right']`
por defecto (el borde inferior lo maneja la bottom navigation). Toda pantalla debe
envolver su contenido con `Screen` en vez de armar su propio manejo de safe area.
