import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { getMyOrders } from '../src/services/orders';

type Order = Awaited<ReturnType<typeof getMyOrders>>[number];
const labels: Record<string, string> = { pending: 'Pendiente', confirmed: 'Confirmado', preparing: 'Preparando', ready: 'Listo', delivering: 'En camino', completed: 'Completado', cancelled: 'Cancelado' };

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { try { setError(null); setOrders(await getMyOrders()); } catch { setError('No pudimos cargar tus pedidos.'); } finally { setLoading(false); } }, []);
  useEffect(() => { void load(); }, [load]);
  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <View style={styles.container}><Text style={styles.title}>Mis pedidos</Text>{error ? <Pressable onPress={() => void load()}><Text style={styles.error}>{error} Toca para reintentar.</Text></Pressable> : null}<FlatList data={orders} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListEmptyComponent={<View style={styles.center}><Text>Aún no tienes pedidos.</Text><Pressable onPress={() => router.replace('/(tabs)/order')}><Text style={styles.link}>Ir al menú</Text></Pressable></View>} renderItem={({ item }) => <View style={styles.card}><View style={styles.row}><Text style={styles.number}>#{item.order_number ?? item.id.slice(0, 8)}</Text><Text style={styles.status}>{labels[item.status] ?? item.status}</Text></View><Text>{item.delivery_method === 'delivery' ? 'Delivery' : 'Retiro'}</Text>{item.order_items?.map((line) => <Text key={line.id} style={styles.item}>{line.quantity} × {line.item_name}</Text>)}<Text style={styles.total}>C$ {Number(item.total).toFixed(2)}</Text></View>} /></View>;
}
const styles = StyleSheet.create({ container:{flex:1,backgroundColor:'#fff',paddingTop:18}, title:{fontSize:28,fontWeight:'800',paddingHorizontal:20}, list:{padding:16,gap:14,flexGrow:1}, center:{flex:1,alignItems:'center',justifyContent:'center',gap:14,padding:24}, card:{padding:18,borderWidth:1,borderColor:'#e8e8e8',borderRadius:16,gap:7},row:{flexDirection:'row',justifyContent:'space-between'},number:{fontSize:18,fontWeight:'800'},status:{fontWeight:'700'},item:{color:'#555'},total:{fontSize:18,fontWeight:'800',marginTop:6},error:{margin:16,color:'#8a1c1c'},link:{fontWeight:'700',textDecorationLine:'underline'} });
