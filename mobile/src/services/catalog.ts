import { supabase } from '../lib/supabase';

export type Product = { id: string; name: string; description: string | null; price: number; image_url: string | null; category: string | null; is_active: boolean };
export type Offer = { id: string; title: string; description: string | null; image_url: string | null; starts_at: string | null; ends_at: string | null; is_active: boolean };
export type Reward = { id: string; name: string; description: string | null; points_required: number; image_url: string | null; is_active: boolean };

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('id,name,description,price,image_url,category,is_active').eq('is_active', true).order('name');
  if (error) throw error;
  return (data ?? []).map((p) => ({ ...p, price: Number(p.price) }));
}

export async function getActiveOffers(): Promise<Offer[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('offers').select('id,title,description,image_url,starts_at,ends_at,is_active').eq('is_active', true).or(`starts_at.is.null,starts_at.lte.${now}`).or(`ends_at.is.null,ends_at.gte.${now}`).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getActiveRewards(): Promise<Reward[]> {
  const { data, error } = await supabase.from('rewards').select('id,name,description,points_required,image_url,is_active').eq('is_active', true).order('points_required');
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, points_required: Number(r.points_required) }));
}
