import React from 'react';
import { View, ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, screenPaddingHorizontal } from '../theme';

export interface ScreenProps {
  children: React.ReactNode;
  /** Envuelve el contenido en un ScrollView. Default: false. */
  scroll?: boolean;
  /** Lados donde se respeta el SafeArea. Default: top, left, right (no bottom — lo maneja la bottom nav). */
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Contenedor base de pantalla: SafeArea + fondo blanco + padding horizontal
 * estándar (spacing.lg = 20). Todas las pantallas deben envolver su contenido
 * con este componente en vez de armar su propio SafeAreaView/padding.
 */
export function Screen({ children, scroll = false, edges = ['top', 'left', 'right'], contentStyle }: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView edges={edges} style={styles.safeArea}>
        <ScrollView contentContainerStyle={[styles.content, contentStyle]}>{children}</ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <View style={[styles.content, styles.flex, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: screenPaddingHorizontal,
  },
});
