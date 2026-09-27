import React, { useEffect, useRef } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme';

const PIECE_COLORS = [colors.primary, colors.accent, colors.reward, colors.secondary, colors.background];
const PIECE_COUNT = 24;

interface PieceConfig {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  drift: number;
}

function buildPieces(width: number): PieceConfig[] {
  return Array.from({ length: PIECE_COUNT }, (_, index) => ({
    id: index,
    left: Math.random() * width,
    color: PIECE_COLORS[index % PIECE_COLORS.length] as string,
    delay: Math.random() * 250,
    size: 6 + Math.random() * 6,
    drift: (Math.random() - 0.5) * 80,
  }));
}

function ConfettiPiece({ config, height }: { config: PieceConfig; height: number }) {
  const translateY = useSharedValue(-20);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      config.delay,
      withTiming(height * 0.65, { duration: 1400, easing: Easing.out(Easing.quad) })
    );
    translateX.value = withDelay(config.delay, withTiming(config.drift, { duration: 1400 }));
    rotate.value = withDelay(config.delay, withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: 1400 }));
    opacity.value = withDelay(config.delay + 900, withTiming(0, { duration: 500 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        style,
        {
          left: config.left,
          width: config.size,
          height: config.size * 1.6,
          backgroundColor: config.color,
        },
      ]}
    />
  );
}

export interface ConfettiCelebrationProps {
  /** Cambia a `true` para disparar la animación una sola vez. */
  play: boolean;
  onDone?: () => void;
}

/**
 * Confeti ligero (Reanimated, sin dependencia pesada) — instrucciones,
 * sección 13. Se reproduce una sola vez por transición false -> true, no
 * bloquea interacción (pointerEvents="none"), respeta reduced motion
 * (no renderiza nada y llama a onDone de inmediato).
 */
export function ConfettiCelebration({ play, onDone }: ConfettiCelebrationProps) {
  const { width, height } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const hasPlayedRef = useRef(false);
  const piecesRef = useRef<PieceConfig[]>([]);
  const [, forceRender] = React.useState(0);

  useEffect(() => {
    if (!play || hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    if (reducedMotion) {
      onDone?.();
      return;
    }

    piecesRef.current = buildPieces(width);
    forceRender((n) => n + 1);

    const timeout = setTimeout(() => {
      onDone?.();
    }, 1900);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  if (!play || reducedMotion || piecesRef.current.length === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {piecesRef.current.map((piece) => (
        <ConfettiPiece key={piece.id} config={piece} height={height} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    top: 0,
    borderRadius: 2,
  },
});
