import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme';

export interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

/** Selector de cantidad (+/-) para futura pantalla de Producto/Carrito. */
export function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={canDecrease ? onDecrease : undefined}
        disabled={!canDecrease}
        accessibilityRole="button"
        accessibilityLabel="Disminuir cantidad"
        style={[styles.button, !canDecrease && styles.disabled]}
        hitSlop={8}
      >
        <Feather name="minus" size={16} color={colors.text} />
      </Pressable>
      <Text style={styles.value}>{quantity}</Text>
      <Pressable
        onPress={canIncrease ? onIncrease : undefined}
        disabled={!canIncrease}
        accessibilityRole="button"
        accessibilityLabel="Aumentar cantidad"
        style={[styles.button, !canIncrease && styles.disabled]}
        hitSlop={8}
      >
        <Feather name="plus" size={16} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    height: 40,
  },
  button: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
  value: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
});
