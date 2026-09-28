# Bite Club integration status

Base visual protegida: `0fa912f`.

Integrado sin reemplazar pantallas visuales:
- configuración ESLint para Expo;
- servicio de autenticación Supabase;
- servicio tipado de catálogo Supabase;
- servicio de pedidos mediante RPC atómico e historial autenticado;
- servicios CRUD administrativos para productos, promociones y recompensas, con verificación de `admin_users` y RLS como autoridad final;
- frontera segura para Delivery Master: la app móvil no contiene secretos ni acceso directo a su base de datos.

Pendiente de integración selectiva:
- enlazar la UI visual existente de Pedir/Checkout/Historial con estos servicios sin sustituir diseño;
- construir las pantallas del panel administrativo sobre los servicios;
- implementar el backend/Edge Function que despacha hacia Delivery Master y sincroniza estados;
- incorporar las migraciones canónicas ya existentes en `develop/admin-catalog` sin modificar `initial_schema`.
