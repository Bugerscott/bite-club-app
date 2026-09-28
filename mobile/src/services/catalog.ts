import { supabase } from '../lib/supabase';

export type Product = { id: string; name: string; description: string | null; price: number; image_url: string | null; category: string | null; active: boolean };
export type Offer = { id: string; title: string; description: string | null; image_url: string | null; original_price: number | null; offer_price: number | null; valid_from: string | null; valid_until: string | null; active: boolean };
export type Reward = { id: string; name: string; description: string | null; points_cost: number; image_url: string | null; category: string | null; active: boolean };

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('id,name,description,price,image_url,category,active').eq('active', true).order('sort_order').order('name');
  if (error) throw error;
  return (data ?? []).map((p) => ({ ...p, price: Number(p.price) }));
}
export async function getActiveOffers(): Promise<Offer[]> {
  const { data, error } = await supabase.from('offers').select('id,title,description,image_url,original_price,offer_price,valid_from,valid_until,active').eq('active', true).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((o) => ({ ...o, original_price: o.original_price == null ? null : Number(o.original_price), offer_price: o.offer_price == null ? null : Number(o.offer_price) }));
}
export async function getActiveRewards(): Promise<Reward[]> {
  const { data, error } = await supabase.from('rewards').select('id,name,description,points_cost,image_url,category,active').eq('active', true).order('points_cost');
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, points_cost: Number(r.points_cost) }));
}
