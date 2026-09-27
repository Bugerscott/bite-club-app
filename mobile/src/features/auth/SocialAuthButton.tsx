import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AnimatedPressable } from '../../components/motion/AnimatedPressable';
import { colors, radius, spacing, typography } from '../../theme';
import type { SocialProvider } from '../../lib/auth';

export interface SocialAuthButtonProps {
  provider: SocialProvider;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const LABEL: Record<SocialProvider, string> = {
  google: 'Continuar con Google',
  facebook: 'Continuar con Facebook',
  apple: 'Continuar con Apple',
};

const ICON: Record<SocialProvider, keyof typeof FontAwesome.glyphMap> = {
  google: 'google',
  facebook: 'facebook',
  apple: 'apple',
};

export function SocialAuthButton({ provider, loading, disabled, onPress }: SocialAuthButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={LABEL[provider]}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[styles.base, isDisabled && styles.disabled]}
    >
      <View style={styles.content}>
        <FontAwesome name={ICON[provider]} size={19} color={colors.text} />
        <Text style={styles.label}>{loading ? 'Conectando…' : LABEL[provider]}</Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  disabled: { opacity: 0.5 },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  label: {
    fontFamily: typography.button.fontFamily,
    fontSize: typography.button.fontSize,
    lineHeight: typography.button.lineHeight,
    color: colors.text,
  },
});
