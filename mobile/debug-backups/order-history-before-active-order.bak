import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, EmptyState } from '../src/components';
import { colors, spacing, radius, shadows, typography } from '../src/theme';
import { mockOrders } from '../src/mocks';
import { formatCurrency } from '../src/utils';
import { useCart } from '../src/state';
import type { MockOrder } from '../src/types';

const STATUS_LABEL: Record<MockOrder['status'], string> = {
  received: 'Recibido',
  preparing: 'Preparando',
  ready: 'Listo',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

// Ruta /order-history — instrucciones, sección 25. "Repetir" reconstruye el
// carrito localmente a partir de los items del pedido.
export default function OrderHistoryScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  function handleRepeat(order: MockOrder) {
    order.items.forEach((item) => {
      addItem(
        {
          productId: item.productId,
          name: item.name,
          unitPrice: item.unitPrice,
          imageKey: null,
          selectedExtras: [],
        },
        item.quantity
      );
    });
    router.push('/cart');
  }

  if (mockOrders.length === 0) {
    return (
      <Screen>
        <EmptyState icon="shopping-bag" title="Todavía no tienes pedidos" />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <Text style={styles.status}>{STATUS_LABEL[item.status]}</Text>
            </View>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString('es-NI', { day: 'numeric', month: 'long' })}
            </Text>
            <Text style={styles.items} numberOfLines={2}>
              {item.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.total}>{formatCurrency(item.total)}</Text>
              <Button label="Repetir" variant="secondary" onPress={() => handleRepeat(item)} />
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.base,
    gap: spacing.base,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadows.soft,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  status: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.primary,
  },
  date: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
  },
  items: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  total: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },
});
