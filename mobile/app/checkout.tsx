import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button, Divider } from '../src/components';
import { colors, spacing, typography } from '../src/theme';
import { useCart, useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';
import { createOrder } from '../src/services/orders';
import type { MockOrder, MockOrderItem, OrderTrackingStatus } from '../src/types';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, subtotal, lineTotal, clearCart } = useCart();
  const { deliveryMethod, addresses, selectedAddressId, setCurrentOrder } = useAppState();
  const [submitting, setSubmitting] = useState(false);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  async function handleConfirm() {
    if (submitting || items.length === 0 || !deliveryMethod) return;
    if (deliveryMethod === 'delivery' && !selectedAddress) {
      Alert.alert('Dirección requerida', 'Selecciona una dirección de entrega antes de confirmar.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await createOrder(
        items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        deliveryMethod
      );

      const raw = Array.isArray(created) ? created[0] : created;
      const orderItems: MockOrderItem[] = items.map((item) => ({
        cartItemId: item.cartItemId,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: lineTotal(item),
      }));
      const status = (raw?.status ?? 'received') as OrderTrackingStatus;
      const order: MockOrder = {
        id: String(raw?.id ?? raw?.order_id ?? ''),
        orderNumber: String(raw?.order_number ?? raw?.orderNumber ?? 'Pedido confirmado'),
        items: orderItems,
        subtotal,
        total: Number(raw?.total ?? subtotal),
        deliveryMethod,
        addressLabel: deliveryMethod === 'delivery' ? selectedAddress?.label ?? null : null,
        status,
        createdAt: String(raw?.created_at ?? new Date().toISOString()),
      };

      setCurrentOrder(order);
      clearCart();
      router.replace('/order-confirmation');
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (message === 'AUTH_REQUIRED') {
        Alert.alert('Inicia sesión', 'Debes iniciar sesión antes de confirmar tu pedido.', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar sesión', onPress: () => router.push('/auth') },
        ]);
      } else {
        Alert.alert('No se pudo confirmar', 'Tu carrito se mantiene intacto. Intenta nuevamente.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Productos</Text>
        {items.map((item) => (
          <View key={item.cartItemId} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
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
          <Text style={styles.infoText}>Pago al recibir</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button label={submitting ? 'Confirmando...' : 'Confirmar pedido'} onPress={handleConfirm} disabled={submitting || items.length === 0 || !deliveryMethod} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  sectionTitle: { fontFamily: typography.h3.fontFamily, fontSize: typography.h3.fontSize, color: colors.text, marginBottom: spacing.sm },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs },
  itemName: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.text, flex: 1 },
  itemPrice: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.text },
  divider: { marginVertical: spacing.base },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  infoText: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, color: colors.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontFamily: typography.h3.fontFamily, fontSize: typography.h3.fontSize, color: colors.text },
  totalValue: { fontFamily: typography.h1.fontFamily, fontSize: typography.h1.fontSize, color: colors.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.divider },
});
