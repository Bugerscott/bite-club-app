# Component Library — Bite Club

Componentes compartidos en `mobile/src/components/`.

## Base

- `Screen`: SafeArea + padding estándar; soporta scroll.
- `Divider`: separador reutilizable.
- `SectionHeader`: título de sección + acción opcional.
- `Button`: primary, secondary y ghost; loading/disabled.
- `IconButton`: botón circular 44×44 con Feather.
- `Badge`: contador pequeño, usado en carrito.
- `SplashVideoScreen`: reproduce `splash-animation.mp4` una vez y coordina el cambio desde el splash nativo.

## Contenido

- `PriceBadge`: precio en Córdobas.
- `CategoryChip`: filtro de categorías.
- `QuantityStepper`: cantidad +/-.

## Cards

- `ProductCard`: foto, nombre, descripción opcional, precio y estado de disponibilidad. `cardWidth` permite grids responsivos.
- `PromoCard`: card de promoción.
- `RewardCard`: recompensa y estado.
- `HeroBanner`: imagen protagonista, título, subtítulo y `actionLabel` opcional.
- `PointsCard`: saldo/progreso de puntos.
- `MemberCard`: información del miembro.

## Estados

- `EmptyState`
- `LoadingState`
- `ErrorState`

## Features

En `mobile/src/features/`:

- `order/ProductOptionsPicker.tsx`
- `order/StatusTimeline.tsx`
- `cart/CartLineItem.tsx`
- `profile/AddressCard.tsx`
- `profile/NotificationRow.tsx`

Los componentes consumen tokens de `src/theme/`; las imágenes de producto se resuelven únicamente en `src/lib/productImages.ts`.
