import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Screen, EmptyState, Divider } from '../src/components';
import { spacing } from '../src/theme';
import { mockNotifications } from '../src/mocks';
import { NotificationRow } from '../src/features/profile/NotificationRow';
import type { AppNotification } from '../src/types';

// Ruta /notifications — instrucciones, sección 29: lista mock, leída/no
// leída, vacío. Sin push real.
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  if (notifications.length === 0) {
    return (
      <Screen>
        <EmptyState icon="bell" title="Sin notificaciones" />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: spacing.base }}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <NotificationRow notification={item} onPress={() => markRead(item.id)} />
        )}
      />
    </Screen>
  );
}
