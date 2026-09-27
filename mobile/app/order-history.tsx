import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import {
  Screen,
  Button,
  EmptyState,
} from '../src/components';

import {
  colors,
  spacing,
  radius,
  shadows,
  typography,
} from '../src/theme';

import { mockOrders } from '../src/mocks';
import { formatCurrency } from '../src/utils';
import { useCart, useAppState } from '../src/state';
import type { MockOrder } from '../src/types';

const STATUS_LABEL: Record<
  MockOrder['status'],
  string
> = {
  received: 'Recibido',
  preparing: 'Preparando',
  ready: 'Listo',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

function formatOrderDate(date: string) {
  return new Date(date).toLocaleDateString('es-NI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function OrderHistoryScreen() {
  const router = useRouter();

  const { addItem } = useCart();
  const { currentOrder } = useAppState();

  const activeOrder =
    currentOrder &&
    currentOrder.status !== 'delivered'
      ? currentOrder
      : null;

  const previousOrders = useMemo(() => {
    const orders: MockOrder[] = [];

    if (
      currentOrder &&
      currentOrder.status === 'delivered'
    ) {
      orders.push(currentOrder);
    }

    mockOrders.forEach((order) => {
      if (
        !orders.some(
          (existing) => existing.id === order.id
        )
      ) {
        orders.push(order);
      }
    });

    return orders;
  }, [currentOrder]);

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

  if (!activeOrder && previousOrders.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="shopping-bag"
          title="Todavía no tienes pedidos"
        />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.container}>
        {activeOrder ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              En proceso
            </Text>

            <View
              style={[
                styles.card,
                styles.activeCard,
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderNumber}>
                    {activeOrder.orderNumber}
                  </Text>

                  <Text style={styles.date}>
                    {formatOrderDate(
                      activeOrder.createdAt
                    )}
                  </Text>
                </View>

                <View style={styles.statusPill}>
                  <View style={styles.statusDot} />

                  <Text style={styles.activeStatus}>
                    {STATUS_LABEL[
                      activeOrder.status
                    ]}
                  </Text>
                </View>
              </View>

              <Text
                style={styles.items}
                numberOfLines={3}
              >
                {activeOrder.items
                  .map(
                    (item) =>
                      `${item.quantity}x ${item.name}`
                  )
                  .join(', ')}
              </Text>

              <View style={styles.activeFooter}>
                <Text style={styles.total}>
                  {formatCurrency(
                    activeOrder.total
                  )}
                </Text>

                <Button
                  label="Ver seguimiento"
                  onPress={() =>
                    router.push('/order-tracking')
                  }
                />
              </View>
            </View>
          </View>
        ) : null}

        {previousOrders.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pedidos anteriores
            </Text>

            {previousOrders.map((item) => (
              <View
                key={item.id}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.orderNumber}>
                      {item.orderNumber}
                    </Text>

                    <Text style={styles.date}>
                      {formatOrderDate(
                        item.createdAt
                      )}
                    </Text>
                  </View>

                  <Text style={styles.status}>
                    {STATUS_LABEL[item.status]}
                  </Text>
                </View>

                <Text
                  style={styles.items}
                  numberOfLines={2}
                >
                  {item.items
                    .map(
                      (orderItem) =>
                        `${orderItem.quantity}x ${orderItem.name}`
                    )
                    .join(', ')}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.total}>
                    {formatCurrency(item.total)}
                  </Text>

                  <Button
                    label="Repetir"
                    variant="secondary"
                    onPress={() =>
                      handleRepeat(item)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.helpRow}>
          <Feather
            name="info"
            size={16}
            color={colors.muted}
          />

          <Text style={styles.helpText}>
            Aquí podrás consultar el estado de tus pedidos y volver a pedir tus favoritos.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.base,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },

  section: {
    gap: spacing.sm,
  },

  sectionTitle: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    color: colors.text,
  },

  card: {
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.base,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    ...shadows.soft,
  },

  activeCard: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },

  orderNumber: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },

  date: {
    marginTop: 2,
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(228,26,23,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  activeStatus: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.primary,
  },

  status: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.primary,
  },

  items: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },

  activeFooter: {
    marginTop: spacing.xs,
    gap: spacing.sm,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },

  total: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },

  helpRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xs,
  },

  helpText: {
    flex: 1,
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
});
