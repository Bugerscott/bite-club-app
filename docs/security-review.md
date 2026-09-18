# Revisión de seguridad — esquema inicial de Supabase

Fecha: 2026-09-18
Alcance: `supabase/migrations/20260917154027_initial_schema.sql` (migración histórica, **no modificada**)
Estado: hallazgos documentados, **sin corregir todavía** — ninguna migración correctiva aplicada, ni local ni remota.

---

## Hallazgo 1 — `points_balance` no está protegido contra escritura del cliente

**Tabla:** `profiles`
**Severidad:** Alta — impacto financiero/de integridad directo si se explota.

**Problema:**
La política actual es:

```sql
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
```

Esta política solo restringe **qué fila** puede actualizar un usuario (la suya), pero no
restringe **qué columnas**. Como `points_balance` vive en la misma tabla `profiles`, un
cliente autenticado podría, en teoría, enviar un `UPDATE` que incluya
`points_balance` junto con campos legítimos como `full_name` o `phone`, y Postgres lo
aceptaría porque la policy no lo bloquea a nivel de columna.

**Regla de negocio:** los puntos **JAMÁS** deben poder ser modificados directamente por
el cliente. Solo deben cambiar como resultado de:
- Una compra validada (server-side)
- Un canje de recompensa validado (server-side)
- Un ajuste manual de soporte (server-side, con auditoría)

**Opciones de corrección (a decidir antes de implementar puntos — ninguna aplicada aún):**

1. **Separar la columna a otra tabla** (`user_points`) sin política de UPDATE para el
   rol `authenticated`; solo el `service_role` (backend) puede escribir ahí.
2. **Column-level privileges de Postgres**: revocar `UPDATE` sobre la columna
   `points_balance` específicamente para el rol `authenticated`, dejando el resto de
   columnas de `profiles` editables por su dueño.
3. **Función RPC (`SECURITY DEFINER`)**: el cliente nunca hace `UPDATE` directo; llama a
   una función como `redeem_reward(reward_id)` que valida todo y ajusta el balance
   internamente, corriendo con privilegios elevados controlados por el propio código de
   la función (no por el cliente).

**Recomendación preliminar:** opción 3 (función RPC) combinada con la opción 1 (tabla de
transacciones como fuente de verdad, `points_balance` como un campo calculado o
cacheado). Se decide junto con el diseño del motor de puntos, no ahora.

---

## Hallazgo 2 — `order_items` no tiene política de INSERT

**Tabla:** `order_items`
**Severidad:** Alta — bloquea funcionalmente la creación de pedidos hasta que se defina, y si se define mal, permite pedidos falsificados.

**Problema:**
La migración actual solo define:

```sql
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
  );
```

No existe ninguna policy de `insert` (ni de `update`/`delete`) para `order_items`. Con
RLS activado y sin policy de INSERT, **cualquier intento de insertar filas será
rechazado por defecto** — lo cual es seguro pero significa que **el flujo de creación de
pedidos todavía no puede implementarse tal cual está el esquema hoy**.

**Riesgo si se agrega una policy ingenua** (ej. permitir INSERT a cualquier usuario
autenticado sin más validación): un cliente podría insertar `order_items` con precios
arbitrarios (`price`) distintos al catálogo real, o asociarlos a un `order_id` de otro
usuario si ese `order_id` es adivinable.

**Lo que debe definirse antes de implementar pedidos (ninguna decisión tomada aún):**

1. ¿La creación del pedido completo (`orders` + `order_items` + cálculo de `total`) se
   hace en una **función RPC server-side** que recibe el carrito y valida precios contra
   `offers`/`rewards`, en vez de que el cliente inserte filas directamente?
2. Si se permite INSERT directo desde el cliente, la policy mínima necesaria sería algo
   como: el usuario solo puede insertar `order_items` cuyo `order_id` pertenezca a una
   orden propia y en estado `pending` — pero **el precio (`price`) seguiría sin poder
   validarse solo con RLS**, por lo que probablemente no sea suficiente por sí sola.

**Recomendación preliminar:** función RPC (`create_order(cart_items)`) que:
- Recibe solo IDs de producto/oferta y cantidades (nunca precios desde el cliente)
- Calcula el total server-side contra `offers`/`rewards`
- Inserta `orders` + `order_items` de forma atómica

Esto se diseña junto con la fase de "Delivery/pedidos" del plan (`docs/fases.md`), no ahora.

---

## Qué NO se hizo en esta revisión

- No se aplicó ninguna migración correctiva, ni local ni al proyecto remoto de Supabase.
- No se modificó `20260917154027_initial_schema.sql`.
- No se implementó autenticación, puntos, carrito ni pedidos todavía.

Cuando se implemente cada funcionalidad, esta corrección debe ir en una migración nueva
y numerada después de la histórica, referenciando este documento en su comentario.
