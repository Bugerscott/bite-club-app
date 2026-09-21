# Design System — Bite Club

Fuente de verdad del sistema visual. Los tokens viven en `mobile/src/theme/` y deben reutilizarse en componentes y pantallas.

Slogan oficial único: **“Algo rico”**.

## Colores oficiales

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#E41A17` | CTA, navegación activa, marca |
| `secondary` | `#748DAF` | navegación inactiva, apoyo |
| `background` | `#FFFFFF` | fondos y superficies |
| `text` | `#53657D` | texto principal |
| `accent` | `#EE761B` | acentos puntuales |
| `reward` | `#EEBD1B` | Club y recompensas |

Variaciones de borde, muted, overlay, pressed y disabled se derivan por opacidad mediante `hexToRgba()`; no se agregan HEX de marca nuevos.

Derivados aprobados:

- `border`: text al 16%
- `divider`: text al 8%
- `muted`: text al 40%
- `disabledSurface`: text al 16%
- `pressedPrimarySurface`: primary al 10%
- `overlay`: text al 40%

## Tipografías activas

Archivos reales en `mobile/assets/fonts/` y carga centralizada con `expo-font`:

- `GlikerBlack` → `Gliker-Black.ttf`
- `GothamBold` → `Gotham-Bold.ttf`
- `GothamMedium` → `Gotham-Medium.otf`
- `GothamBook` → `Gotham-Book.otf`

Uso:

- Gliker Black: display, “Algo rico”, promociones.
- Gotham Bold: H1/H2.
- Gotham Medium: H3, botones, navegación, labels, precios.
- Gotham Book: body, ingredientes y descripciones.

Escala:

| Token | Familia | Size | Line-height |
|---|---|---:|---:|
| `display` | GlikerBlack | 40 | 48 |
| `h1` | GothamBold | 30 | 38 |
| `h2` | GothamBold | 22 | 28 |
| `h3` | GothamMedium | 18 | 24 |
| `body` | GothamBook | 16 | 22 |
| `caption` | GothamBook | 13 | 18 |
| `micro` | GothamMedium | 11 | 14 |
| `promo` | GlikerBlack | 22 | 28 |
| `button` | GothamMedium | 16 | 22 |
| `navLabel` | GothamMedium | 11 | 14 |
| `price` | GothamMedium | 18 | 24 |
| `sectionTitle` | GothamBold | 22 | 28 |

## Spacing

Escala: `4, 8, 12, 16, 20, 24, 32, 40`.

Padding horizontal principal: 20.

## Radios

- Card: 20
- Button: 16
- Input: 16
- Pill: 999
- Icon button: circular

## Tamaños

- CTA: 56 px de alto.
- Icon button: 44×44.
- Touch target mínimo: 44×44.

## Fotografía

Usar exclusivamente assets oficiales de `mobile/assets/products/`. Mordida Nica es el producto estrella y tiene prioridad visual. No usar stock ni imágenes externas.

## Iconografía

Familia Feather mediante `@expo/vector-icons`. Activo `primary`; inactivo `secondary`.

## Accesibilidad

- Touch targets de al menos 44×44.
- `accessibilityRole`, `accessibilityLabel` y `accessibilityState` donde corresponda.
- No depender solo del color para comunicar estados.
