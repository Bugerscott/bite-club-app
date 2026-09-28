import { supabase } from '../lib/supabase';

export async function signInWithEmail(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !password) throw new Error('EMAIL_PASSWORD_REQUIRED');
  const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || password.length < 6) throw new Error('INVALID_CREDENTIALS');
  const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
