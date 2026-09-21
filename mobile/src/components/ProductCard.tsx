import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';
import type { Product } from '../types';
import { PriceBadge } from './PriceBadge';

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
  /** Ancho opcional para grids responsivos. Default: 160 para carruseles horizontales. */
  cardWidth?: number;
}

const BADGE_LABEL: Record<NonNullable<Product['badge']>, string> = {
  nuevo: 'Nuevo',
  popular: 'Popular',
};

export function ProductCard({ product, onPress, imageSource, cardWidth = 160 }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={product.name}
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && onPress && styles.pressed,
      ]}
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
      {product.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      ) : null}
      <PriceBadge price={product.price} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
    lineHeight: typography.micro.lineHeight,
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
    lineHeight: typography.caption.lineHeight,
    color: colors.background,
  },
  name: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    lineHeight: typography.h3.lineHeight,
    color: colors.text,
  },
  description: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    color: colors.muted,
  },
});
