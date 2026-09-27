import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, hexToRgba, spacing, radius, typography } from '../theme';

export interface HeroBannerProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
}

/** Hero fotográfico sin blur sobre la imagen. */
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

      <View style={styles.caption}>
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
    opacity: 0.96,
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  caption: {
    position: 'absolute',
    left: spacing.md,
    bottom: spacing.md,
    maxWidth: '68%',
    borderRadius: radius.button,
    backgroundColor: hexToRgba(colors.background, 0.9),
    padding: spacing.md,
  },
  subtitle: {
    fontFamily: typography.promo.fontFamily,
    fontSize: typography.promo.fontSize,
    lineHeight: typography.promo.lineHeight,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    lineHeight: typography.h2.lineHeight,
    color: colors.text,
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
