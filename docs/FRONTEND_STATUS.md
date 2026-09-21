# Frontend Status — Bite Club (Fase Frontend 2)

Estado del frontend navegable/mock construido a partir de
`BITE_CLUB_FRONTEND_MASTER_PROMPT.md`. Todo funciona en modo mock/local — sin
tocar `supabase/migrations/` ni ningún backend real.

## Pantallas terminadas

| Pantalla | Ruta | Estado |
|---|---|---|
| Inicio | `(tabs)/index.tsx` | Completa: header, hero Mordida Nica, Club, Lo más pedido, destacado, preview de ofertas, últimos pedidos |
| Club | `(tabs)/club.tsx` | Completa: MemberCard, PointsCard, QR placeholder, link a historial, grid de recompensas |
| Pedir (menú) | `(tabs)/order.tsx` | Completa: buscador, chips de categoría, grid de productos, barra de carrito flotante |
| Ofertas | `(tabs)/offers.tsx` | Completa como EmptyState (no hay promociones oficiales — sección 26) |
| Más | `(tabs)/more.tsx` | Completa: accesos a perfil, pedidos, direcciones, notificaciones, soporte, versión |
| Detalle de producto | `product/[id].tsx` | Completa: galería, salsas (Algo Rico), extras, stepper, total dinámico, CTA sticky |
| Carrito | `cart.tsx` | Completa: editar cantidad, eliminar, total, EmptyState |
| Entrega | `delivery.tsx` | Completa: Delivery/Retiro, selección de dirección |
| Direcciones | `addresses.tsx` | Completa: listar, seleccionar, crear, editar, eliminar (local) |
| Checkout | `checkout.tsx` | Completa: resumen, entrega, pago mock, confirmar |
| Confirmación | `order-confirmation.tsx` | Completa: número de pedido, resumen, acciones |
| Tracking | `order-tracking.tsx` | Completa: timeline de 5 estados |
| Historial | `order-history.tsx` | Completa: cards con "Repetir" (reconstruye carrito) |
| Detalle de recompensa | `reward/[id].tsx` | Completa: estado, CTA según disponibilidad (sin canje real) |
| Historial de puntos | `points-history.tsx` | Completa: lista de movimientos |
| Perfil | `profile.tsx` | Completa: nombre/correo/teléfono, edición local |
| Notificaciones | `notifications.tsx` | Completa: leída/no leída (local), EmptyState |
| Soporte | `support.tsx` | Completa: 3 opciones, sin canales inventados |

## Splash — estático y animado

- Splash nativo estático: sigue usando el placeholder de Fase 1
  (`mobile/assets/images/splash.png`) vía el plugin `expo-splash-screen`. El
  asset real (`Bite-Club-_splash-logo-static.png`) todavía no fue entregado —
  ver `mobile/assets/app/README.md`.
- Splash animado (MP4): plumbing implementado en `app/_layout.tsx`
  (`SplashScreen.preventAutoHideAsync()` + gate de fuentes/video) y en
  `src/hooks/useSplashVideoReady.ts`. El archivo `splash-animation.mp4` no
  existe todavía, así que el hook retorna `ready: true` de inmediato y la app
  entra directo tras el splash estático (sin reproducir video) — mismo patrón
  que las fuentes. Dependencia `expo-video` ya agregada a `package.json`.

## Carga de fuentes

Nombres de familia renombrados exactamente como pide el master prompt
(`GlikerBlack`, `GothamBold`, `GothamMedium`, `GothamBook`) en
`src/theme/typography.ts`. `useAppFonts()` sigue sin activar `useFonts()` real
— los 4 archivos (`Gotham-Bold.ttf`, `Gotham-Book.otf`, `Gotham-Medium.otf`,
`Gliker-Black.ttf`) no existen en `mobile/assets/fonts/`. La app renderiza con
el font del sistema mientras tanto, sin romper el build.

## Fotografías

Ninguna fotografía real fue entregada. `src/lib/productImages.ts` centraliza
la resolución `imageKey -> imagen`, vacío por ahora (todo resuelve a
placeholder visual). Los 5 productos con fotografía real anunciada (B's Bite,
Cheesy Bite, Mediterránea, Mordida Nica, Sweet Bite) ya tienen sus `imageKey`
cargados en `mocks/products.ts` con la convención de nombre sugerida —
Mordida Nica con 4 keys (galería más amplia, producto estrella). Ver
`mobile/assets/products/README.md` para activarlas.

## Mordida Nica — producto estrella

- `featured: true`, `starProduct: true` en `mocks/products.ts`.
- Hero principal de Inicio (`HeroBanner`, primer elemento de la jerarquía tras
  el header).
- Galería de 4 imágenes en el detalle de producto (vs. 1 del resto).
- Aparece en "Lo más pedido" como cualquier otro producto disponible.

## Menú cargado

Los 18 ítems del menú oficial (sección 10) están en `mocks/products.ts` con
nombre, categoría, descripción, precio e `includesFries` textuales — sin
inventar combinaciones. 5 categorías reales en `mocks/categories.ts`. 6
extras reales en `mocks/extras.ts`. "Algo Rico" incluye las 4 salsas
oficiales y el texto de donación (sección 10, sin convertirlo en slogan).

## Carrito

`CartContext` (Context + `useReducer`) en `src/state/`. Cada línea es una
combinación única de producto + salsa + extras; agregar el mismo producto con
la misma configuración suma cantidad en vez de duplicar línea. Subtotal e
`itemCount` calculados en tiempo real; badge de contador visible en el ícono
de "Pedir" de la bottom nav.

## Checkout (mock)

`/checkout` arma un `MockOrder` local a partir del carrito (items, subtotal,
total, método de entrega, dirección), lo guarda en `AppStateContext`, limpia
el carrito y navega a `/order-confirmation`. Sin pasarela de pago real — el
método de pago mostrado es un texto neutral fijo ("Pago al recibir (mock)").

## Club / Rewards

`PointsCard` + `MemberCard` con `mockMember.pointsBalance`. QR es un bloque
placeholder explícito (`[DEV]`), sin librería de generación de QR real
integrada todavía. Recompensas reutilizan los 3 estados ya definidos en Fase
1 (`available`/`locked`/`redeemed`) — sin reglas comerciales definitivas
inventadas, tal como pide la sección 15.

## Datos que siguen siendo mocks

- Todo el catálogo de recompensas (`mocks/rewards.ts`) — nombres/costos de
  ejemplo, no aprobados.
- Historial de puntos, notificaciones, direcciones, pedidos de ejemplo —
  todos con prefijo `[DEV]` donde el copy es inventado.
- Perfil de usuario (nombre/correo/teléfono) — placeholder, no ligado a Auth.
- QR de Club — bloque visual, no un código real.

## Funciones pendientes de backend

- Autenticación real (login, sesión persistida contra Supabase Auth).
- Persistencia real de carrito/pedidos/direcciones (hoy solo en memoria —
  se pierde al cerrar la app).
- Motor real de puntos (acumulación/canje) — hoy `pointsBalance` es un mock
  fijo; ver además `docs/security-review.md` sobre `points_balance`.
- Catálogo de productos/ofertas/recompensas real desde Supabase.
- Pagos reales, tracking con datos reales de un sistema de delivery, push
  notifications reales, generación de QR real.

## Dependencias nuevas

`@expo/vector-icons`, `expo-font` (Fase 1) + `expo-video` (Fase 2, splash
animado) — todas con convención `"*"`, documentadas en
`docs/decisiones-tecnicas.md`.

## Limitaciones conocidas

- Sin `npm install` en este entorno (registro de npm bloqueado) — no se
  pudo ejecutar `npm run typecheck` ni `npx expo-doctor` de verdad; se hizo
  un pase de sintaxis con `tsc` global (ver reporte de entrega para el
  resultado exacto).
- El estado (carrito, direcciones, pedido actual) es 100% en memoria — se
  reinicia al recargar la app (esperado en esta fase, sin persistencia).
- Sin mapas/geocoding — selección de dirección es una lista local, no un mapa
  interactivo (tal como pide la sección 21).

## Cómo recorrer todo en Expo

Ver el punto 20 del reporte de entrega (instrucciones exactas para abrir el
proyecto, instalar dependencias y navegar cada pantalla).
