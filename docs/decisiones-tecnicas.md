# Decisiones técnicas

| Fecha | Decisión | Razón |
|---|---|---|
| 2026-09-17 | Base de datos: Supabase (Postgres) | Lógica de puntos/pedidos/ofertas es relacional; Auth incluido (email, Google, Facebook, Apple); RLS nativo. |
| 2026-09-17 | Región Supabase: us-east-1 | Menor latencia desde Nicaragua entre las opciones disponibles en el plan gratuito. |
| 2026-09-18 | App móvil: React Native + Expo + TypeScript estricto | Una sola base de código para iOS y Android; EAS Build permite compilar y publicar a ambas tiendas sin necesitar una Mac física. |
| 2026-09-18 | Navegación: Expo Router | Enrutamiento basado en archivos, oficial de Expo, con tipado de rutas (`typedRoutes`). |
| 2026-09-18 | Panel admin: Next.js en Vercel (futuro) | Reutiliza el mismo proyecto de Supabase; Vercel ya está disponible en el flujo de trabajo. |
| 2026-09-18 | Sesión persistida con expo-secure-store | React Native no tiene `localStorage`; SecureStore cifra la sesión en el dispositivo. |
| 2026-09-18 | Carpeta de la app móvil renombrada a `mobile/` | Claridad del monorepo: `mobile/`, `admin/`, `api/` como hermanos al mismo nivel. |
| 2026-09-18 | Expo SDK fijado en 57 (estable) | Explícitamente pedido — SDK 58 aún no se usa por estar fuera del rango deseado para el inicio del proyecto (septiembre 2026). |
| 2026-09-18 | Navegación con nombres propios: Inicio, Club, Pedir, Ofertas, Más | Sin nomenclatura ni referencias de ninguna marca de terceros. |

## Pendientes de decisión

- Proveedor de pagos
- Proveedor/flota de delivery
- **Versiones exactas de dependencias de Expo SDK 57**: este scaffold se generó en un
  entorno sin acceso al registro de npm, así que los números de versión en
  `mobile/package.json` son un punto de partida razonable, no verificado. En tu PC,
  después de `npm install`, corre:
  ```bash
  npx expo install --fix
  npx expo-doctor
  ```
  para que las versiones queden exactamente alineadas con lo que Expo SDK 57 espera, y
  para detectar cualquier incompatibilidad antes de seguir.
- Corrección de RLS de `points_balance` y política de INSERT de `order_items` — ver
  `docs/security-review.md`. Se decide junto con el diseño del motor de puntos y del
  flujo de pedidos, no en esta fase.
