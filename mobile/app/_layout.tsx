import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';
import { RootProviders } from '../src/state';
import { useAppFonts } from '../src/hooks/useAppFonts';
import { SplashVideoScreen } from '../src/components';
import { colors, typography } from '../src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const { loaded: fontsLoaded, error: fontError } = useAppFonts();
  const [introFinished, setIntroFinished] = useState(false);
  const fontsReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (fontError) {
      console.warn('Bite Club: no se pudieron cargar todas las fuentes personalizadas.', fontError);
    }
  }, [fontError]);

  if (!fontsReady) {
    return <View style={styles.bootBackground} />;
  }

  if (!introFinished) {
    return <SplashVideoScreen onFinish={() => setIntroFinished(true)} />;
  }

  return (
    <RootProviders>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: {
            fontFamily: typography.h3.fontFamily,
            fontSize: typography.h3.fontSize,
          },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Producto' }} />
        <Stack.Screen
          name="cart"
          options={{ headerShown: true, title: 'Carrito', presentation: 'modal' }}
        />
        <Stack.Screen name="delivery" options={{ headerShown: true, title: 'Entrega' }} />
        <Stack.Screen name="addresses" options={{ headerShown: true, title: 'Direcciones' }} />
        <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Checkout' }} />
        <Stack.Screen
          name="order-confirmation"
          options={{ headerShown: true, title: 'Confirmación', headerBackVisible: false }}
        />
        <Stack.Screen name="order-tracking" options={{ headerShown: true, title: 'Seguimiento' }} />
        <Stack.Screen name="order-history" options={{ headerShown: true, title: 'Mis pedidos' }} />
        <Stack.Screen name="reward/[id]" options={{ headerShown: true, title: 'Recompensa' }} />
        <Stack.Screen
          name="points-history"
          options={{ headerShown: true, title: 'Historial de puntos' }}
        />
        <Stack.Screen name="profile" options={{ headerShown: true, title: 'Perfil' }} />
        <Stack.Screen name="notifications" options={{ headerShown: true, title: 'Notificaciones' }} />
        <Stack.Screen name="support" options={{ headerShown: true, title: 'Soporte' }} />
      </Stack>
    </RootProviders>
  );
}

const styles = StyleSheet.create({
  bootBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
