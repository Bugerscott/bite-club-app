import { StyleSheet, Text, View } from 'react-native';

// Placeholder — Más (cuenta, soporte, información). Diseño pendiente.
export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Más</Text>
      <Text style={styles.subtitle}>Pantalla pendiente de diseño</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  title: { fontSize: 20, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666' },
});
