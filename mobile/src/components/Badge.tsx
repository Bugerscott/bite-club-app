import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '../theme';

export interface BadgeProps {
  count: number;
}

/** Badge numérico pequeño (ej. contador de carrito sobre el ícono de Pedir). */
export function Badge({ count }: BadgeProps) {
  if (count <= 0) return null;
  return (
    <View style={styles.badge} accessibilityLabel={`${count} artículos`}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  text: {
    fontFamily: typography.micro.fontFamily,
    fontSize: 10,
    lineHeight: 12,
    color: colors.background,
  },
});
