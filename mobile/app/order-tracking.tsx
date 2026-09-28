import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AppState } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Button } from '../src/components';
import { StatusTimeline } from '../src/features/order/StatusTimeline';
import { colors, spacing, typography } from '../src/theme';
import { useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';
import { getMyOrder, getMyOrders, toUiOrder } from '../src/services/orders';
import type { MockOrder } from '../src/types';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  const requestedOrderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
  const { currentOrder } = useAppState();
  const [remoteOrder, setRemoteOrder] = useState<MockOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const targetId = requestedOrderId || currentOrder?.id;
      if (targetId) {
        const order = await getMyOrder(targetId);
        setRemoteOrder(order ? toUiOrder(order) : null);
        return;
      }
      const orders = await getMyOrders();
      const open = orders.map(toUiOrder).find((order) => order.status !== 'delivered') ?? null;
      setRemoteOrder(open);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'LOAD_FAILED');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentOrder?.id, requestedOrderId]);

  useEffect(() => { void loadOrder(); }, [loadOrder]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void loadOrder(true);
    });
    return () => subscription.remove();
  }, [loadOrder]);

  const order = remoteOrder ?? (!requestedOrderId ? currentOrder : null);
  if (loading) return <Screen><View style={styles.empty}><ActivityIndicator color={colors.primary} /></View></Screen>;
  if (error === 'AUTH_REQUIRED') return <Screen><View style={styles.empty}><Text style={styles.emptyText}>Inicia sesión para consultar el seguimiento.</Text><Button label="Volver" variant="secondary" onPress={() => router.back()} /></View></Screen>;
  if (error) return <Screen><View style={styles.empty}><Text style={styles.emptyText}>No pudimos actualizar el pedido.</Text><Button label="Reintentar" onPress={() => void loadOrder()} /></View></Screen>;
  if (!order) return <Screen><View style={styles.empty}><Text style={styles.emptyText}>No hay un pedido en curso.</Text><Button label="Ir al menú" variant="secondary" onPress={() => router.push('/(tabs)/order')} /></View></Screen>;

  return <Screen scroll><View style={styles.header}><Text style={styles.orderNumber}>{order.orderNumber}</Text><Text style={styles.total}>{formatCurrency(order.total)}</Text></View><View style={styles.timelineWrap}><StatusTimeline currentStatus={order.status} /></View><View style={styles.actions}><Button label={refreshing ? 'Actualizando…' : 'Actualizar estado'} disabled={refreshing} onPress={() => void loadOrder(true)} /><Button label="Mis pedidos" variant="secondary" onPress={() => router.push('/order-history')} /></View></Screen>;
}

const styles = StyleSheet.create({ header: { marginTop: spacing.lg, marginBottom: spacing.xl }, orderNumber: { fontFamily: typography.h1.fontFamily, fontSize: typography.h1.fontSize, color: colors.text }, total: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.muted }, timelineWrap: { marginTop: spacing.sm }, actions: { marginTop: spacing.xl, gap: spacing.sm }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm }, emptyText: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.muted, textAlign: 'center' } });
