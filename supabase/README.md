# Supabase — Bite Club App

## Proyecto

| Campo | Valor |
|---|---|
| Nombre | Bite Club app |
| Project ID (ref) | `ydhhlofbssdrcgfzgcfe` |
| Región | us-east-1 |
| URL | https://ydhhlofbssdrcgfzgcfe.supabase.co |
| Organización | hjczgnkboghnpgixgxnt |

## Estructura de este directorio

```
supabase/
├── migrations/
│   └── 20260917154027_initial_schema.sql   → esquema inicial (tablas, índices, RLS) — HISTÓRICA, NO MODIFICAR
└── README.md                                → este archivo
```

## Tablas

| Tabla | Propósito |
|---|---|
| `profiles` | Extiende `auth.users`. Guarda nombre, teléfono, avatar y balance de puntos. |
| `rewards` | Catálogo de recompensas canjeables por puntos. |
| `offers` | Ofertas con precio. |
| `orders` | Pedidos de delivery/pickup. |
| `order_items` | Productos dentro de cada pedido. |
| `points_transactions` | Historial de puntos ganados/gastados, para auditoría. |

Todas las tablas tienen **Row Level Security (RLS)** activado.

⚠️ **Ver `docs/security-review.md`** — hay dos hallazgos de seguridad pendientes de
corregir en `profiles` (columna `points_balance`) y `order_items` (falta política de
INSERT) antes de implementar puntos y pedidos. Ninguna migración correctiva se ha
aplicado todavía, ni a este archivo histórico ni al proyecto remoto.

## Política de migraciones

- El archivo `20260917154027_initial_schema.sql` es **histórico**: refleja exactamente lo
  que ya está aplicado en el proyecto remoto y no se edita nunca.
- Cualquier corrección o cambio de esquema se agrega como un **archivo de migración nuevo**
  (ej. `20260919000000_fix_points_balance_rls.sql`), nunca modificando uno existente.

## Cómo aplicar migraciones en un proyecto (ej. staging)

Con la CLI de Supabase instalada (`npm install -g supabase`):

```bash
supabase login
supabase link --project-ref <tu-project-ref>
supabase db push
```

## Variables de entorno que la app necesita

Ver `mobile/.env.example`. Se obtienen así:

- `EXPO_PUBLIC_SUPABASE_URL` → Project Settings → API → Project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` → Project Settings → API → anon/public key

**Nunca** subas la `service_role` key a este repo ni al cliente móvil.

## Pendiente para las siguientes fases

- [ ] Corregir RLS de `profiles` para proteger `points_balance` (ver security-review.md)
- [ ] Definir y aplicar política de INSERT en `order_items` (ver security-review.md)
- [ ] Trigger `handle_new_user()` en `auth.users` → crea automáticamente la fila en `profiles` al registrarse
- [ ] Configurar proveedores OAuth (Google, Facebook) en Authentication → Providers
- [ ] Función/trigger seguro para descontar `points_balance` al canjear una recompensa
- [ ] Tabla `branches` si se necesita multi-sucursal en el futuro
