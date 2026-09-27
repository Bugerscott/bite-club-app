import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

export type SocialProvider = 'google' | 'facebook' | 'apple';

export interface SignInResult {
  ok: boolean;
  /** Presente cuando `ok` es `false` — nunca se debe tratar como éxito. */
  errorMessage?: string;
  /** El usuario cerró el navegador sin completar el flujo (no es un error real). */
  cancelled?: boolean;
}

// Mismo esquema que `mobile/app.json` (`"scheme": "biteclub"`).
const redirectTo = Linking.createURL('auth-callback');

/**
 * Inicia sesión social real vía Supabase Auth (OAuth) — instrucciones,
 * sección 2. IMPORTANTE: esta función nunca simula un login exitoso. Si el
 * proveedor no está configurado en Supabase/en la consola del proveedor, la
 * llamada a `signInWithOAuth` o el propio navegador devolverán un error real,
 * que se propaga tal cual en `errorMessage` — no hay ningún camino de "éxito
 * falso" en este archivo.
 */
export async function signInWithProvider(provider: SocialProvider): Promise<SignInResult> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data?.url) {
    return { ok: false, errorMessage: error?.message ?? 'No se pudo iniciar el flujo de autenticación.' };
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (result.type === 'cancel' || result.type === 'dismiss') {
    return { ok: false, cancelled: true };
  }

  if (result.type !== 'success' || !result.url) {
    return { ok: false, errorMessage: 'El proveedor no devolvió una respuesta válida.' };
  }

  return applyCallbackUrl(result.url);
}

/** Extrae `access_token`/`refresh_token` de la URL de retorno y arma la sesión real en Supabase. */
async function applyCallbackUrl(url: string): Promise<SignInResult> {
  const fragment = url.split('#')[1] ?? '';
  const queryPart = url.split('?')[1]?.split('#')[0] ?? '';
  const params = new URLSearchParams(fragment || queryPart);

  const oauthError = params.get('error_description') ?? params.get('error');
  if (oauthError) {
    return { ok: false, errorMessage: oauthError };
  }

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return { ok: false, errorMessage: 'La respuesta de autenticación no incluyó una sesión válida.' };
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return { ok: false, errorMessage: error.message };
  }

  return { ok: true };
}
