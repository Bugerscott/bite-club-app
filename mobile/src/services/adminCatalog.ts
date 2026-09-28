import { supabase } from '../lib/supabase';

export async function listProductsForAdmin() {
  const { data, error } = await supabase.from('products').select('*').order('name');
  if (error) throw error;
  return data ?? [];
}

export async function listOffersForAdmin() {
  const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function listRewardsForAdmin() {
  const { data, error } = await supabase.from('rewards').select('*').order('points_required');
  if (error) throw error;
  return data ?? [];
}
