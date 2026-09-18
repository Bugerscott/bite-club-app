# api — Backend adicional (condicional)

Aún no implementado. Supabase cubre la mayoría de las necesidades (base de datos, auth,
RLS, storage) directamente desde el cliente móvil, por lo que este directorio solo se
usará si aparece lógica que no debe vivir en el cliente, por ejemplo:

- Webhooks de una pasarela de pagos
- Integración con el POS de las tiendas físicas
- Lógica que requiera la `service_role` key de Supabase (nunca debe estar en la app móvil)
- El flujo seguro de creación de pedidos (ver `docs/security-review.md`, punto 2)

**Stack planeado (si se necesita):** funciones serverless en Vercel, o Supabase Edge Functions.

No se construye en esta fase.
