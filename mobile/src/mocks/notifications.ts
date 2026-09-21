import type { AppNotification } from '../types';

/** Notificaciones mock — sin push real en esta fase (instrucciones, sección 29). */
export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-dev-1',
    title: '[DEV] Tu pedido va en camino',
    body: 'Placeholder de notificación de seguimiento de pedido.',
    createdAt: '2026-09-20T13:05:00-06:00',
    read: false,
    kind: 'order',
  },
  {
    id: 'notif-dev-2',
    title: '[DEV] Sumaste puntos en tu Club',
    body: 'Placeholder de notificación de puntos.',
    createdAt: '2026-09-18T10:00:00-06:00',
    read: true,
    kind: 'club',
  },
  {
    id: 'notif-dev-3',
    title: '[DEV] Bienvenido a Bite Club',
    body: 'Placeholder de notificación general.',
    createdAt: '2026-09-10T09:00:00-06:00',
    read: true,
    kind: 'general',
  },
];
