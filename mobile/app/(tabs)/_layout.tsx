import { Tabs } from 'expo-router';

// Navegación oficial de Bite Club: Inicio | Club | Pedir | Ofertas | Más
// Placeholders funcionales — sin diseño visual todavía.
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="club" options={{ title: 'Club' }} />
      <Tabs.Screen name="order" options={{ title: 'Pedir' }} />
      <Tabs.Screen name="offers" options={{ title: 'Ofertas' }} />
      <Tabs.Screen name="more" options={{ title: 'Más' }} />
    </Tabs>
  );
}
