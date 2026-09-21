import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Screen, Button, EmptyState } from '../src/components';
import { AddressCard } from '../src/features/profile/AddressCard';
import { colors, spacing, radius, typography } from '../src/theme';
import { useAppState } from '../src/state';

// Ruta /addresses — instrucciones, sección 21: listar, seleccionar, crear,
// editar, eliminar localmente. Sin mapas, geocoding ni APIs externas.
export default function AddressesScreen() {
  const { addresses, selectedAddressId, selectAddress, addAddress, updateAddress, deleteAddress } =
    useAppState();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');

  function resetForm() {
    setLabel('');
    setLine1('');
    setCity('');
    setEditingId(null);
    setFormVisible(false);
  }

  function startEdit(id: string) {
    const address = addresses.find((a) => a.id === id);
    if (!address) return;
    setEditingId(id);
    setLabel(address.label);
    setLine1(address.line1);
    setCity(address.city);
    setFormVisible(true);
  }

  function handleSave() {
    if (!label.trim() || !line1.trim() || !city.trim()) return;
    const payload = { label: label.trim(), line1: line1.trim(), line2: null, city: city.trim(), isDefault: false };
    if (editingId) {
      updateAddress(editingId, payload);
    } else {
      addAddress(payload);
    }
    resetForm();
  }

  return (
    <Screen scroll>
      <View style={styles.list}>
        {addresses.length === 0 ? (
          <EmptyState icon="map-pin" title="Sin direcciones guardadas" />
        ) : (
          addresses.map((address) => (
            <View key={address.id} style={styles.addressWrap}>
              <AddressCard
                address={address}
                selected={selectedAddressId === address.id}
                onSelect={() => selectAddress(address.id)}
                onEdit={() => startEdit(address.id)}
                onDelete={() => deleteAddress(address.id)}
              />
            </View>
          ))
        )}
      </View>

      {formVisible ? (
        <View style={styles.form}>
          <Text style={styles.formTitle}>{editingId ? 'Editar dirección' : 'Nueva dirección'}</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Etiqueta (ej. Casa)"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={line1}
            onChangeText={setLine1}
            placeholder="Dirección"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Ciudad"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <View style={styles.formActions}>
            <Button label="Cancelar" variant="ghost" onPress={resetForm} />
            <Button label="Guardar" onPress={handleSave} />
          </View>
        </View>
      ) : (
        <Button label="Agregar dirección" variant="secondary" onPress={() => setFormVisible(true)} style={styles.addButton} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: spacing.base,
  },
  addressWrap: {
    marginBottom: spacing.sm,
  },
  addButton: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  form: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
    gap: spacing.sm,
    padding: spacing.base,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formTitle: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
    marginBottom: spacing.xs,
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
  formActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
