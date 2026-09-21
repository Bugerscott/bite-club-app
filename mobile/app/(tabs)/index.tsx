import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  Screen,
  SectionHeader,
  HeroBanner,
  ProductCard,
  PointsCard,
  IconButton,
} from '../../src/components';
import { colors, spacing, typography } from '../../src/theme';
import { mockProducts, mockOrders, mockMember } from '../../src/mocks';
import { formatCurrency } from '../../src/utils';
import { resolveProductImage } from '../../src/lib/productImages';

// Jerarquía de Inicio (instrucciones, sección 14):
// Logo -> Hero Mordida Nica -> Club -> Lo más pedido -> Destacado -> Ofertas -> Últimos pedidos
export default function HomeScreen() {
  const router = useRouter();
  const starProduct = mockProducts.find((p) => p.starProduct);
  const secondaryFeatured = mockProducts.find((p) => p.featured && !p.starProduct);
  const mostOrdered = mockProducts.filter((p) => p.available).slice(0, 6);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.logoText}>Bite Club</Text>
        <View style={styles.headerActions}>
          <IconButton
            name="bell"
            accessibilityLabel="Notificaciones"
            onPress={() => router.push('/notifications')}
          />
          <IconButton
            name="user"
            accessibilityLabel="Mi perfil"
            onPress={() => router.push('/profile')}
          />
        </View>
      </View>

      {starProduct ? (
        <View style={styles.section}>
          <HeroBanner
            title={starProduct.name}
            subtitle="Algo rico"
            imageSource={resolveProductImage(starProduct.images[0])}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: starProduct.id } })}
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <PointsCard pointsBalance={mockMember.pointsBalance} nextMilestone={500} />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Lo más pedido"
          actionLabel="Ver todo"
          onActionPress={() => router.push('/(tabs)/order')}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mostOrdered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              imageSource={resolveProductImage(item.images[0])}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
            />
          )}
        />
      </View>

      {secondaryFeatured ? (
        <View style={styles.section}>
          <SectionHeader title="Destacado" />
          <ProductCard
            product={secondaryFeatured}
            imageSource={resolveProductImage(secondaryFeatured.images[0])}
            onPress={() =>
              router.push({ pathname: '/product/[id]', params: { id: secondaryFeatured.id } })
            }
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader
          title="Ofertas"
          actionLabel="Ver todo"
          onActionPress={() => router.push('/(tabs)/offers')}
        />
        <Text style={styles.mutedText}>
          Todavía no hay promociones activas — vuelve pronto.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Últimos pedidos"
          actionLabel="Ver todo"
          onActionPress={() => router.push('/order-history')}
        />
        {mockOrders.slice(0, 2).map((order) => (
          <View key={order.id} style={styles.orderRow}>
            <View style={styles.orderIconWrap}>
              <Feather name="shopping-bag" size={16} color={colors.secondary} />
            </View>
            <View style={styles.orderBody}>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <Text style={styles.orderSummary} numberOfLines={1}>
                {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
              </Text>
            </View>
            <Text style={styles.orderTotal}>{formatCurrency(order.total)}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
  },
  logoText: {
    fontFamily: typography.display.fontFamily,
    fontSize: 28,
    color: colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  horizontalList: {
    gap: spacing.sm,
  },
  mutedText: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  orderIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBody: {
    flex: 1,
    gap: 2,
  },
  orderNumber: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  orderSummary: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  orderTotal: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.primary,
  },
});
