import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { signIn, signUp } from '../src/services/auth';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    try {
      setBusy(true);
      setMessage(null);
      if (mode === 'login') {
        await signIn(email, password);
        router.replace('/(tabs)/order');
      } else {
        const result = await signUp(email, password, name, phone);
        if (result.session) router.replace('/(tabs)/order');
        else setMessage('Revisa tu correo para confirmar la cuenta y luego inicia sesión.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos completar el acceso.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</Text>
      {mode === 'signup' ? <>
        <TextInput value={name} onChangeText={setName} placeholder="Nombre completo" style={styles.input} autoCapitalize="words" />
        <TextInput value={phone} onChangeText={setPhone} placeholder="Teléfono" style={styles.input} keyboardType="phone-pad" />
      </> : null}
      <TextInput value={email} onChangeText={setEmail} placeholder="Correo electrónico" style={styles.input} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" style={styles.input} secureTextEntry autoCapitalize="none" />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Pressable disabled={busy} onPress={() => void submit()} style={[styles.primary, busy && styles.disabled]}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>{mode === 'login' ? 'Entrar' : 'Registrarme'}</Text>}
      </Pressable>
      <Pressable disabled={busy} onPress={() => { setMessage(null); setMode(mode === 'login' ? 'signup' : 'login'); }} style={styles.secondary}>
        <Text style={styles.secondaryText}>{mode === 'login' ? 'Crear una cuenta' : 'Ya tengo una cuenta'}</Text>
      </Pressable>
      <View style={styles.note}><Text style={styles.noteText}>Tu sesión se guarda de forma segura en este dispositivo.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff', gap: 12 },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16 },
  message: { color: '#8a1c1c', lineHeight: 20 },
  primary: { minHeight: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', marginTop: 6 },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  secondary: { minHeight: 46, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { fontWeight: '700' },
  disabled: { opacity: 0.5 },
  note: { marginTop: 8, padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5' },
  noteText: { color: '#666', textAlign: 'center', fontSize: 12 },
});
