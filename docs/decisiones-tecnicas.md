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
| 2026-09-18 | Requisito de Node.js: 22.13.x o superior | Mínimo compatible con Expo SDK 57, según referencia oficial confirmada por el usuario. |
| 2026-09-18 | `app.json`: splash configurado vía plugin `expo-splash-screen` | La clave raíz `"splash"` es la configuración heredada de SDKs anteriores; SDK 57 usa el plugin. Mismos assets placeholder, sin romper rutas. |
| 2026-09-20 | Iconografía: `@expo/vector-icons` (familia Feather) | Estándar del ecosistema Expo, ya viene incluido en el paquete `expo`; evita depender de SVGs custom para iconos genéricos de UI (casa, estrella, bolsa, etc.). Nueva dependencia explícita, documentada en package.json. |
| 2026-09-20 | Carga de fuentes: `expo-font` (vía hook `useAppFonts`) | Necesario para activar Gliker/Gotham cuando existan los archivos reales; el hook está preparado pero NO activa `useFonts()` todavía (ver `src/hooks/useAppFonts.ts`) para no romper Metro con `require()` de archivos inexistentes. |

## Versiones de dependencias de Expo SDK 57 — origen de cada número

Este scaffold se generó en un entorno **sin acceso al registro de npm** (confirmado con
`curl`/`npm view`, ambos devuelven `403 host_not_allowed`). Para no inventar números,
`mobile/package.json` distingue dos grupos:

**A. Fijados con la referencia oficial que diste tú** (no inventados):

| Paquete | Versión fijada | Origen |
|---|---|---|
| `expo` | `~57.0.0` | SDK 57 confirmado por el usuario |
| `react` | `19.2.3` | Confirmado por el usuario |
| `react-native` | `0.86.0` | Confirmado por el usuario (0.86; se fija el patch `.0` como punto de partida) |
| `react-dom` | `19.2.3` | Inferido por convención (react-dom siempre seco la versión de react en el mismo release train) — **verificar igual con el paso siguiente** |
| Node.js (`engines.node`, y requisito del README) | `>=22.13.0` | Confirmado por el usuario |

**B. Dejados como `"*"` deliberadamente — sin inventar versión** (se resuelven en tu PC):

| Paquete | Por qué no se fijó |
|---|---|
| `expo-router` | Versión correspondiente a SDK 57 no verificable sin registro; NO se dejó `~6.0.0` (esa era de un SDK anterior) |
| `expo-status-bar`, `expo-constants`, `expo-linking`, `expo-splash-screen`, `expo-secure-store` | Cada uno tiene su propia versión ligada al SDK; no verificable sin registro |
| `react-native-safe-area-context`, `react-native-screens` | Versiones nativas ligadas al SDK; no verificable sin registro |
| `babel-preset-expo` | Ligado al SDK; no verificable sin registro |
| `@types/react` | Debe alinear con `react@19.2.3`, pero el patch exacto no es verificable sin registro |
| `eslint-config-expo` | Ligado al SDK; además SDK 57 puede preferir `npx expo lint` para scaffolding — confirmar en tu PC |
| `@expo/vector-icons` | Se distribuye junto con `expo`; versión exacta ligada al SDK, no verificable sin registro |
| `expo-font` | Ligado al SDK; no verificable sin registro |

**Cómo resolver el grupo B en tu PC** (después de `npm install`, que instalará la última
versión publicada de cada uno por el `"*"`):

```bash
npx expo install --fix
```

Este comando reescribe automáticamente cada paquete del grupo B a la versión exacta que
Expo SDK 57 espera. Si algún paquete individual da problema, se puede forzar uno a la vez:

```bash
npx expo install expo-router
npx expo install expo-status-bar expo-constants expo-linking expo-splash-screen expo-secure-store
npx expo install react-native-safe-area-context react-native-screens
npx expo install @expo/vector-icons expo-font
```

Después, verificar todo con:

```bash
npx expo-doctor
```

## Pendientes de decisión

- Proveedor de pagos
- Proveedor/flota de delivery
- Corrección de RLS de `points_balance` y política de INSERT de `order_items` — ver
  `docs/security-review.md`. Se decide junto con el diseño del motor de puntos y del
  flujo de pedidos, no en esta fase.
