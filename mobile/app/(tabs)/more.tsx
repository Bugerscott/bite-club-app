import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { Screen, Divider } from '../../src/components';
import { colors, spacing, radius, typography } from '../../src/theme';

const LINKS: { icon: keyof typeof Feather.glyphMap; label: string; route: string }[] = [
  { icon: 'user', label: 'Mi perfil', route: '/profile' },
  { icon: 'shopping-bag', label: 'Mis pedidos', route: '/order-history' },
  { icon: 'map-pin', label: 'Direcciones', route: '/addresses' },
  { icon: 'bell', label: 'Notificaciones', route: '/notifications' },
  { icon: 'help-circle', label: 'Soporte', route: '/support' },
];

// Pantalla Más — instrucciones, sección 27.
export default function MoreScreen() {
  const router = useRouter();
  const version = Constants.expoConfig?.version ?? '0.1.0';

  return (
    <Screen>
      <Text style={styles.title}>Más</Text>
      <View style={styles.list}>
        {LINKS.map((link, index) => (
          <View key={link.route}>
            <Pressable
              onPress={() => router.push(link.route as never)}
              accessibilityRole="button"
              accessibilityLabel={link.label}
              style={styles.row}
            >
              <View style={styles.iconWrap}>
                <Feather name={link.icon} size={18} color={colors.text} />
              </View>
              <Text style={styles.label}>{link.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </Pressable>
            {index < LINKS.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </View>
      <Text style={styles.version}>Bite Club v{version}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
    marginTop: spacing.xl,
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
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  version: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
