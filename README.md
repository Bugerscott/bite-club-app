# Bite Club App

App de recompensas/delivery propia. Monorepo con la app móvil, el futuro panel admin,
backend adicional (si se necesita) y la documentación de base de datos.

## Estructura

```
bite-club-app/
├── mobile/       → app móvil (React Native + Expo SDK 57 + TypeScript + Expo Router)
├── admin/        → panel administrativo web (futuro, Next.js en Vercel)
├── api/          → backend adicional (solo si se necesita lógica fuera de Supabase)
├── supabase/     → migraciones SQL y documentación del esquema de base de datos
├── docs/         → documentación funcional y técnica del proyecto
└── README.md     → este archivo
```

## Stack

- **App móvil:** React Native + Expo SDK 57 + TypeScript (estricto) + Expo Router
- **Backend/DB/Auth:** Supabase (proyecto "Bite Club app", `us-east-1`)
- **Panel admin (futuro):** Next.js en Vercel
- **CI/build:** EAS Build (Expo) para compilar y publicar a App Store y Google Play

## Navegación de la app

Inicio | Club | Pedir | Ofertas | Más — pantallas placeholder todavía, sin diseño final.

## Requisitos previos en tu PC

- [Node.js](https://nodejs.org/) **22.13.x o superior**, compatible con Expo SDK 57
- Git
- Cuenta de Expo (`npx expo login`)
- La app **Expo Go** en tu teléfono (para probar sin compilar) — disponible en App Store / Google Play

## Cómo clonar, instalar y arrancar

```bash
# 1. Clonar el repositorio (cuando exista el remote — ver nota abajo)
git clone <URL-DE-TU-REPO-EN-GITHUB>
cd bite-club-app/mobile

# 2. Instalar dependencias
npm install

# 3. Alinear versiones exactas con Expo SDK 57
npx expo install --fix

# 4. Verificar que todo esté sano
npx expo-doctor

# 5. Configurar variables de entorno
cp .env.example .env
# Edita .env y coloca la URL y la anon key reales (ver sección "Conexión con Supabase" abajo)

# 6. Arrancar el proyecto
npx expo start
```

Esto abre un QR en la terminal. Escanéalo con la app **Expo Go** en tu teléfono (Android)
o con la cámara (iOS) para ver la app corriendo en vivo, sin compilar nada.

> **Nota sobre versiones:** este scaffold se generó en un entorno sin acceso al registro
> de npm. Las versiones que sí quedaron fijadas en `mobile/package.json` (`expo ~57.0.0`,
> `react 19.2.3`, `react-native 0.86.0`) son las que tú confirmaste como referencia oficial
> de Expo SDK 57 — **no se inventaron**. El resto de paquetes del ecosistema Expo
> (`expo-router`, `expo-status-bar`, `expo-constants`, `expo-linking`,
> `expo-splash-screen`, `expo-secure-store`, `react-native-safe-area-context`,
> `react-native-screens`, `babel-preset-expo`, `@types/react`, `eslint-config-expo`)
> quedaron deliberadamente como `"*"` en vez de un número inventado — se resuelven en
> tu máquina con el paso 3. Detalle completo en `docs/decisiones-tecnicas.md`.

## Conexión con Supabase existente

El proyecto de Supabase **"Bite Club app"** ya está creado (`us-east-1`) con el esquema
inicial aplicado. Para conectar la app:

1. Entra a [supabase.com/dashboard](https://supabase.com/dashboard) → proyecto "Bite Club app"
2. Ve a **Project Settings → API**
3. Copia **Project URL** → pégalo en `mobile/.env` como `EXPO_PUBLIC_SUPABASE_URL`
4. Copia la **anon / publishable key** → pégala en `mobile/.env` como `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Estas dos claves son seguras para el cliente móvil (están protegidas por Row Level
Security). La `service_role` key **nunca** debe usarse en la app.

⚠️ Antes de implementar puntos y pedidos, revisar `docs/security-review.md` — hay dos
hallazgos de seguridad pendientes de corregir en el esquema actual.

## Assets

Los archivos en `mobile/assets/images/` son **placeholders temporales** (ver el README
dentro de esa carpeta) — reemplazar por el branding oficial antes de compilar para las
tiendas.

## Scripts disponibles (dentro de `mobile/`)

| Comando | Qué hace |
|---|---|
| `npm run start` | Arranca el servidor de desarrollo de Expo |
| `npm run android` | Arranca y abre en un emulador/dispositivo Android |
| `npm run ios` | Arranca y abre en un simulador/dispositivo iOS |
| `npm run typecheck` | Verifica tipos de TypeScript sin compilar |
| `npm run lint` | Corre el linter |
| `npm run doctor` | Corre `expo-doctor` para detectar incompatibilidades |

## Estado actual del proyecto

Ver `docs/fases.md` — actualmente en **Fase 4: base técnica** (segunda iteración del
scaffold, corrigiendo estructura, SDK, navegación y assets). No hay pantallas de diseño
final todavía. El repositorio Git está inicializado localmente pero **sin remote
conectado** — se conecta solo cuando se apruebe este scaffold.
