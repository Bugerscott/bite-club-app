import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, Button } from '../src/components';
import { colors, spacing, typography, radius } from '../src/theme';
import { useAppState } from '../src/state';
import { formatCurrency } from '../src/utils';

// Ruta /order-confirmation — instrucciones, sección 23. No se prometen
// tiempos exactos de entrega.
export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { currentOrder } = useAppState();

  return (
    <Screen>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Feather name="check" size={40} color={colors.background} />
        </View>
        <Text style={styles.title}>¡Pedido confirmado!</Text>
        {currentOrder ? (
          <>
            <Text style={styles.orderNumber}>{currentOrder.orderNumber}</Text>
            <View style={styles.summaryCard}>
              {currentOrder.items.map((item) => (
                <View key={item.cartItemId} style={styles.row}>
                  <Text style={styles.rowLabel}>
                    {item.quantity}x {item.name}
                  </Text>
                  <Text style={styles.rowValue}>{formatCurrency(item.lineTotal)}</Text>
                </View>
              ))}
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(currentOrder.total)}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.mutedText}>No hay un pedido reciente para mostrar.</Text>
        )}

        <View style={styles.actions}>
          <Button label="Ver seguimiento" onPress={() => router.push('/order-tracking')} />
          <Button
            label="Volver al inicio"
            variant="secondary"
            onPress={() => router.replace('/(tabs)')}
            style={styles.secondaryAction}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxxl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
  },
  orderNumber: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.muted,
  },
  summaryCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    padding: spacing.base,
    marginTop: spacing.base,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
    flex: 1,
  },
  rowValue: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  totalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  totalLabel: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  totalValue: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },
  mutedText: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
  },
  actions: {
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  secondaryAction: {
    marginTop: 0,
  },
});
