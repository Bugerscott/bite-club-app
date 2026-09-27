import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getActiveProducts, type Product } from '../../src/services/catalog';

type Cart = Record<string, number>;

export default function OrderScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      setProducts(await getActiveProducts());
    } catch {
      setError('No pudimos cargar el menú. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const changeQuantity = useCallback((productId: string, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[productId] ?? 0) + delta);
      if (next === 0) {
        const { [productId]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [productId]: next };
    });
  }, []);

  const summary = useMemo(() => {
    return products.reduce(
      (result, product) => {
        const quantity = cart[product.id] ?? 0;
        return {
          items: result.items + quantity,
          total: result.total + quantity * Number(product.price),
        };
      },
      { items: 0, total: 0 },
    );
  }, [cart, products]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Cargando menú…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedir</Text>
        <Text style={styles.subtitle}>Menú disponible</Text>
      </View>

      {error ? (
        <View style={styles.messageBox}>
          <Text style={styles.error}>{error}</Text>
          <Pressable accessibilityRole="button" onPress={() => void loadProducts()} style={styles.retryButton}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={products.length === 0 ? styles.emptyList : styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              void loadProducts();
            }}
          />
        }
        ListEmptyComponent={
          <Text style={styles.muted}>Todavía no hay productos activos publicados.</Text>
        }
        renderItem={({ item }) => {
          const quantity = cart[item.id] ?? 0;
          return (
            <View style={styles.card}>
              {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.image} /> : null}
              <View style={styles.productBody}>
                <Text style={styles.productName}>{item.name}</Text>
                {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
                <Text style={styles.price}>C$ {Number(item.price).toFixed(2)}</Text>
                <View style={styles.quantityRow}>
                  <Pressable
                    accessibilityLabel={`Quitar una unidad de ${item.name}`}
                    accessibilityRole="button"
                    disabled={quantity === 0}
                    onPress={() => changeQuantity(item.id, -1)}
                    style={[styles.quantityButton, quantity === 0 && styles.disabled]}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <Pressable
                    accessibilityLabel={`Agregar una unidad de ${item.name}`}
                    accessibilityRole="button"
                    onPress={() => changeQuantity(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />

      {summary.items > 0 ? (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartItems}>{summary.items} producto{summary.items === 1 ? '' : 's'}</Text>
            <Text style={styles.cartTotal}>C$ {summary.total.toFixed(2)}</Text>
          </View>
          <Text style={styles.cartHint}>Checkout en el siguiente bloque</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 3, fontSize: 14, color: '#666' },
  list: { padding: 16, gap: 14, paddingBottom: 120 },
  emptyList: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 18, overflow: 'hidden', backgroundColor: '#fff' },
  image: { width: '100%', height: 190, backgroundColor: '#f3f3f3' },
  productBody: { padding: 16 },
  productName: { fontSize: 19, fontWeight: '800' },
  description: { marginTop: 6, color: '#666', lineHeight: 20 },
  price: { marginTop: 10, fontSize: 18, fontWeight: '800' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 14 },
  quantityButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' },
  quantityButtonText: { color: '#fff', fontSize: 24, lineHeight: 26, fontWeight: '700' },
  quantity: { minWidth: 24, textAlign: 'center', fontSize: 18, fontWeight: '700' },
  disabled: { opacity: 0.25 },
  muted: { color: '#666', textAlign: 'center' },
  messageBox: { marginHorizontal: 16, padding: 14, borderRadius: 12, backgroundColor: '#f7f7f7' },
  error: { color: '#8a1c1c' },
  retryButton: { alignSelf: 'flex-start', marginTop: 10, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#111' },
  retryText: { color: '#fff', fontWeight: '700' },
  cartBar: { position: 'absolute', left: 14, right: 14, bottom: 12, borderRadius: 16, padding: 16, backgroundColor: '#111', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cartItems: { color: '#fff', fontSize: 13 },
  cartTotal: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 2 },
  cartHint: { color: '#bbb', fontSize: 11, maxWidth: 125, textAlign: 'right' },
});
