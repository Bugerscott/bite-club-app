import React from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useReducedMotion,
  withSpring,
} from 'react-native-reanimated';
import { scale, spring } from '../../theme';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

export interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Pressable con feedback de escala suave (0.96â€“0.98) al presionar â€” instrucciones,
 * secciÃ³n 4 ("Botones"). Respeta reduced motion (desactiva la animaciÃ³n
 * decorativa pero conserva la funcionalidad del press).
 */
export function AnimatedPressable({ children, disabled, onPressIn, onPressOut, style, ...rest }: AnimatedPressableProps) {
  const reducedMotion = useReducedMotion();
  const pressScale = useSharedValue<number>(scale.default);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <AnimatedPressableBase
      disabled={disabled}
      style={[animatedStyle, style]}
      onPressIn={(event) => {
        if (!reducedMotion) {
          pressScale.value = withSpring(scale.pressed, spring.gentle);
        }
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        if (!reducedMotion) {
          pressScale.value = withSpring(scale.default, spring.gentle);
        }
        onPressOut?.(event);
      }}
      {...rest}
    >
      {children}
    </AnimatedPressableBase>
  );
}


