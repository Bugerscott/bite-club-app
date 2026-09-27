import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface UseSessionResult {
  /** `undefined` mientras se comprueba la sesión inicial; `null` si no hay sesión. */
  session: Session | null | undefined;
  loading: boolean;
}

/**
 * Comprueba la sesión de Supabase Auth al iniciar y escucha cambios
 * (login/logout/refresh) — instrucciones, sección 2 ("comprobar sesión al
 * iniciar, escuchar cambios de sesión, mantener la sesión activa").
 */
export function useSession(): UseSessionResult {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading: session === undefined };
}
