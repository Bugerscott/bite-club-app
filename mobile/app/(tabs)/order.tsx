import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../../src/components';
import { mockCategories, mockProducts } from '../../src/mocks';
import { resolveProductThumbnail } from '../../src/lib/productImages';
import { getMenuProducts } from '../../src/services/catalog';
import { colors } from '../../src/theme';
import { useCart } from '../../src/state';
import type { Product } from '../../src/types';

type MenuRow = { type: 'category'; categoryId: string; label: string } | { type: 'product'; product: Product };
type ChipLayout = { x: number; width: number };

export default function OrderScreen() {
  const { width } = useWindowDimensions(); const insets = useSafeAreaInsets(); const router = useRouter(); const { addItem, itemCount } = useCart();
  const listRef = useRef<FlatList<MenuRow>>(null); const categoryScrollRef = useRef<ScrollView>(null); const chipLayouts = useRef<Record<string, ChipLayout>>({});
  const programmaticScroll = useRef(false); const programmaticScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts); const [activeCategory, setActiveCategory] = useState(mockCategories[0]?.id ?? '');
  const cardWidth = Math.max(260, width - 40);

  useEffect(() => { let active = true; getMenuProducts().then((remote) => { if (active && remote.length) setProducts(remote); }).catch(() => { /* Conserva menú oficial local si la red falla. */ }); return () => { active = false; }; }, []);
  const menuRows = useMemo<MenuRow[]>(() => { const rows: MenuRow[] = []; mockCategories.forEach((category) => { const categoryProducts = products.filter((p) => p.categoryId === category.id && p.available); if (!categoryProducts.length) return; rows.push({ type: 'category', categoryId: category.id, label: category.label }); categoryProducts.forEach((product) => rows.push({ type: 'product', product })); }); return rows; }, [products]);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 35, minimumViewTime: 80 }).current;
  const finishProgrammaticScroll = () => { if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current); programmaticScrollTimer.current = setTimeout(() => { programmaticScroll.current = false; }, 250); };
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ item: MenuRow; isViewable: boolean }> }) => { if (programmaticScroll.current) return; const first = viewableItems.find((entry) => entry.isViewable); if (!first) return; const id = first.item.type === 'category' ? first.item.categoryId : first.item.product.categoryId; setActiveCategory((current) => current === id ? current : id); }).current;
  useEffect(() => { const layout = chipLayouts.current[activeCategory]; if (!layout) return; categoryScrollRef.current?.scrollTo({ x: Math.max(0, layout.x - width / 2 + layout.width / 2), animated: true }); }, [activeCategory, width]);
  useEffect(() => () => { if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current); }, []);
  const goToCategory = (categoryId: string) => { const index = menuRows.findIndex((item) => item.type === 'category' && item.categoryId === categoryId); if (index < 0) return; programmaticScroll.current = true; if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current); setActiveCategory(categoryId); if (index === 0) listRef.current?.scrollToOffset({ offset: 0, animated: true }); else listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0, viewOffset: 72 }); programmaticScrollTimer.current = setTimeout(() => { programmaticScroll.current = false; }, 850); };
  function handleQuickAdd(product: Product) { if (!product.available) return; addItem({ productId: product.id, name: product.name, unitPrice: product.price, imageKey: product.images[0] ?? null, selectedSauce: product.saucesAvailable?.[0], selectedExtras: [] }, 1); }

  return <View style={styles.container}>
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}><Text style={styles.title}>Pedir</Text><Pressable onPress={() => router.push('/cart')} accessibilityRole="button" accessibilityLabel="Ver pedido" style={({ pressed }) => [styles.cartButton, pressed && styles.cartButtonPressed]}><Feather name="shopping-cart" size={23} color={colors.text} />{itemCount > 0 ? <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{itemCount > 99 ? '99+' : itemCount}</Text></View> : null}</Pressable></View>
    <FlatList ref={listRef} data={menuRows} keyExtractor={(item) => item.type === 'category' ? `category-${item.categoryId}` : `product-${item.product.id}`} initialNumToRender={5} maxToRenderPerBatch={4} windowSize={4} contentContainerStyle={styles.content} stickyHeaderIndices={[0]} viewabilityConfig={viewabilityConfig} onViewableItemsChanged={onViewableItemsChanged} onMomentumScrollEnd={finishProgrammaticScroll} onScrollEndDrag={finishProgrammaticScroll} onScrollToIndexFailed={(info) => { listRef.current?.scrollToOffset({ offset: info.averageItemLength * info.index, animated: false }); setTimeout(() => listRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0, viewOffset: 72 }), 60); }}
      ListHeaderComponent={<View style={styles.stickyShell}><BlurView intensity={75} tint="light" style={styles.glassCapsule}><View style={styles.glassTint}><ScrollView ref={categoryScrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryBarContent}>{mockCategories.map((category) => { const isActive = activeCategory === category.id; return <Pressable key={category.id} onLayout={(event) => { const { x, width: chipWidth } = event.nativeEvent.layout; chipLayouts.current[category.id] = { x, width: chipWidth }; }} onPress={() => goToCategory(category.id)} style={({ pressed }) => [styles.categoryChip, isActive && styles.categoryChipActive, pressed && styles.categoryChipPressed]}><Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>{category.label}</Text></Pressable>; })}</ScrollView></View></BlurView></View>}
      renderItem={({ item }) => item.type === 'category' ? <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{item.label}</Text></View> : <View style={styles.cardWrap}><ProductCard product={item.product} imageSource={item.product.imageUrl ? { uri: item.product.imageUrl } : resolveProductThumbnail(item.product.id)} cardWidth={cardWidth} onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.product.id } })} onAddPress={() => handleQuickAdd(item.product)} /></View>} />
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background }, header: { paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.background }, title: { fontSize: 30, fontWeight: '700', color: colors.text },
  cartButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.92)', borderWidth: 1, borderColor: 'rgba(116,141,175,0.18)', shadowColor: '#000000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }, cartButtonPressed: { opacity: 0.72, transform: [{ scale: 0.94 }] },
  cartBadge: { position: 'absolute', top: -2, right: -2, minWidth: 19, height: 19, paddingHorizontal: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E41A17', borderWidth: 2, borderColor: '#FFFFFF' }, cartBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700', lineHeight: 12, textAlign: 'center' }, content: { paddingBottom: 150 },
  stickyShell: { backgroundColor: 'transparent', paddingHorizontal: 12, paddingTop: 6, paddingBottom: 8, zIndex: 30 }, glassCapsule: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.82)', shadowColor: '#000000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.08, shadowRadius: 14, elevation: 5 }, glassTint: { backgroundColor: 'rgba(255,255,255,0.36)', paddingVertical: 8 }, categoryBarContent: { paddingHorizontal: 10, gap: 8 },
  categoryChip: { height: 38, justifyContent: 'center', paddingHorizontal: 16, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: 'rgba(116,141,175,0.16)' }, categoryChipActive: { backgroundColor: '#E41A17', borderColor: '#E41A17', shadowColor: '#E41A17', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.22, shadowRadius: 8, elevation: 3 }, categoryChipPressed: { transform: [{ scale: 0.96 }], opacity: 0.86 }, categoryChipText: { fontSize: 14, fontWeight: '600', color: '#53657D' }, categoryChipTextActive: { color: '#FFFFFF' },
  sectionHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, backgroundColor: '#FFFFFF' }, sectionTitle: { fontSize: 24, fontWeight: '700', color: '#53657D' }, cardWrap: { paddingHorizontal: 20, marginBottom: 16 },
});
