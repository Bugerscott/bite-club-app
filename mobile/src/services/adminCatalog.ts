import { supabase } from '../lib/supabase';

export async function listProductsForAdmin() {
  const { data, error } = await supabase.from('products').select('*').order('name');
  if (error) throw error;
  return data ?? [];
}

export async function saveProductForAdmin(input: Record<string, unknown> & { id?: string }) {
  const { id, ...values } = input;
  const query = id ? supabase.from('products').update(values).eq('id', id) : supabase.from('products').insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}

export async function listOffersForAdmin() {
  const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function saveOfferForAdmin(input: Record<string, unknown> & { id?: string }) {
  const { id, ...values } = input;
  const query = id ? supabase.from('offers').update(values).eq('id', id) : supabase.from('offers').insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}

export async function listRewardsForAdmin() {
  const { data, error } = await supabase.from('rewards').select('*').order('points_required');
  if (error) throw error;
  return data ?? [];
}

export async function saveRewardForAdmin(input: Record<string, unknown> & { id?: string }) {
  const { id, ...values } = input;
  const query = id ? supabase.from('rewards').update(values).eq('id', id) : supabase.from('rewards').insert(values);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data;
}
