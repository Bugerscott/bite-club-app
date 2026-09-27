import { Tabs } from 'expo-router';
import { LiquidTabBar } from '../../src/components/navigation/LiquidTabBar';

/**
 * Navegación oficial: Inicio | Club | Pedir | Ofertas | Más.
 * La barra líquida (`LiquidTabBar`, instrucciones sección 5) reemplaza el
 * render por defecto de React Navigation y es dueña de iconos/labels/estado
 * activo — por eso `tabBarIcon` ya no se define por pantalla aquí.
 */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <LiquidTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="club" options={{ title: 'Club' }} />
      <Tabs.Screen name="order" options={{ title: 'Pedir' }} />
      <Tabs.Screen name="offers" options={{ title: 'Ofertas' }} />
      <Tabs.Screen name="more" options={{ title: 'Más' }} />
    </Tabs>
  );
}
