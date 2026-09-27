import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser, signOut } from '../../src/services/auth';

export default function MoreScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(true);

  const refresh = useCallback(async () => {
    try { setUser(await getCurrentUser()); } catch { setUser(null); } finally { setBusy(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function logout() {
    setBusy(true);
    try { await signOut(); setUser(null); } finally { setBusy(false); }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Más</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Cuenta</Text>
        {busy ? <Text style={styles.muted}>Cargando…</Text> : user ? <>
          <Text style={styles.muted}>{user.email ?? 'Cuenta activa'}</Text>
          <Pressable accessibilityRole="button" onPress={() => void logout()} style={styles.button}><Text style={styles.buttonText}>Cerrar sesión</Text></Pressable>
        </> : <>
          <Text style={styles.muted}>Inicia sesión para realizar pedidos y consultar tu historial.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('/auth')} style={styles.button}><Text style={styles.buttonText}>Iniciar sesión</Text></Pressable>
        </>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 28, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 18 },
  card: { borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 16, padding: 18, gap: 10 },
  heading: { fontSize: 18, fontWeight: '800' },
  muted: { color: '#666', lineHeight: 20 },
  button: { marginTop: 6, minHeight: 46, borderRadius: 12, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '800' },
});
