import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../src/theme';
import { Button, EmptyState } from '../src/components';
import { CartLineItem } from '../src/features/cart/CartLineItem';
import { useCart } from '../src/state';
import { formatCurrency } from '../src/utils';

// Ruta /cart — instrucciones, sección 18.
export default function CartScreen() {
  const router = useRouter();
  const { items, subtotal, incrementItem, decrementItem, removeItem, lineTotal } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.emptyContainer}>
        <EmptyState
          icon="shopping-bag"
          title="Tu carrito está vacío"
          description="Agrega algo rico desde el menú."
          actionLabel="Ir al menú"
          onActionPress={() => router.push('/(tabs)/order')}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.cartItemId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartLineItem
            item={item}
            lineTotal={lineTotal(item)}
            onIncrease={() => incrementItem(item.cartItemId)}
            onDecrease={() => decrementItem(item.cartItemId)}
            onRemove={() => removeItem(item.cartItemId)}
          />
        )}
      />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
        </View>
        <Button label="Continuar" onPress={() => router.push('/delivery')} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    gap: spacing.sm,
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
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
});
