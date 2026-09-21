import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button } from '../src/components';
import { StatusTimeline } from '../src/features/order/StatusTimeline';
import { colors, spacing, typography } from '../src/theme';
import { useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';

// Ruta /order-tracking — instrucciones, sección 24. Sin GPS ni mapas.
export default function OrderTrackingScreen() {
  const router = useRouter();
  const { currentOrder } = useAppState();

  if (!currentOrder) {
    return (
      <Screen>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No hay un pedido en curso.</Text>
          <Button label="Ir al menú" variant="secondary" onPress={() => router.push('/(tabs)/order')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{currentOrder.orderNumber}</Text>
        <Text style={styles.total}>{formatCurrency(currentOrder.total)}</Text>
      </View>
      <View style={styles.timelineWrap}>
        <StatusTimeline currentStatus={currentOrder.status} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  orderNumber: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
  },
  total: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
  },
  timelineWrap: {
    marginTop: spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
  },
});
