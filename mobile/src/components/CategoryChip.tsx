import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, duration, hexToRgba, radius, spacing, typography } from '../theme';

export interface CategoryChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

const AnimatedPressableChip = Animated.createAnimatedComponent(Pressable);

/**
 * Chip de categoría/filtro — pill (radius 999). Transición animada de fondo
 * al cambiar de categoría — instrucciones, sección 11 ("fondo rojo animado,
 * transición de texto, sin parpadeo") y Fase 3.2 sección 16 (chip inactivo
 * transparente/glass, integrado en la barra, sin bordes grises fuertes). El
 * color de fondo interpola de forma continua entre transparente/`divider`
 * (inactivo, deja ver el glass de la barra detrás) y `primary` (activo) en
 * vez de saltar de un estilo estático a otro.
 */
export function CategoryChip({ label, selected = false, onPress }: CategoryChipProps) {
  const reducedMotion = useReducedMotion();
  const progress = useSharedValue<number>(selected ? 1 : 0);

  useEffect(() => {
    progress.value = reducedMotion ? (selected ? 1 : 0) : withTiming(selected ? 1 : 0, { duration: duration.normal });
  }, [selected, reducedMotion, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [hexToRgba(colors.background, 0), colors.primary]),
    borderColor: interpolateColor(progress.value, [0, 1], [colors.divider, colors.primary]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [colors.text, colors.background]),
  }));

  return (
    <AnimatedPressableChip
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={[styles.base, animatedContainerStyle]}
    >
      <Animated.Text style={[styles.label, animatedTextStyle]} numberOfLines={1}>
        {label}
      </Animated.Text>
    </AnimatedPressableChip>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: spacing.base,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
  },
});
