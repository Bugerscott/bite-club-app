import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, CategoryChip, ProductCard, EmptyState } from '../../src/components';
import { colors, spacing, radius, sizes, typography, screenPaddingHorizontal } from '../../src/theme';
import { mockCategories, mockProducts } from '../../src/mocks';
import type { MenuCategoryId } from '../../src/types';
import { formatCurrency } from '../../src/utils';
import { resolveProductImage } from '../../src/lib/productImages';
import { useCart } from '../../src/state';

// Pantalla Pedir/Menú — instrucciones, sección 16: buscador, categorías,
// chips, productos, imágenes, nombre, descripción corta, precio, botón
// agregar, carrito, contador.
export default function OrderScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { itemCount, subtotal } = useCart();
  const cardWidth = Math.max(120, Math.floor((width - screenPaddingHorizontal * 2 - spacing.sm) / 2));
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | null>(null);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      const matchesQuery =
        query.trim().length === 0 || product.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <Screen>
      <Text style={styles.title}>Pedir</Text>
      <View style={styles.searchRow}>
        <Feather name="search" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar en el menú"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          accessibilityLabel="Buscar en el menú"
        />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={mockCategories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chipsRow}
        renderItem={({ item }) => (
          <CategoryChip
            label={item.label}
            selected={selectedCategory === item.id}
            onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
          />
        )}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState icon="search" title="Sin resultados" description="Intenta con otra búsqueda o categoría." />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[styles.gridContent, itemCount > 0 && styles.gridContentWithCart]}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              imageSource={resolveProductImage(item.images[0])}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
              cardWidth={cardWidth}
            />
          )}
        />
      )}

      {itemCount > 0 ? (
        <Pressable
          onPress={() => router.push('/cart')}
          accessibilityRole="button"
          accessibilityLabel={`Ver carrito, ${itemCount} artículos, ${formatCurrency(subtotal)}`}
          style={styles.cartBar}
        >
          <Text style={styles.cartBarText}>{itemCount} en el carrito</Text>
          <Text style={styles.cartBarTotal}>{formatCurrency(subtotal)}</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    lineHeight: typography.h1.lineHeight,
    color: colors.text,
    marginTop: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    paddingHorizontal: spacing.base,
    height: 44,
    marginTop: spacing.base,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  chipsRow: {
    gap: spacing.sm,
    paddingVertical: spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  gridContent: {
    paddingBottom: spacing.xl,
  },
  gridContentWithCart: {
    paddingBottom: sizes.ctaHeight + spacing.xxxl,
  },
  cartBar: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.base,
    height: sizes.ctaHeight,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
  },
  cartBarText: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.background,
  },
  cartBarTotal: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.background,
  },
});
