import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme';
import type { AppNotification } from '../../types';

const KIND_ICON: Record<AppNotification['kind'], keyof typeof Feather.glyphMap> = {
  order: 'shopping-bag',
  club: 'star',
  general: 'bell',
};

export interface NotificationRowProps {
  notification: AppNotification;
  onPress?: () => void;
}

export function NotificationRow({ notification, onPress }: NotificationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${notification.title}${notification.read ? '' : ', no leída'}`}
      style={styles.row}
    >
      <View style={[styles.iconWrap, !notification.read && styles.iconWrapUnread]}>
        <Feather
          name={KIND_ICON[notification.kind]}
          size={16}
          color={notification.read ? colors.secondary : colors.primary}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, !notification.read && styles.titleUnread]} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.text} numberOfLines={2}>
          {notification.body}
        </Text>
      </View>
      {!notification.read ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.iconButton,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapUnread: {
    backgroundColor: colors.pressedPrimarySurface,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  titleUnread: {
    fontFamily: typography.h3.fontFamily,
  },
  text: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
});
