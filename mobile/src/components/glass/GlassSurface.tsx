import React from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, hexToRgba, radius } from '../../theme';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
  tintColor?: string;
}

/**
 * Superficie glass estable para Expo Go.
 *
 * IMPORTANTE: no usa GlassView nativo. En las revisiones de estabilidad,
 * el crash de Pedir no dejaba stack JS, por lo que eliminamos de esta ruta
 * cualquier vista glass nativa y usamos BlurView + tint + highlight.
 */
export function GlassSurface({
  children,
  style,
  borderRadius = radius.pill,
  intensity = 52,
  tintColor = hexToRgba(colors.secondary, 0.08),
}: GlassSurfaceProps) {
  return (
    <View style={[styles.shadowWrap, { borderRadius }, style]}>
      <View style={[styles.clip, { borderRadius }]}>
        <BlurView
          intensity={intensity}
          tint={Platform.OS === 'ios' ? 'systemUltraThinMaterialLight' : 'light'}
          style={styles.fill}
        />
        <View style={[styles.tint, { backgroundColor: tintColor }]} pointerEvents="none" />
        <View style={[styles.border, { borderRadius }]} pointerEvents="none" />
        <View style={styles.highlight} pointerEvents="none" />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    backgroundColor: 'transparent',
    shadowColor: colors.text,
    shadowOpacity: 0.11,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  clip: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tint: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  border: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderColor: hexToRgba(colors.secondary, 0.14),
  },
  highlight: {
    position: 'absolute',
    top: 1,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: hexToRgba(colors.background, 0.78),
  },
});
