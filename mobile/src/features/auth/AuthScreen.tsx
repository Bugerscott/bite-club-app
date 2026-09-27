import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components';
import { colors, screenPaddingHorizontal, spacing, typography } from '../../theme';
import { signInWithProvider, type SocialProvider } from '../../lib/auth';
import { SocialAuthButton } from './SocialAuthButton';

const brandLogo = require('../../../assets/brand/Bite-Club-_logo-primary.png');

export interface AuthScreenProps {
  /** Solo se proporciona en __DEV__ para revisar el frontend en Expo Go. */
  onDevBypass?: () => void;
}

/** Login/registro. Los proveedores sociales nunca simulan una sesión exitosa. */
export function AuthScreen({ onDevBypass }: AuthScreenProps) {
  const insets = useSafeAreaInsets();
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handlePress(provider: SocialProvider) {
    setErrorMessage(null);
    setPendingProvider(provider);
    const result = await signInWithProvider(provider);
    setPendingProvider(null);

    if (!result.ok && !result.cancelled) {
      setErrorMessage(result.errorMessage ?? 'No se pudo completar el inicio de sesión.');
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xl },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.brandBlock}>
        <Image source={brandLogo} style={styles.logo} resizeMode="contain" accessibilityLabel="Bite Club" />
      </View>

      <Text style={styles.title}>Inicia sesión o crea tu cuenta</Text>

      <View style={styles.buttons}>
        <SocialAuthButton provider="google" loading={pendingProvider === 'google'} disabled={pendingProvider !== null} onPress={() => handlePress('google')} />
        <SocialAuthButton provider="facebook" loading={pendingProvider === 'facebook'} disabled={pendingProvider !== null} onPress={() => handlePress('facebook')} />
        <SocialAuthButton provider="apple" loading={pendingProvider === 'apple'} disabled={pendingProvider !== null} onPress={() => handlePress('apple')} />
      </View>

      {errorMessage ? (
        <View style={styles.errorBox} accessibilityLiveRegion="polite">
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {__DEV__ && onDevBypass ? (
        <View style={styles.devBlock}>
          <Text style={styles.devLabel}>Solo para revisión en Expo</Text>
          <Button label="Entrar al frontend" variant="ghost" onPress={onDevBypass} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenPaddingHorizontal,
    justifyContent: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 210,
    height: 90,
  },
  title: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    lineHeight: typography.h2.lineHeight,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  buttons: { gap: spacing.md },
  errorBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.disabledSurface,
  },
  errorText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    color: colors.primary,
    textAlign: 'center',
  },
  devBlock: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  devLabel: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    lineHeight: typography.micro.lineHeight,
    color: colors.muted,
  },
});
