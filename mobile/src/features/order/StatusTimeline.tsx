import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import type { OrderTrackingStatus } from '../../types';

const STEPS: { status: OrderTrackingStatus; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { status: 'received', label: 'Pedido recibido', icon: 'file-text' },
  { status: 'preparing', label: 'Preparando', icon: 'coffee' },
  { status: 'ready', label: 'Listo', icon: 'check-circle' },
  { status: 'on_the_way', label: 'En camino', icon: 'truck' },
  { status: 'delivered', label: 'Entregado', icon: 'home' },
];

export interface StatusTimelineProps {
  currentStatus: OrderTrackingStatus;
}

/** Timeline de seguimiento de pedido — sin GPS ni mapas (instrucciones, sección 24). */
export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <View>
      {STEPS.map((step, index) => {
        const isDone = index <= currentIndex;
        const isLast = index === STEPS.length - 1;
        return (
          <View key={step.status} style={styles.row}>
            <View style={styles.iconColumn}>
              <View style={[styles.iconWrap, isDone && styles.iconWrapDone]}>
                <Feather name={step.icon} size={16} color={isDone ? colors.background : colors.muted} />
              </View>
              {!isLast ? <View style={[styles.line, isDone && styles.lineDone]} /> : null}
            </View>
            <Text style={[styles.label, isDone && styles.labelDone]}>{step.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconColumn: {
    alignItems: 'center',
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDone: {
    backgroundColor: colors.primary,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 24,
    backgroundColor: colors.divider,
  },
  lineDone: {
    backgroundColor: colors.primary,
  },
  label: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.muted,
    paddingTop: spacing.xs,
    paddingBottom: spacing.base,
  },
  labelDone: {
    color: colors.text,
    fontFamily: typography.h3.fontFamily,
  },
});
