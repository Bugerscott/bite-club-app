import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Screen, Button } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';
import { mockMember } from '../src/mocks';
import { supabase } from '../src/lib/supabase';

// Ruta /profile — instrucciones, sección 28: nombre, correo, teléfono,
// edición visual/local. Todos los valores son mock/dev, no datos reales.
export default function ProfileScreen() {
  const [name, setName] = useState(mockMember.displayName);
  const [email, setEmail] = useState(mockMember.email);
  const [phone, setPhone] = useState(mockMember.phone);
  const [editing, setEditing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Cierra la sesión real de Supabase Auth — instrucciones, sección 2
  // ("permitir cerrar sesión desde Perfil/Más"). El listener en
  // `useSession()` (app/_layout.tsx) redirige a Auth automáticamente.
  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
  }

  return (
    <Screen scroll>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            editable={editing}
            style={[styles.input, !editing && styles.inputDisabled]}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            editable={editing}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, !editing && styles.inputDisabled]}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            editable={editing}
            keyboardType="phone-pad"
            style={[styles.input, !editing && styles.inputDisabled]}
          />
        </View>
      </View>

      <Button
        label={editing ? 'Guardar cambios' : 'Editar perfil'}
        onPress={() => setEditing((prev) => !prev)}
        variant={editing ? 'primary' : 'secondary'}
        style={styles.button}
      />

      <Button
        label={signingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
        onPress={handleSignOut}
        variant="ghost"
        loading={signingOut}
        style={styles.signOutButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: spacing.lg,
    gap: spacing.base,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: spacing.base,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  inputDisabled: {
    backgroundColor: colors.divider,
    color: colors.muted,
  },
  button: {
    marginTop: spacing.xl,
  },
  signOutButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
