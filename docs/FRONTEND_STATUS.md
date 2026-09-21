# Frontend Status — Bite Club

Frontend navegable en modo local/mock, preparado para revisión visual en Expo. `supabase/migrations/` permanece sin cambios.

## Pantallas

| Pantalla | Estado |
|---|---|
| Inicio | Logo real, hero Mordida Nica, Club, Lo más pedido, destacado, ofertas, últimos pedidos |
| Club | MemberCard, puntos, QR placeholder, recompensas e historial |
| Pedir | búsqueda, categorías, grid responsivo, precios y carrito |
| Ofertas | EmptyState sin promociones inventadas |
| Más | perfil, pedidos, direcciones, notificaciones, soporte |
| Producto | galería responsiva, precio, descripción, salsas/extras, total y CTA |
| Carrito | cantidades, eliminar, subtotal y continuar |
| Delivery | Delivery/Retiro + dirección mock |
| Direcciones | CRUD local |
| Checkout | resumen y confirmación mock |
| Confirmación | número y resumen local |
| Tracking | timeline de 5 estados |
| Historial | pedidos mock + repetir |
| Rewards | detalle mock |
| Puntos | historial mock |
| Perfil | edición local |
| Notificaciones | estados mock |
| Soporte | categorías de ayuda, sin canales inventados |

## Assets activos

- 4 fuentes oficiales cargadas con `expo-font`.
- 4 assets de marca oficiales.
- icon, adaptive icon, monochrome icon y favicon oficiales.
- splash nativo oficial.
- `splash-animation.mp4` integrado con `expo-video`.
- 25 fotografías optimizadas de B's Bite, Cheesy Bite, Mediterránea, Mordida Nica y Sweet Bite.

Los masters fotográficos originales no fueron sobrescritos. Ver `ASSET_MAPPING.md`.

## Mordida Nica

- `featured: true`
- `starProduct: true`
- primera en “Lo más pedido”
- hero principal del Home
- 8 fotografías en galería

## Menú

Precios/descripciones del menú oficial cargados. La nota de donación de $1 pertenece a **Papas Bravas**. En milk shakes, postres y bebidas sin descripción oficial no se inventa copy descriptivo.

## Pendiente de backend

- Auth real.
- persistencia de carrito/pedidos/direcciones.
- catálogo dinámico desde Supabase.
- puntos/canje real.
- pagos.
- tracking real.
- push notifications.
- QR real.

## Validación local requerida

En Windows, desde `mobile/`:

```powershell
npm.cmd install
npx.cmd expo install --fix
npx.cmd expo-doctor
npm.cmd run typecheck
npm.cmd start
```
