import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
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
import { resolveProductThumbnail } from '../../src/lib/productImages';

const biteClubLogo = require('../../assets/brand/Bite-Club-_logo-primary.png');
const mordidaNicaHero = require('../../assets/products/mordida-nica-hero.jpg');

export default function HomeScreen() {
  const router = useRouter();
  const starProduct = mockProducts.find((product) => product.starProduct);
  const secondaryFeatured = mockProducts.find((product) => product.featured && !product.starProduct);
  const mostOrdered = [
    ...mockProducts.filter((product) => product.starProduct && product.available),
    ...mockProducts.filter((product) => !product.starProduct && product.available),
  ].slice(0, 6);

  return (
    <Screen scroll contentStyle={styles.screenContent}>
      <View style={styles.header}>
        <Image source={biteClubLogo} style={styles.logo} resizeMode="contain" accessibilityLabel="Bite Club" />
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
            actionLabel="Pedir ahora"
            imageSource={mordidaNicaHero}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: starProduct.id } })}
          />
        </View>
      ) : null}

      <Pressable
        onPress={() => router.push('/(tabs)/club')}
        accessibilityRole="button"
        accessibilityLabel="Abrir Mi Club"
        style={styles.section}
      >
        <PointsCard pointsBalance={mockMember.pointsBalance} nextMilestone={500} />
      </Pressable>

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
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              imageSource={resolveProductThumbnail(item.id)}
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
            cardWidth={200}
            imageSource={resolveProductThumbnail(secondaryFeatured.id)}
            onPress={() =>
              router.push({ pathname: '/product/[id]', params: { id: secondaryFeatured.id } })
            }
          />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader
          title="Ofertas"
          actionLabel="Ver todas"
          onActionPress={() => router.push('/(tabs)/offers')}
        />
        <Text style={styles.mutedText}>No hay ofertas activas.</Text>
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
                {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
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
  screenContent: {
    paddingBottom: spacing.xxxl * 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  logo: {
    width: 150,
    height: 60,
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
    paddingVertical: spacing.xs,
  },
  mutedText: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
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
    lineHeight: typography.h3.lineHeight,
    color: colors.text,
  },
  orderSummary: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    color: colors.muted,
  },
  orderTotal: {
    fontFamily: typography.price.fontFamily,
    fontSize: typography.price.fontSize,
    lineHeight: typography.price.lineHeight,
    color: colors.primary,
  },
});
