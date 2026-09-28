import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radius, typography, sizes } from '../../src/theme';
import { mockProducts, mockExtras } from '../../src/mocks';
import { formatCurrency } from '../../src/utils';
import { resolveProductImage } from '../../src/lib/productImages';
import { Button, QuantityStepper, PriceBadge } from '../../src/components';
import { ProductOptionsPicker } from '../../src/features/order/ProductOptionsPicker';
import { useCart } from '../../src/state';
import { getMenuProductById } from '../../src/services/catalog';
import type { Product, SauceOption } from '../../src/types';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const galleryHeight = width * 0.72;
  const { addItem } = useCart();
  const localProduct = useMemo(() => mockProducts.find((p) => p.id === id) ?? null, [id]);
  const [product, setProduct] = useState<Product | null>(localProduct);
  const [loading, setLoading] = useState(!localProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedSauce, setSelectedSauce] = useState<SauceOption | undefined>(localProduct?.saucesAvailable?.[0]);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);

  useEffect(() => {
    if (!id || localProduct) return;
    let active = true;
    setLoading(true);
    getMenuProductById(id).then((result) => { if (active) setProduct(result); }).catch(() => { if (active) setProduct(null); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, localProduct]);

  if (loading) return <SafeAreaView style={styles.notFound}><ActivityIndicator color={colors.primary} /></SafeAreaView>;
  if (!product) return <SafeAreaView style={styles.notFound}><Text style={styles.notFoundText}>Producto no encontrado.</Text><Button label="Volver" onPress={() => router.back()} variant="secondary" /></SafeAreaView>;

  const availableExtras = mockExtras.filter((extra) => product.extrasAvailable?.includes(extra.id));
  const selectedExtras = availableExtras.filter((extra) => selectedExtraIds.includes(extra.id));
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const total = (product.price + extrasTotal) * quantity;
  const remoteImage = product.imageUrl ? { uri: product.imageUrl } : null;

  function toggleExtra(extraId: string) { setSelectedExtraIds((prev) => prev.includes(extraId) ? prev.filter((value) => value !== extraId) : [...prev, extraId]); }
  function handleAddToCart() {
    if (!product) return;
    addItem({ productId: product.id, name: product.name, unitPrice: product.price, imageKey: product.images[0] ?? null, selectedSauce, selectedExtras }, quantity);
    router.push('/cart');
  }

  return <View style={styles.container}>
    <SafeAreaView edges={['top']} pointerEvents="box-none" style={styles.topOverlay}><Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Volver" style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}><Feather name="chevron-left" size={25} color={colors.text} /></Pressable></SafeAreaView>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {remoteImage ? <Image source={remoteImage} style={[styles.galleryImage, { width, height: galleryHeight }]} resizeMode="cover" /> : product.images.length > 0 ? <FlatList horizontal pagingEnabled showsHorizontalScrollIndicator={false} data={product.images} keyExtractor={(key) => key} renderItem={({ item }) => { const source = resolveProductImage(item); return source ? <Image source={source} style={[styles.galleryImage, { width, height: galleryHeight }]} resizeMode="cover" /> : <View style={[styles.galleryImage, styles.galleryPlaceholder, { width, height: galleryHeight }]} />; }} /> : <View style={[styles.galleryImage, styles.galleryPlaceholder, { width, height: galleryHeight }]} />}
      <View style={styles.body}>
        <Text style={styles.category}>{product.categoryId.replace('-', ' ')}</Text><Text style={styles.name}>{product.name}</Text><PriceBadge price={product.price} />
        {product.description ? <Text style={styles.description}>{product.description}</Text> : null}{product.includesFries ? <Text style={styles.includesFries}>Incluye papas fritas</Text> : null}{product.additionalInfo ? <Text style={styles.additionalInfo}>{product.additionalInfo}</Text> : null}
        <View style={styles.optionsSection}><ProductOptionsPicker sauces={product.saucesAvailable} selectedSauce={selectedSauce} onSelectSauce={setSelectedSauce} extras={availableExtras} selectedExtraIds={selectedExtraIds} onToggleExtra={toggleExtra} /></View>
        <View style={styles.quantitySection}><Text style={styles.quantityLabel}>Cantidad</Text><QuantityStepper quantity={quantity} onIncrease={() => setQuantity((q) => Math.min(99, q + 1))} onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} /></View>
      </View>
    </ScrollView>
    <SafeAreaView edges={['bottom']} style={styles.ctaBar}><Button label={`Agregar al pedido · ${formatCurrency(total)}`} onPress={handleAddToCart} disabled={!product.available} /></SafeAreaView>
  </View>;
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:colors.background},topOverlay:{position:'absolute',top:0,left:0,right:0,zIndex:30,paddingHorizontal:spacing.base,alignItems:'flex-start'},backButton:{width:44,height:44,borderRadius:22,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,0.92)',borderWidth:1,borderColor:'rgba(255,255,255,0.92)',shadowColor:'#000000',shadowOffset:{width:0,height:3},shadowOpacity:0.12,shadowRadius:8,elevation:4},backButtonPressed:{opacity:0.72,transform:[{scale:0.94}]},scrollContent:{paddingBottom:sizes.ctaHeight+spacing.xxxl},galleryImage:{backgroundColor:colors.divider},galleryPlaceholder:{backgroundColor:colors.divider},body:{padding:spacing.lg,gap:spacing.sm},category:{fontFamily:typography.caption.fontFamily,fontSize:typography.caption.fontSize,color:colors.secondary,textTransform:'capitalize'},name:{fontFamily:typography.h1.fontFamily,fontSize:typography.h1.fontSize,color:colors.text},description:{fontFamily:typography.body.fontFamily,fontSize:typography.body.fontSize,color:colors.text,marginTop:spacing.xs},includesFries:{fontFamily:typography.caption.fontFamily,fontSize:typography.caption.fontSize,color:colors.muted},additionalInfo:{fontFamily:typography.caption.fontFamily,fontSize:typography.caption.fontSize,color:colors.accent},optionsSection:{marginTop:spacing.lg},quantitySection:{marginTop:spacing.lg,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},quantityLabel:{fontFamily:typography.h3.fontFamily,fontSize:typography.h3.fontSize,color:colors.text},ctaBar:{padding:spacing.lg,borderTopWidth:1,borderTopColor:colors.divider,backgroundColor:colors.background},notFound:{flex:1,alignItems:'center',justifyContent:'center',gap:spacing.base,backgroundColor:colors.background},notFoundText:{fontFamily:typography.body.fontFamily,fontSize:typography.body.fontSize,color:colors.text}
});
