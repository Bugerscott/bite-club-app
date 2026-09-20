# Frontend Architecture — Bite Club (Fase Frontend 1)

## 1. Estructura de carpetas (`mobile/src/`)

```
mobile/src/
├── theme/          Design tokens (colors, spacing, radius, sizes, shadows, typography)
├── components/     Component Library reutilizable (ver docs/COMPONENT_LIBRARY.md)
├── hooks/          Hooks compartidos (useAppFonts — carga de fuentes, stub por ahora)
├── types/          Tipos TypeScript
│   ├── database.ts   Ligados 1:1 al esquema de Supabase (ver supabase/migrations/)
│   └── product.ts, category.ts, offer.ts, reward.ts, order.ts, user.ts
│                     Tipos de UI para la fase de mocks (deliberadamente separados
│                     de database.ts — ver sección 3 abajo)
├── mocks/          Datos mock tipados, consumidos por los futuros screens
├── lib/            Clientes de servicios externos (supabase.ts)
└── constants/      (vacío — placeholder para constantes futuras no cubiertas por theme/)
```

`mobile/app/` sigue el file-based routing de Expo Router y por ahora solo contiene
el grupo `(tabs)` con las 5 pantallas placeholder.

## 2. Bottom Navigation

5 tabs, con nombres propios de Bite Club (sin nomenclatura de terceros):

| Tab | Ruta | Ícono (Feather) |
|---|---|---|
| Inicio | `app/(tabs)/index.tsx` | `home` |
| Club | `app/(tabs)/club.tsx` | `star` |
| Pedir | `app/(tabs)/order.tsx` | `shopping-bag` |
| Ofertas | `app/(tabs)/offers.tsx` | `tag` |
| Más | `app/(tabs)/more.tsx` | `menu` |

Activo: `colors.primary`. Inactivo: `colors.secondary`. Configurado en
`app/(tabs)/_layout.tsx`.

## 3. Separación mocks/UI vs. tipos de Supabase

`src/types/database.ts` refleja el esquema real de Supabase (`profiles`, `rewards`,
`offers`, `orders`, `order_items`, `points_transactions`) y es la fuente de verdad
para cualquier código que hable con el backend.

Los tipos nuevos de esta fase (`Product`, `ProductCategory`, `PromoOffer`,
`RewardItem`, `MockOrderSummary`, `MockMember`) son **deliberadamente independientes**:

- No hay todavía una tabla `products`/`categories` en Supabase — el catálogo de
  menú no existe en el backend.
- `PromoOffer`/`RewardItem` tienen forma similar a `Offer`/`Reward` de
  `database.ts`, pero se mantienen separados para no acoplar el desarrollo visual
  a decisiones de esquema que todavía no se tomaron (ej. cómo se relacionan
  ofertas con productos, si las recompensas tienen categorías, etc.).
- `src/types/index.ts` exporta todos estos tipos de UI, pero **no reexporta**
  `database.ts` — se importa explícitamente cuando se necesite, para que la
  distinción quede visible en cada archivo que lo use.

**Reconciliación futura**: cuando se diseñe el backend real de catálogo/menú y el
flujo de pedidos (fuera del alcance de esta fase), estos tipos se unifican o se
mapean explícitamente unos a otros vía funciones de transformación, nunca
mezclando ambos sistemas de tipos en un mismo componente sin pasar por una capa
de mapeo.

## 4. Mocks

`src/mocks/` contiene datos estáticos tipados para poder construir y probar
componentes visualmente sin backend:

- `categories.ts` — 4 categorías estructurales (bites, sides, drinks, combos).
- `products.ts` — los 6 productos reales ya nombrados por el usuario, con
  `price: null` y descripciones marcadas `[DEV]` (sin copy comercial inventado).
- `offers.ts`, `rewards.ts`, `orders.ts`, `user.ts` — un pequeño set de entradas
  de ejemplo, todas prefijadas `[DEV]`/con precios `null`, para poder probar cada
  estado visual de `PromoCard`, `RewardCard` (available/locked/redeemed), etc.

Ningún mock representa contenido comercial real ni debe usarse como fuente para
copy o precios de producción.

## 5. Manejo de estado

En esta fase no hay gestión de estado global (no hay carrito, sesión de usuario
activa, ni llamadas a Supabase desde componentes). Los futuros screens
consumirán los mocks directamente vía import, como si fueran el resultado de una
llamada a datos — el reemplazo por datos reales (Supabase queries / RPC) es un
cambio de fuente de datos, no de estructura de componentes.

## 6. Rutas futuras (documentadas, NO implementadas en esta fase)

Cuando se autoricen las siguientes fases, se espera esta expansión de
`mobile/app/` (fuera de `(tabs)`):

| Ruta | Propósito |
|---|---|
| `/product/[id]` | Detalle de producto |
| `/cart` | Carrito |
| `/checkout` | Checkout |
| `/delivery` | Selección de método/dirección de entrega |
| `/addresses` | Gestión de direcciones guardadas |
| `/order-confirmation` | Confirmación post-pedido |
| `/order-tracking` | Seguimiento de pedido en curso |
| `/order-history` | Historial de pedidos |
| `/reward/[id]` | Detalle/canje de recompensa |
| `/points-history` | Historial de movimientos de puntos |
| `/profile` | Perfil de usuario |
| `/notifications` | Notificaciones |
| `/support` | Soporte |

Ninguno de estos archivos existe todavía — es únicamente el plan de navegación
para que el diseño de componentes de esta fase (props, tipos) sea compatible con
lo que vendrá, sin necesidad de rehacerlo.

## 7. Qué NO se tocó en esta fase

- `supabase/` (migraciones, RLS, Auth, Storage, Edge Functions) — sin cambios.
- Ninguna pantalla de `(tabs)` tiene contenido real — siguen siendo placeholders,
  ahora usando `Screen` y tokens de tipografía/color en vez de estilos sueltos.
- No hay autenticación, carrito, checkout, pedidos, puntos, pagos, mapas,
  delivery, push notifications ni panel admin implementados.
