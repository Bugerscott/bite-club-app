import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../src/theme';
import { Badge } from '../../src/components';
import { useCart } from '../../src/state';

/** Navegación oficial: Inicio | Club | Pedir | Ofertas | Más. */
export default function TabsLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          paddingTop: spacing.xs,
        },
        tabBarLabelStyle: {
          fontFamily: typography.navLabel.fontFamily,
          fontSize: typography.navLabel.fontSize,
          lineHeight: typography.navLabel.lineHeight,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="club"
        options={{
          title: 'Club',
          tabBarIcon: ({ color, size }) => <Feather name="star" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Pedir',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="shopping-bag" size={size} color={color} />
              <Badge count={itemCount} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Ofertas',
          tabBarIcon: ({ color, size }) => <Feather name="tag" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Más',
          tabBarIcon: ({ color, size }) => <Feather name="menu" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
