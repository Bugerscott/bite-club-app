-- Follow-up security/RLS fix. Do not modify the historical initial_schema migration.
-- Public catalog reads must not require EXECUTE on the privileged admin helper.

DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products"
ON public.products
FOR SELECT
TO public
USING (active = true);

DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
CREATE POLICY "Admins can view all products"
ON public.products
FOR SELECT
TO authenticated
USING (public.is_admin());

-- is_admin() is SECURITY DEFINER and is used only by authenticated admin RLS policies.
-- Keep it unavailable to anon/public while allowing signed-in users to evaluate RLS.
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;
