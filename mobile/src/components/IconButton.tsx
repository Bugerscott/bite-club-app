import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, sizes } from '../theme';

export interface IconButtonProps {
  /** Nombre de ícono de la familia Feather (@expo/vector-icons). */
  name: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  /** Fondo circular visible (ej. sobre imágenes). Default: false (solo ícono). */
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Botón de ícono — instrucciones, sección "16. SISTEMA DE BOTONES" (variante ICON).
 * 44x44 táctil, circular (radius.iconButton = 999). `disabled` vía opacity.
 */
export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  disabled = false,
  filled = false,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        filled && styles.filled,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Feather name={name} size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radius.iconButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: colors.background,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
});
