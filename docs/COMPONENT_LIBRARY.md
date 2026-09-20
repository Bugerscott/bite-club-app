# Component Library — Bite Club

Todos los componentes viven en `mobile/src/components/`, con barrel export en
`mobile/src/components/index.ts`. Todos importan tokens desde `../theme` — cero
valores hardcodeados. Este documento resume props y uso; el código fuente es la
referencia definitiva.

## Layout / estructura

### `Screen`
Contenedor base de pantalla: SafeArea + fondo + padding horizontal estándar.
- `children: ReactNode`
- `scroll?: boolean` — envuelve en `ScrollView` (default `false`)
- `edges?: Edge[]` — default `['top', 'left', 'right']`
- `contentStyle?: StyleProp<ViewStyle>`

### `Divider`
Línea divisoria sutil (`colors.divider`, 1px), oculta a accesibilidad.
- `style?: StyleProp<ViewStyle>`

### `SectionHeader`
Título de sección + subtítulo opcional + acción de texto opcional ("Ver más").
- `title: string`
- `subtitle?: string`
- `actionLabel?: string`
- `onActionPress?: () => void`

## Botones

### `Button`
Botón principal. Variantes: `primary` (fondo rojo), `secondary` (borde rojo,
fondo blanco), `ghost` (sin fondo/borde). Disabled solo vía `opacity`.
- `label: string`
- `onPress: () => void`
- `variant?: 'primary' | 'secondary' | 'ghost'` (default `'primary'`)
- `disabled?: boolean`
- `loading?: boolean` — reemplaza el label por spinner
- `accessibilityLabel?: string`
- `style?: StyleProp<ViewStyle>`

### `IconButton`
Botón circular de ícono, 44×44 (`sizes.iconButton`). Usa Feather.
- `name: Feather icon name`
- `onPress: () => void`
- `accessibilityLabel: string` (requerido)
- `disabled?: boolean`
- `filled?: boolean` — fondo circular visible (para íconos sobre imágenes)
- `style?: StyleProp<ViewStyle>`

## Contenido / datos

### `PriceBadge`
Muestra un precio formateado (`C$`) o `—` si `price` es `null`. Opcionalmente
muestra un precio anterior tachado.
- `price: number | null`
- `originalPrice?: number | null`

### `CategoryChip`
Chip de filtro/categoría, pill. Estado `selected` con fondo `primary`.
- `label: string`
- `selected?: boolean`
- `onPress: () => void`

### `QuantityStepper`
Selector +/- de cantidad (para futura pantalla de Producto/Carrito).
- `quantity: number`
- `onIncrease: () => void`
- `onDecrease: () => void`
- `min?: number` (default 1)
- `max?: number` (default 99)

## Cards

### `ProductCard`
Card de producto del menú: imagen, nombre, descripción corta, precio, badge
opcional (`nuevo`/`popular`), overlay de "No disponible" si `available: false`.
- `product: Product`
- `onPress?: () => void`
- `imageSource?: { uri: string } | number | null`

### `PromoCard`
Card de oferta/promoción: imagen, título, descripción, precio con precio
anterior tachado, overlay de "Vencida" si `active: false`.
- `offer: PromoOffer`
- `onPress?: () => void`
- `imageSource?: { uri: string } | number | null`

### `RewardCard`
Card de recompensa: imagen, nombre, costo en puntos (`colors.reward`), estado
(`available`/`locked`/`redeemed`) — solo interactiva si `available`.
- `reward: RewardItem`
- `onPress?: () => void`
- `imageSource?: { uri: string } | number | null`

### `HeroBanner`
Banner destacado grande (carrusel de Inicio): imagen de fondo, overlay oscuro,
título y subtítulo.
- `title: string`
- `subtitle?: string`
- `onPress?: () => void`
- `imageSource?: { uri: string } | number | null`

### `PointsCard`
Card de saldo de puntos (pantalla Club): valor grande, barra de progreso
opcional hacia el próximo hito.
- `pointsBalance: number`
- `nextMilestone?: number | null`

### `MemberCard`
Card de identidad del miembro (pantalla Club): avatar, nombre, fecha de
membresía formateada.
- `member: MockMember`

## Estados

### `EmptyState`
Estado vacío genérico: ícono, título, descripción opcional, acción opcional.
- `icon?: Feather icon name` (default `'inbox'`)
- `title: string`
- `description?: string`
- `actionLabel?: string`
- `onActionPress?: () => void`

### `LoadingState`
Spinner centrado + label.
- `label?: string` (default `'Cargando...'`)

### `ErrorState`
Ícono de alerta, título, descripción, botón de reintentar opcional.
- `title?: string`
- `description?: string`
- `retryLabel?: string`
- `onRetry?: () => void`

## Convenciones comunes

- Todo componente exporta su interfaz de props (`export interface XProps`).
- Estilos con `StyleSheet.create`, nunca inline salvo composición de arrays.
- Imágenes: prop `imageSource` opcional; sin ella se renderiza un placeholder
  de color sólido (`colors.divider`) — todavía no hay mapa de `imageKey` → asset
  real ni Storage de Supabase conectado.
- Ningún componente contiene copy comercial, precios inventados ni datos reales
  — todo contenido de ejemplo vive en `mobile/src/mocks/` con prefijo `[DEV]`.
