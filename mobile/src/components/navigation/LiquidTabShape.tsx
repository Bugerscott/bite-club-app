import React from 'react';
import Animated, { useAnimatedProps, type SharedValue } from 'react-native-reanimated';
import Svg, { Ellipse } from 'react-native-svg';

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

export interface LiquidTabShapeProps {
  width: number;
  height: number;
  /** Posición horizontal (centro) del blob, en Reanimated SharedValue. */
  cx: SharedValue<number>;
  /** Factor de deformación (1 = reposo; >1 durante la transición = líquido estirándose). */
  stretch: SharedValue<number>;
  cy: number;
  baseRadius: number;
  color: string;
}

/**
 * La "masa" líquida de la tab bar: una elipse SVG animada cuyo radio X/Y se
 * deforma (squash & stretch, con volumen conservado) mientras se desplaza
 * entre tabs — instrucciones, sección 5 ("debe existir deformación visual/
 * morph de... la masa/indicador durante la transición", no solo un círculo
 * que teletransporta de posición). Vive DENTRO de los límites de la barra
 * (mismo alto que el contenido) — instrucciones Fase 3.2, sección 9: no debe
 * sobresalir como una bola montada encima.
 */
export function LiquidTabShape({ width, height, cx, stretch, cy, baseRadius, color }: LiquidTabShapeProps) {
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const s = stretch.value;
    return {
      cx: cx.value,
      cy,
      rx: baseRadius * s,
      ry: baseRadius / s,
    };
  });

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
      <AnimatedEllipse animatedProps={animatedProps} fill={color} />
    </Svg>
  );
}
