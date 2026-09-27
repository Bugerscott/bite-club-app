import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { createOrder, type DeliveryMethod } from '../src/services/orders';

type CheckoutItem = { name: string; quantity: number; price: number };

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ items?: string }>();
  const [method, setMethod] = useState<DeliveryMethod>('pickup');
  const [submitting, setSubmitting] = useState(false);

  const items = useMemo<CheckoutItem[]>(() => {
    if (!params.items) return [];
    try {
      const parsed = JSON.parse(params.items);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && typeof item.name === 'string' && Number.isInteger(item.quantity) && item.quantity > 0 && Number.isFinite(item.price) && item.price >= 0);
    } catch {
      return [];
    }
  }, [params.items]);

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const submit = async () => {
    if (!items.length || submitting) return;
    try {
      setSubmitting(true);
      const order = await createOrder(items, method);
      const row = Array.isArray(order) ? order[0] : order;
      const number = row?.order_number ? ` #${row.order_number}` : '';
      Alert.alert('Pedido recibido', `Tu pedido${number} fue creado correctamente.`, [
        { text: 'Ver mis pedidos', onPress: () => router.replace('/orders') },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos crear el pedido.';
      if (message.toLowerCase().includes('iniciar sesion')) {
        Alert.alert('Inicia sesión', 'Necesitas una cuenta para confirmar tu pedido.', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar sesión', onPress: () => router.push('/auth') },
        ]);
      } else {
        Alert.alert('No pudimos crear el pedido', message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return <View style={styles.center}><Text>No hay productos para confirmar.</Text><Pressable onPress={() => router.back()}><Text style={styles.link}>Volver al menú</Text></Pressable></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar pedido</Text>
      {items.map((item, index) => <View key={`${item.name}-${index}`} style={styles.row}><Text>{item.quantity} × {item.name}</Text><Text>C$ {(item.quantity * item.price).toFixed(2)}</Text></View>)}
      <Text style={styles.total}>Total C$ {total.toFixed(2)}</Text>
      <Text style={styles.label}>¿Cómo lo recibes?</Text>
      <View style={styles.methods}>
        {(['pickup', 'delivery'] as DeliveryMethod[]).map((value) => <Pressable key={value} onPress={() => setMethod(value)} style={[styles.method, method === value && styles.selected]}><Text style={method === value ? styles.selectedText : undefined}>{value === 'pickup' ? 'Retiro' : 'Delivery'}</Text></Pressable>)}
      </View>
      <Pressable disabled={submitting} onPress={() => void submit()} style={[styles.submit, submitting && styles.disabled]}><Text style={styles.submitText}>{submitting ? 'Confirmando…' : 'Confirmar pedido'}</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: '#fff' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 24 }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  total: { fontSize: 22, fontWeight: '800', marginTop: 20 }, label: { fontWeight: '700', marginTop: 28, marginBottom: 12 }, methods: { flexDirection: 'row', gap: 12 },
  method: { flex: 1, alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 12 }, selected: { backgroundColor: '#111', borderColor: '#111' }, selectedText: { color: '#fff', fontWeight: '700' },
  submit: { marginTop: 30, padding: 17, borderRadius: 14, backgroundColor: '#111', alignItems: 'center' }, submitText: { color: '#fff', fontSize: 16, fontWeight: '800' }, disabled: { opacity: 0.5 }, link: { fontWeight: '700', textDecorationLine: 'underline' },
});
