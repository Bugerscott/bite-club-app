import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button, Divider } from '../src/components';
import { colors, spacing, radius, typography } from '../src/theme';
import { useCart, useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';
import { generateLocalId } from '../src/utils';
import type { MockOrder, MockOrderItem } from '../src/types';

// Ruta /checkout — instrucciones, sección 22: productos, subtotal, extras,
// método de entrega, dirección/retiro, total, pago mock neutral. Sin
// integración de pago real. Crea un pedido local mock y navega a confirmación.
export default function CheckoutScreen() {
  const router = useRouter();
  const { items, subtotal, lineTotal, clearCart } = useCart();
  const { deliveryMethod, addresses, selectedAddressId, setCurrentOrder } = useAppState();

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  function handleConfirm() {
    const orderItems: MockOrderItem[] = items.map((item) => ({
      cartItemId: item.cartItemId,
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: lineTotal(item),
    }));

    const order: MockOrder = {
      id: generateLocalId('order'),
      orderNumber: `BC-${Math.floor(1000 + Math.random() * 9000)}`,
      items: orderItems,
      subtotal,
      total: subtotal,
      deliveryMethod: deliveryMethod ?? 'pickup',
      addressLabel: deliveryMethod === 'delivery' ? selectedAddress?.label ?? null : null,
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    setCurrentOrder(order);
    clearCart();
    router.replace('/order-confirmation');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Productos</Text>
        {items.map((item) => (
          <View key={item.cartItemId} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>{formatCurrency(lineTotal(item))}</Text>
          </View>
        ))}

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Entrega</Text>
        <View style={styles.infoRow}>
          <Feather name={deliveryMethod === 'delivery' ? 'truck' : 'shopping-bag'} size={16} color={colors.secondary} />
          <Text style={styles.infoText}>
            {deliveryMethod === 'delivery' ? 'Delivery' : 'Retiro en tienda'}
            {selectedAddress && deliveryMethod === 'delivery' ? ` · ${selectedAddress.label}` : ''}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Método de pago</Text>
        <View style={styles.infoRow}>
          <Feather name="credit-card" size={16} color={colors.secondary} />
          <Text style={styles.infoText}>Pago al recibir (mock)</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Confirmar pedido" onPress={handleConfirm} disabled={items.length === 0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  itemName: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  divider: {
    marginVertical: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  totalValue: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
