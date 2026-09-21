import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, Button } from '../src/components';
import { AddressCard } from '../src/features/profile/AddressCard';
import { colors, spacing, radius, typography } from '../src/theme';
import { useAppState } from '../src/state';
import type { DeliveryMethod } from '../src/types';

// Ruta /delivery — instrucciones, sección 20: Delivery o Retiro. Sin
// sucursales inventadas. Delivery permite elegir dirección mock.
export default function DeliveryScreen() {
  const router = useRouter();
  const { deliveryMethod, setDeliveryMethod, addresses, selectedAddressId, selectAddress } = useAppState();

  const options: { id: DeliveryMethod; label: string; icon: keyof typeof Feather.glyphMap }[] = [
    { id: 'delivery', label: 'Delivery', icon: 'truck' },
    { id: 'pickup', label: 'Retiro', icon: 'shopping-bag' },
  ];

  function handleContinue() {
    if (!deliveryMethod) return;
    router.push('/checkout');
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>¿Cómo quieres tu pedido?</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => {
          const selected = deliveryMethod === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => setDeliveryMethod(option.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              style={[styles.optionCard, selected && styles.optionCardSelected]}
            >
              <Feather name={option.icon} size={24} color={selected ? colors.primary : colors.text} />
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {deliveryMethod === 'delivery' ? (
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
            <Pressable onPress={() => router.push('/addresses')} accessibilityRole="button" accessibilityLabel="Gestionar direcciones">
              <Text style={styles.manageLink}>Gestionar</Text>
            </Pressable>
          </View>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressWrap}>
              <AddressCard
                address={address}
                selected={selectedAddressId === address.id}
                onSelect={() => selectAddress(address.id)}
              />
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Button
          label="Continuar"
          onPress={handleContinue}
          disabled={!deliveryMethod || (deliveryMethod === 'delivery' && !selectedAddressId)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.base,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    paddingVertical: spacing.lg,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  optionLabel: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  addressSection: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  manageLink: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.primary,
  },
  addressWrap: {
    marginBottom: spacing.sm,
  },
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
