# Plan de fases

1. **Setup de cuentas** — GitHub, Supabase, Cloudflare, Vercel conectados y verificados
2. **Esquema de base de datos** — ✅ completado (`supabase/migrations/20260917154027_initial_schema.sql`); hallazgos de seguridad documentados en `docs/security-review.md`, pendientes de corregir
3. **Autenticación** — pendiente (email + Google + Facebook vía Supabase Auth)
4. **Base técnica del proyecto** — 🔄 en curso (scaffold Expo SDK 57 + TypeScript + Expo Router + conexión Supabase, estructura `mobile/`)
5. **Pantallas core** — pendiente (Inicio, Club, Ofertas — sin lógica de pago todavía)
6. **Motor de puntos y canjes** — pendiente (requiere resolver antes el Hallazgo 1 de `security-review.md`)
7. **Delivery/pedidos** — pendiente (requiere resolver antes el Hallazgo 2 de `security-review.md`)
8. **Panel admin en Vercel** — pendiente
9. **Pagos** — pendiente
10. **Pruebas internas** — pendiente (TestFlight / testing interno Android)
11. **Publicación** — pendiente (App Store y Google Play)

## Estado al 2026-09-18 (segunda iteración del scaffold)

Fase 4 en curso, corrigiendo la primera iteración del scaffold:
- Estructura movida de `app/` a `mobile/`, con `src/` reorganizado (`components/`, `constants/`, `hooks/`, `lib/`, `services/`, `types/`)
- Expo actualizado de SDK 52 a **SDK 57** (versiones provisionales, a verificar con `npx expo install --fix` + `npx expo-doctor`)
- Navegación renombrada con nombres propios de Bite Club: Inicio | Club | Pedir | Ofertas | Más — sin nomenclatura de ninguna marca de terceros
- Assets placeholder generados (antes las rutas de `app.json` apuntaban a archivos inexistentes)
- Migración SQL histórica conservada intacta; hallazgos de seguridad documentados en `docs/security-review.md` sin aplicar correcciones todavía
- `git init` local hecho, **sin remote conectado** (a la espera de aprobación)

Falta:
- Aprobación de este scaffold por el usuario
- Ejecutar `npm install` real en una máquina con acceso al registro de npm
- Confirmar que `npx expo start` levanta sin errores
- Crear el repositorio remoto en GitHub y hacer el primer push (solo cuando se apruebe)
