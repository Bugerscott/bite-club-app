import { Text, StyleSheet } from 'react-native';
import { Screen } from '../../src/components';
import { colors, typography, spacing } from '../../src/theme';

// Placeholder — la pantalla real de Inicio se diseña en la siguiente fase.
export default function HomeScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Inicio</Text>
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
