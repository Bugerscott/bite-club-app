import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen, Divider } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';

const OPTIONS: { icon: keyof typeof Feather.glyphMap; label: string; description: string }[] = [
  {
    icon: 'shopping-bag',
    label: 'Ayuda con un pedido',
    description: 'Problemas con un pedido en curso o pasado.',
  },
  {
    icon: 'alert-circle',
    label: 'Problema con la app',
    description: 'Algo no funciona como esperabas.',
  },
  {
    icon: 'help-circle',
    label: 'Preguntas generales',
    description: 'Dudas sobre Bite Club, tu Club o el menú.',
  },
];

// Ruta /support — instrucciones, sección 30. Sin teléfono, correo ni canales
// inventados.
export default function SupportScreen() {
  return (
    <Screen>
      <Text style={styles.title}>¿En qué te podemos ayudar?</Text>
      <View style={styles.list}>
        {OPTIONS.map((option, index) => (
          <View key={option.label}>
            <Pressable accessibilityRole="button" accessibilityLabel={option.label} style={styles.row}>
              <View style={styles.iconWrap}>
                <Feather name={option.icon} size={18} color={colors.text} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.label}>{option.label}</Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </Pressable>
            {index < OPTIONS.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.base,
  },
  list: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    paddingHorizontal: spacing.base,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.base,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  description: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
});
