import { supabase } from '../lib/supabase';

async function assertAdmin() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error('AUTH_REQUIRED');
  const { data, error } = await supabase.from('admin_users').select('user_id').eq('user_id', userData.user.id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('ADMIN_REQUIRED');
}

export async function listProductsForAdmin() { await assertAdmin(); const { data, error } = await supabase.from('products').select('*').order('sort_order').order('name'); if (error) throw error; return data ?? []; }
export async function saveProductForAdmin(input: Record<string, unknown> & { id?: string }) { await assertAdmin(); const { id, ...values } = input; const query = id ? supabase.from('products').update(values).eq('id', id) : supabase.from('products').insert(values); const { data, error } = await query.select().single(); if (error) throw error; return data; }
export async function listOffersForAdmin() { await assertAdmin(); const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false }); if (error) throw error; return data ?? []; }
export async function saveOfferForAdmin(input: Record<string, unknown> & { id?: string }) { await assertAdmin(); const { id, ...values } = input; const query = id ? supabase.from('offers').update(values).eq('id', id) : supabase.from('offers').insert(values); const { data, error } = await query.select().single(); if (error) throw error; return data; }
export async function listRewardsForAdmin() { await assertAdmin(); const { data, error } = await supabase.from('rewards').select('*').order('points_cost'); if (error) throw error; return data ?? []; }
export async function saveRewardForAdmin(input: Record<string, unknown> & { id?: string }) { await assertAdmin(); const { id, ...values } = input; const query = id ? supabase.from('rewards').update(values).eq('id', id) : supabase.from('rewards').insert(values); const { data, error } = await query.select().single(); if (error) throw error; return data; }
