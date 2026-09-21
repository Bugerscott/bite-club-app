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

## 6. Rutas (implementadas en Fase Frontend 2)

Todas construidas y navegables sobre `mobile/app/` (fuera de `(tabs)`), 100%
mock/local — sin backend real detrás de ninguna:

| Ruta | Propósito |
|---|---|
| `/product/[id]` | Detalle de producto — galería, opciones, extras, agregar al carrito |
| `/cart` | Carrito — editar cantidades, eliminar, ver total |
| `/delivery` | Elegir Delivery o Retiro + dirección |
| `/addresses` | CRUD local de direcciones |
| `/checkout` | Resumen + confirmar pedido (crea `MockOrder` local) |
| `/order-confirmation` | Confirmación con resumen y número de pedido |
| `/order-tracking` | Timeline de 5 estados del pedido actual |
| `/order-history` | Historial de pedidos mock, con "Repetir" (reconstruye carrito) |
| `/reward/[id]` | Detalle de recompensa (sin canje real) |
| `/points-history` | Historial de movimientos de puntos |
| `/profile` | Datos de perfil (mock, edición local) |
| `/notifications` | Lista de notificaciones (leída/no leída, local) |
| `/support` | Opciones de soporte (sin canales inventados) |

Todas registradas en `mobile/app/_layout.tsx` (Stack), con `/cart` presentado
como modal. `(tabs)` sigue siendo el grupo raíz de la bottom navigation.

## 7. Estado global

`mobile/src/state/`:

- `CartContext` — items del carrito (`useReducer`), con líneas separadas por
  configuración (producto + salsa + extras). Expone `addItem`,
  `incrementItem`, `decrementItem`, `removeItem`, `clearCart`, `subtotal`,
  `itemCount`.
- `AppStateContext` — método de entrega, direcciones (CRUD local), dirección
  seleccionada, pedido mock actual (`currentOrder`, usado por
  confirmación/tracking).
- `RootProviders` — combina ambos, montado en `app/_layout.tsx`.

Sin Redux/Zustand — Context + reducer es suficiente para este alcance
(instrucciones, sección 19).

## 8. Qué NO se tocó / NO se implementó en esta fase

- `supabase/` (migraciones, RLS, Auth, Storage, Edge Functions) — sin cambios.
- Sin autenticación real, pagos reales, mapas/geocoding reales ni push
  notifications reales.
- Favoritos: no implementados (el master prompt los marca como opcionales,
  "si existen").
- Assets binarios reales (fuentes, logo, íconos de app, splash animado,
  fotografía de producto) — ver `docs/FRONTEND_STATUS.md` para el detalle
  completo de qué falta y cómo activarlo.
