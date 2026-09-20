import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, shadows, typography } from '../theme';
import type { PromoOffer } from '../types';
import { PriceBadge } from './PriceBadge';

export interface PromoCardProps {
  offer: PromoOffer;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
}

/** Card de oferta/promoción — instrucciones, sección "17. CARDS" (variante promo). */
export function PromoCard({ offer, onPress, imageSource }: PromoCardProps) {
  const hasPrice = offer.offerPrice != null || offer.originalPrice != null;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={offer.title}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
        {!offer.active ? (
          <View style={styles.inactiveOverlay}>
            <Text style={styles.inactiveText}>Vencida</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {offer.title}
        </Text>
        {offer.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {offer.description}
          </Text>
        ) : null}
        {hasPrice ? (
          <PriceBadge price={offer.offerPrice} originalPrice={offer.originalPrice} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: colors.background,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    width: '100%',
    height: 130,
    backgroundColor: colors.divider,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  inactiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.background,
  },
  body: {
    padding: spacing.base,
    gap: spacing.xs,
  },
  title: {
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
