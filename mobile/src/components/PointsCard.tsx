import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows, typography } from '../theme';

export interface PointsCardProps {
  pointsBalance: number;
  /** Puntos necesarios para el próximo nivel/recompensa, si aplica. */
  nextMilestone?: number | null;
}

/** Card de saldo de puntos — pantalla Club. Usa colors.reward como acento principal. */
export function PointsCard({ pointsBalance, nextMilestone }: PointsCardProps) {
  const progress =
    nextMilestone && nextMilestone > 0 ? Math.min(pointsBalance / nextMilestone, 1) : null;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Feather name="star" size={20} color={colors.reward} />
        </View>
        <View style={styles.texts}>
          <Text style={styles.label}>Tus puntos</Text>
          <Text style={styles.value}>{pointsBalance}</Text>
        </View>
      </View>
      {progress != null ? (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.base,
    gap: spacing.sm,
    ...shadows.soft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.iconButton,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    gap: 2,
  },
  label: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  value: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
  },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.divider,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.reward,
  },
});
