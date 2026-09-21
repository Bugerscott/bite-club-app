import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';
import type { CartItem } from '../../types';
import { formatCurrency } from '../../utils';
import { QuantityStepper, IconButton } from '../../components';
import { resolveProductImage } from '../../lib/productImages';

export interface CartLineItemProps {
  item: CartItem;
  lineTotal: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const SAUCE_LABEL: Record<string, string> = {
  'salsa-bite': 'Salsa Bite',
  alioli: 'Alioli',
  bbq: 'BBQ',
  'salsa-brava': 'Salsa Brava',
};

/** Fila de carrito — usada en /cart y en el resumen de /checkout. */
export function CartLineItem({ item, lineTotal, onIncrease, onDecrease, onRemove }: CartLineItemProps) {
  const imageSource = resolveProductImage(item.imageKey);
  const optionsSummary = [
    item.selectedSauce ? SAUCE_LABEL[item.selectedSauce] : null,
    ...item.selectedExtras.map((e) => e.name),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View style={styles.row}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        {optionsSummary ? (
          <Text style={styles.options} numberOfLines={2}>
            {optionsSummary}
          </Text>
        ) : null}
        <View style={styles.footer}>
          <QuantityStepper quantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease} min={0} />
          <Text style={styles.price}>{formatCurrency(lineTotal)}</Text>
        </View>
      </View>
      <IconButton name="trash-2" accessibilityLabel={`Eliminar ${item.name}`} onPress={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'flex-start',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radius.button,
    backgroundColor: colors.divider,
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  options: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  price: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },
});
