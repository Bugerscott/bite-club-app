import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  colors,
  spacing,
  radius,
  scale,
  shadows,
  spring,
  typography,
} from '../theme';

import type { Product } from '../types';
import { PriceBadge } from './PriceBadge';

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddPress?: () => void;
  addLabel?: string;
  imageSource?: { uri: string } | number | null;
  cardWidth?: number;
}

const BADGE_LABEL: Record<NonNullable<Product['badge']>, string> = {
  nuevo: 'Nuevo',
  popular: 'Popular',
};

export function ProductCard({
  product,
  onPress,
  onAddPress,
  addLabel = 'Agregar',
  imageSource,
  cardWidth = 160,
}: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  const pressScale = useSharedValue<number>(scale.default);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.card}>
        <Pressable
          onPress={onPress}
          disabled={!onPress}
          accessibilityRole={onPress ? 'button' : undefined}
          accessibilityLabel={
            onPress ? `Ver ${product.name}` : product.name
          }
          onPressIn={() => {
            if (onPress && !reducedMotion) {
              pressScale.value = withSpring(
                0.98,
                spring.gentle
              );
            }
          }}
          onPressOut={() => {
            if (onPress && !reducedMotion) {
              pressScale.value = withSpring(
                scale.default,
                spring.gentle
              );
            }
          }}
          style={({ pressed }) => [
            styles.mainPressable,
            pressed && onPress && styles.pressed,
          ]}
        >
          <View style={styles.imageWrap}>
            {imageSource ? (
              <Image
                source={imageSource}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.image,
                  styles.imagePlaceholder,
                ]}
              />
            )}

            {product.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {BADGE_LABEL[product.badge]}
                </Text>
              </View>
            ) : null}

            {!product.available ? (
              <View style={styles.unavailableOverlay}>
                <Text style={styles.unavailableText}>
                  No disponible
                </Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>

          {product.description && cardWidth >= 170 ? (
            <Text
              style={styles.description}
              numberOfLines={1}
            >
              {product.description}
            </Text>
          ) : null}
        </Pressable>

        <View style={styles.footer}>
          <PriceBadge price={product.price} />

          {onAddPress ? (
            <Pressable
              onPress={onAddPress}
              disabled={!product.available}
              accessibilityRole="button"
              accessibilityLabel={`Agregar ${product.name} al pedido`}
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.addButtonPressed,
                !product.available &&
                  styles.addButtonDisabled,
              ]}
            >
              <Feather
                name="plus"
                size={16}
                color={colors.background}
              />

              <Text style={styles.addButtonText}>
                {addLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Animated.View>
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

  mainPressable: {
    gap: spacing.xs,
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
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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

  footer: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginTop: 2,
  },

  addButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },

  addButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.96 }],
  },

  addButtonDisabled: {
    opacity: 0.4,
  },

  addButtonText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.background,
  },
});
