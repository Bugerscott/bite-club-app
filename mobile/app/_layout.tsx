import { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { RootProviders } from '../src/state';
import { useAppFonts } from '../src/hooks/useAppFonts';
import { useSplashVideoReady } from '../src/hooks/useSplashVideoReady';

// Splash nativo estático permanece visible hasta que fuentes + (futuro) video
// estén listos — instrucciones, sección 7 ("Flujo": splash nativo -> RN listo
// + fuentes cargadas -> reproducir MP4 -> entrar a la app). El paso de video
// se activa cuando exista mobile/assets/app/splash-animation.mp4 (ver
// src/hooks/useSplashVideoReady.ts).
SplashScreen.preventAutoHideAsync().catch(() => {
  // No-op: en algunos entornos de desarrollo puede fallar si ya se ocultó.
});

export default function RootLayout() {
  const { loaded: fontsLoaded } = useAppFonts();
  const { ready: splashVideoReady } = useSplashVideoReady();

  const appReady = fontsLoaded && splashVideoReady;

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appReady]);

  if (!appReady) {
    return <View onLayout={onLayoutRootView} style={{ flex: 1 }} />;
  }

  return (
    <RootProviders>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
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
      </View>
    </RootProviders>
  );
}
