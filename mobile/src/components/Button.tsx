import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, radius, scale, sizes, spring, typography } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * BotÃ³n base de Bite Club â€” instrucciones, secciÃ³n "16. SISTEMA DE BOTONES"
 * y secciÃ³n 4 (motion: press scale ~0.96â€“0.98, spring de vuelta, sin rebote
 * exagerado; disabled no anima). Variantes: PRIMARY (fondo rojo), SECONDARY
 * (borde rojo, fondo blanco), GHOST (sin fondo ni borde, solo texto). El
 * estado DISABLED se resuelve Ãºnicamente con `opacity` â€” nunca con un color
 * gris nuevo. `loading` reemplaza el label por un spinner sin cambiar el
 * tamaÃ±o del botÃ³n.
 *
 * El componente `IconButton` (44x44, circular) es un componente aparte,
 * no una variante de este.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const reducedMotion = useReducedMotion();
  const pressScale = useSharedValue<number>(scale.default);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        onPressIn={() => {
          if (!isDisabled && !reducedMotion) {
            pressScale.value = withSpring(0.97, spring.gentle);
          }
        }}
        onPressOut={() => {
          if (!isDisabled && !reducedMotion) {
            pressScale.value = withSpring(scale.default, spring.gentle);
          }
        }}
        style={({ pressed }) => [
          styles.base,
          variantStyles[variant].container,
          isDisabled && styles.disabled,
          pressed && !isDisabled && styles.pressed,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variantStyles[variant].text.color as string} />
        ) : (
          <Text style={[styles.label, variantStyles[variant].text]}>{label}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: sizes.ctaHeight,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  label: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.85,
  },
});

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: { color: string } }> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.background },
  },
  secondary: {
    container: {
      backgroundColor: colors.background,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    text: { color: colors.primary },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.text },
  },
};


