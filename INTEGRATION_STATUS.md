# Bite Club integration status

Base visual protegida: `0fa912f`.

Integrado sin reemplazar pantallas visuales:
- configuración ESLint para Expo;
- servicio de autenticación Supabase;
- servicio tipado de catálogo Supabase;
- servicio de pedidos mediante RPC atómico e historial autenticado;
- servicios CRUD administrativos para productos, promociones y recompensas, con verificación de `admin_users` y RLS como autoridad final.

Pendiente de integración selectiva:
- enlazar la UI visual existente de Pedir/Checkout/Historial con estos servicios sin sustituir diseño;
- construir las pantallas del panel administrativo sobre los servicios;
- sincronización Delivery Master;
- incorporar las migraciones canónicas ya existentes en `develop/admin-catalog` sin modificar `initial_schema`.
