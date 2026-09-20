import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export interface PriceBadgeProps {
  /** Precio en córdobas. null = sin precio aprobado todavía (muestra "—"). */
  price: number | null;
  /** Precio anterior, para mostrar tachado en promociones. */
  originalPrice?: number | null;
}

function formatPrice(value: number): string {
  return `C$${value.toFixed(2)}`;
}

/** Muestra un precio formateado, o un placeholder neutral si aún no hay precio aprobado. */
export function PriceBadge({ price, originalPrice }: PriceBadgeProps) {
  return (
    <View style={styles.row}>
      {originalPrice != null ? (
        <Text style={styles.original}>{formatPrice(originalPrice)}</Text>
      ) : null}
      <Text style={styles.price}>{price != null ? formatPrice(price) : '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  price: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },
  original: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
});

/** Radio usado por componentes contenedores de este badge (referencia rápida). */
export const priceBadgeRadius = radius.pill;
