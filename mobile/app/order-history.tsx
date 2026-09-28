import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, Button, EmptyState } from '../src/components';
import { colors, spacing, radius, shadows, typography } from '../src/theme';
import { formatCurrency } from '../src/utils';
import { useCart } from '../src/state';
import type { MockOrder } from '../src/types';
import { getMyOrders, toUiOrder } from '../src/services/orders';

const STATUS_LABEL: Record<MockOrder['status'], string> = { received: 'Recibido', preparing: 'Preparando', ready: 'Listo', on_the_way: 'En camino', delivered: 'Entregado' };
function formatOrderDate(date: string) { return new Date(date).toLocaleDateString('es-NI', { day: 'numeric', month: 'long', year: 'numeric' }); }

export default function OrderHistoryScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getMyOrders().then((data) => { if (active) setOrders(data.map(toUiOrder)); }).catch((err) => {
      if (!active) return;
      setError(err instanceof Error ? err.message : 'LOAD_FAILED');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const activeOrder = orders.find((order) => order.status !== 'delivered') ?? null;
  const previousOrders = orders.filter((order) => order.id !== activeOrder?.id);

  function handleRepeat(order: MockOrder) {
    order.items.filter((item) => item.productId).forEach((item) => addItem({ productId: item.productId, name: item.name, unitPrice: item.unitPrice, imageKey: null, selectedExtras: [] }, item.quantity));
    router.push('/cart');
  }

  if (loading) return <Screen><View style={styles.loading}><ActivityIndicator color={colors.primary} /></View></Screen>;
  if (error === 'AUTH_REQUIRED') return <Screen><EmptyState icon="user" title="Inicia sesión para ver tus pedidos" actionLabel="Volver" onActionPress={() => router.back()} /></Screen>;
  if (error) return <Screen><EmptyState icon="alert-circle" title="No pudimos cargar tus pedidos" /></Screen>;
  if (!orders.length) return <Screen><EmptyState icon="shopping-bag" title="Todavía no tienes pedidos" /></Screen>;

  const renderCard = (item: MockOrder, active: boolean) => (
    <View key={item.id} style={[styles.card, active && styles.activeCard]}>
      <View style={styles.cardHeader}>
        <View><Text style={styles.orderNumber}>{item.orderNumber}</Text><Text style={styles.date}>{formatOrderDate(item.createdAt)}</Text></View>
        <Text style={active ? styles.activeStatus : styles.status}>{STATUS_LABEL[item.status]}</Text>
      </View>
      <Text style={styles.items} numberOfLines={3}>{item.items.map((orderItem) => `${orderItem.quantity}x ${orderItem.name}`).join(', ')}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.total}>{formatCurrency(item.total)}</Text>
        {active ? <Button label="Ver seguimiento" onPress={() => router.push('/order-tracking')} /> : <Button label="Repetir" variant="secondary" onPress={() => handleRepeat(item)} />}
      </View>
    </View>
  );

  return <Screen scroll><View style={styles.container}>
    {activeOrder ? <View style={styles.section}><Text style={styles.sectionTitle}>En proceso</Text>{renderCard(activeOrder, true)}</View> : null}
    {previousOrders.length ? <View style={styles.section}><Text style={styles.sectionTitle}>Pedidos anteriores</Text>{previousOrders.map((item) => renderCard(item, false))}</View> : null}
    <View style={styles.helpRow}><Feather name="info" size={16} color={colors.muted} /><Text style={styles.helpText}>Aquí podrás consultar el estado de tus pedidos y volver a pedir tus favoritos.</Text></View>
  </View></Screen>;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { paddingVertical: spacing.base, paddingBottom: spacing.xxxl, gap: spacing.xl },
  section: { gap: spacing.sm }, sectionTitle: { fontFamily: typography.h2.fontFamily, fontSize: typography.h2.fontSize, color: colors.text },
  card: { backgroundColor: colors.background, borderRadius: radius.card, padding: spacing.base, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.sm, ...shadows.soft },
  activeCard: { borderColor: colors.primary, borderWidth: 1.5 }, cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  orderNumber: { fontFamily: typography.h3.fontFamily, fontSize: typography.h3.fontSize, color: colors.text }, date: { marginTop: 2, fontFamily: typography.micro.fontFamily, fontSize: typography.micro.fontSize, color: colors.muted },
  activeStatus: { fontFamily: typography.caption.fontFamily, fontSize: typography.caption.fontSize, color: colors.primary }, status: { fontFamily: typography.caption.fontFamily, fontSize: typography.caption.fontSize, color: colors.primary },
  items: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.text }, cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  total: { fontFamily: typography.h3.fontFamily, fontSize: typography.h3.fontSize, color: colors.primary }, helpRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start', paddingHorizontal: spacing.xs }, helpText: { flex: 1, fontFamily: typography.caption.fontFamily, fontSize: typography.caption.fontSize, color: colors.muted },
});
