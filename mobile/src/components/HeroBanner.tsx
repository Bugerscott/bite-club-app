import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export interface HeroBannerProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
}

/** Banner fotográfico principal reutilizable. */
export function HeroBanner({ title, subtitle, actionLabel, onPress, imageSource }: HeroBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={actionLabel ? `${title}. ${actionLabel}` : title}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.overlay}>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {actionLabel ? (
          <View style={styles.actionPill}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  pressed: {
    opacity: 0.94,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.base,
    backgroundColor: colors.overlay,
  },
  subtitle: {
    fontFamily: typography.promo.fontFamily,
    fontSize: typography.promo.fontSize,
    lineHeight: typography.promo.lineHeight,
    color: colors.background,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    lineHeight: typography.h1.lineHeight,
    color: colors.background,
  },
  actionPill: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  actionText: {
    fontFamily: typography.button.fontFamily,
    fontSize: typography.button.fontSize,
    lineHeight: typography.button.lineHeight,
    color: colors.background,
  },
});
