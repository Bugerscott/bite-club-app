import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button } from '../src/components';
import { StatusTimeline } from '../src/features/order/StatusTimeline';
import { colors, spacing, typography } from '../src/theme';
import { useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';
import { getMyOrders, toUiOrder } from '../src/services/orders';
import type { MockOrder } from '../src/types';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { currentOrder } = useAppState();
  const [remoteOrder, setRemoteOrder] = useState<MockOrder | null>(null);
  const [loading, setLoading] = useState(!currentOrder);

  useEffect(() => {
    if (currentOrder) return;
    let active = true;
    getMyOrders().then((orders) => {
      if (!active) return;
      const open = orders.map(toUiOrder).find((order) => order.status !== 'delivered') ?? null;
      setRemoteOrder(open);
    }).catch(() => { if (active) setRemoteOrder(null); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [currentOrder]);

  const order = currentOrder ?? remoteOrder;
  if (loading) return <Screen><View style={styles.empty}><ActivityIndicator color={colors.primary} /></View></Screen>;
  if (!order) return <Screen><View style={styles.empty}><Text style={styles.emptyText}>No hay un pedido en curso.</Text><Button label="Ir al menú" variant="secondary" onPress={() => router.push('/(tabs)/order')} /></View></Screen>;

  return <Screen scroll><View style={styles.header}><Text style={styles.orderNumber}>{order.orderNumber}</Text><Text style={styles.total}>{formatCurrency(order.total)}</Text></View><View style={styles.timelineWrap}><StatusTimeline currentStatus={order.status} /></View></Screen>;
}

const styles = StyleSheet.create({ header: { marginTop: spacing.lg, marginBottom: spacing.xl }, orderNumber: { fontFamily: typography.h1.fontFamily, fontSize: typography.h1.fontSize, color: colors.text }, total: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.muted }, timelineWrap: { marginTop: spacing.sm }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm }, emptyText: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.muted } });
