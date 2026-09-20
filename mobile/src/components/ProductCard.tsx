import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';
import type { Product } from '../types';
import { PriceBadge } from './PriceBadge';

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  /** Resuelve `imageKey` a una fuente de imagen real. Sin mapa aún → placeholder vacío. */
  imageSource?: { uri: string } | number | null;
}

const BADGE_LABEL: Record<NonNullable<Product['badge']>, string> = {
  nuevo: 'Nuevo',
  popular: 'Popular',
};

/** Card de producto — instrucciones, sección "18. PRODUCT CARD". */
export function ProductCard({ product, onPress, imageSource }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={product.name}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{BADGE_LABEL[product.badge]}</Text>
          </View>
        ) : null}
        {!product.available ? (
          <View style={styles.unavailableOverlay}>
            <Text style={styles.unavailableText}>No disponible</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {product.shortDescription}
      </Text>
      <PriceBadge price={product.price} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.sm,
    gap: spacing.xs,
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.background,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.background,
  },
  name: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  description: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
});
