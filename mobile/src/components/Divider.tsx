import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../theme';

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

/** Línea divisoria sutil — colors.divider (TEXT al 8%), 1px. */
export function Divider({ style }: DividerProps) {
  return <View style={[styles.line, style]} accessibilityElementsHidden importantForAccessibility="no" />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    width: '100%',
  },
});
