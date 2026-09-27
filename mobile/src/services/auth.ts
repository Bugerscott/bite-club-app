import { supabase } from '../lib/supabase';

export async function signIn(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) throw new Error('Ingresa tu correo y contraseña.');
  const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, fullName: string, phone?: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = fullName.trim();
  if (!normalizedName || !normalizedEmail || password.length < 8) {
    throw new Error('Completa tu nombre, correo y una contraseña de al menos 8 caracteres.');
  }
  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: { data: { full_name: normalizedName, phone: phone?.trim() || null } },
  });
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
