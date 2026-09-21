export type NotificationKind = 'order' | 'club' | 'general';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  kind: NotificationKind;
}
