import { supabase } from '../lib/supabase';

async function ensureAdmin() {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('AUTH_REQUIRED');
  const { data, error } = await supabase.from('admin_users').select('user_id').eq('user_id', user.user.id).eq('active', true).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('ADMIN_REQUIRED');
}
export async function listRecipesForAdmin() {
  await ensureAdmin();
  const { data, error } = await supabase.from('product_recipes').select('id,product_id,ingredients,preparation,internal_notes,updated_at').order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
export async function saveRecipeForAdmin(input: { id?: string; product_id: string; ingredients: unknown[]; preparation?: string | null; internal_notes?: string | null }) {
  await ensureAdmin();
  const { id, ...values } = input;
  const payload = { ...values, updated_at: new Date().toISOString() };
  const query = id ? supabase.from('product_recipes').update(payload).eq('id', id) : supabase.from('product_recipes').insert(payload);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
