import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export interface HeroBannerProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
}

/** Banner destacado de Inicio (carrusel de promociones principales). */
export function HeroBanner({ title, subtitle, onPress, imageSource }: HeroBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 160,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  pressed: {
    opacity: 0.92,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
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
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    lineHeight: typography.h1.lineHeight,
    color: colors.background,
  },
  subtitle: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.background,
    marginTop: spacing.xs,
  },
});
