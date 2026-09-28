import { supabase } from '../lib/supabase';
import type { MenuCategoryId, Product as UiProduct } from '../types';

export type Product = { id: string; name: string; description: string | null; price: number; image_url: string | null; category: string | null; active: boolean };
export type Offer = { id: string; title: string; description: string | null; image_url: string | null; original_price: number | null; offer_price: number | null; valid_from: string | null; valid_until: string | null; active: boolean };
export type Reward = { id: string; name: string; description: string | null; points_cost: number; image_url: string | null; category: string | null; active: boolean };

const CATEGORY_IDS: MenuCategoryId[] = ['smash-burgers', 'especialidades', 'starters', 'shakes-postres', 'bebidas'];
function categoryId(value: string | null): MenuCategoryId | null { return CATEGORY_IDS.includes(value as MenuCategoryId) ? value as MenuCategoryId : null; }

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('id,name,description,price,image_url,category,active').eq('active', true).order('sort_order').order('name');
  if (error) throw error;
  return (data ?? []).map((p) => ({ ...p, price: Number(p.price) }));
}

/** Convierte solo registros válidos del backend al contrato visual existente. */
export function toUiProduct(product: Product): UiProduct | null {
  const category = categoryId(product.category);
  if (!category) return null;
  return { id: product.id, name: product.name, categoryId: category, description: product.description ?? '', price: Number(product.price), images: [], imageUrl: product.image_url, featured: false, starProduct: false, includesFries: false, available: product.active };
}

export async function getMenuProducts(): Promise<UiProduct[]> {
  const products = await getActiveProducts();
  return products.map(toUiProduct).filter((product): product is UiProduct => product !== null);
}

export async function getMenuProductById(id: string): Promise<UiProduct | null> {
  if (!id) return null;
  const { data, error } = await supabase.from('products').select('id,name,description,price,image_url,category,active').eq('id', id).eq('active', true).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return toUiProduct({ ...data, price: Number(data.price) });
}

export async function getActiveOffers(): Promise<Offer[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('offers').select('id,title,description,image_url,original_price,offer_price,valid_from,valid_until,active').eq('active', true).or(`valid_from.is.null,valid_from.lte.${now}`).or(`valid_until.is.null,valid_until.gte.${now}`).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((o) => ({ ...o, original_price: o.original_price == null ? null : Number(o.original_price), offer_price: o.offer_price == null ? null : Number(o.offer_price) }));
}
export async function getActiveRewards(): Promise<Reward[]> {
  const { data, error } = await supabase.from('rewards').select('id,name,description,points_cost,image_url,category,active').eq('active', true).order('points_cost');
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, points_cost: Number(r.points_cost) }));
}
