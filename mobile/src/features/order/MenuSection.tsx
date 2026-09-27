import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductCard } from '../../components';
import { colors, spacing, typography } from '../../theme';
import type { Product } from '../../types';

export interface MenuSectionHeaderProps {
  title: string;
}

/** Título de sección dentro del menú continuo — instrucciones, sección 6. */
export function MenuSectionHeader({ title }: MenuSectionHeaderProps) {
  return (
    <View style={styles.headerWrap}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export interface MenuProductRowProps {
  products: Product[];
  cardWidth: number;
  onPressProduct: (id: string) => void;
  resolveImage: (product: Product) => { uri: string } | number | null;
}

/**
 * Fila de 1-2 productos dentro de una sección — patrón "grid sobre
 * SectionList": cada `item` del SectionList es una fila ya agrupada
 * (ver `chunkProducts`), no un producto individual.
 */
export function MenuProductRow({ products, cardWidth, onPressProduct, resolveImage }: MenuProductRowProps) {
  return (
    <View style={styles.row}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          imageSource={resolveImage(product)}
          cardWidth={cardWidth}
          onPress={() => onPressProduct(product.id)}
        />
      ))}
      {products.length === 1 ? <View style={{ width: cardWidth }} /> : null}
    </View>
  );
}

/** Agrupa una lista en sub-listas de tamaño `size` (para el patrón grid + SectionList). */
export function chunkProducts<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: typography.sectionTitle.fontFamily,
    fontSize: typography.sectionTitle.fontSize,
    lineHeight: typography.sectionTitle.lineHeight,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
});
