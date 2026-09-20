import { Text, StyleSheet } from 'react-native';
import { Screen } from '../../src/components';
import { colors, typography, spacing } from '../../src/theme';

// Placeholder — Pedir. Diseño pendiente.
export default function OrderScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Pedir</Text>
      <Text style={styles.subtitle}>Pantalla pendiente de diseño</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
    marginTop: spacing.xl,
  },
  subtitle: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});
