# Bite Club integration status

Base visual protegida: `0fa912f`.

Integrado sin reemplazar pantallas visuales:
- configuración ESLint para Expo;
- servicio tipado de catálogo Supabase;
- servicio de pedidos mediante RPC atómico e historial autenticado.

Pendiente de integración selectiva:
- enlazar UI visual de Pedir/Checkout/Historial con estos servicios;
- panel administrativo;
- sincronización Delivery Master;
- migraciones canónicas ya existentes en `develop/admin-catalog` (no modificar `initial_schema`).
