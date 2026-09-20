import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows, typography } from '../theme';
import type { RewardItem } from '../types';

export interface RewardCardProps {
  reward: RewardItem;
  onPress?: () => void;
  imageSource?: { uri: string } | number | null;
}

const STATUS_LABEL: Record<RewardItem['status'], string> = {
  available: 'Disponible',
  locked: 'Bloqueada',
  redeemed: 'Canjeada',
};

/** Card de recompensa — instrucciones, sección "19. REWARD CARD". Usa colors.reward para puntos. */
export function RewardCard({ reward, onPress, imageSource }: RewardCardProps) {
  const isInteractive = onPress && reward.status === 'available';

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      accessibilityRole={isInteractive ? 'button' : undefined}
      accessibilityLabel={`${reward.name}, ${STATUS_LABEL[reward.status]}`}
      style={({ pressed }) => [
        styles.card,
        reward.status !== 'available' && styles.inactive,
        pressed && isInteractive && styles.pressed,
      ]}
    >
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
        {reward.status === 'redeemed' ? (
          <View style={styles.redeemedOverlay}>
            <Feather name="check-circle" size={28} color={colors.background} />
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {reward.name}
        </Text>
        <View style={styles.pointsRow}>
          <Feather name="star" size={14} color={colors.reward} />
          <Text style={styles.points}>{reward.pointsCost} pts</Text>
        </View>
        {reward.status !== 'available' ? (
          <Text style={styles.status}>{STATUS_LABEL[reward.status]}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.sm,
    gap: spacing.xs,
    ...shadows.soft,
  },
  inactive: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.divider,
  },
  redeemedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    gap: 2,
  },
  name: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  points: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.reward,
  },
  status: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
  },
});
