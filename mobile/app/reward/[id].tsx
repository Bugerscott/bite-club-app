import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, Button } from '../../src/components';
import { colors, spacing, radius, typography } from '../../src/theme';
import { mockRewards } from '../../src/mocks';

const STATUS_LABEL: Record<string, string> = {
  available: 'Disponible',
  locked: 'Bloqueada',
  redeemed: 'Ya canjeada',
};

// Ruta /reward/[id] — instrucciones, sección 31. Sin canje real todavía.
export default function RewardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const reward = mockRewards.find((r) => r.id === id);

  if (!reward) {
    return (
      <Screen>
        <Text style={styles.notFound}>Recompensa no encontrada.</Text>
      </Screen>
    );
  }

  const ctaLabel =
    reward.status === 'available' ? 'Canjear' : reward.status === 'locked' ? 'Puntos insuficientes' : 'Ya canjeada';

  return (
    <Screen>
      <View style={styles.imageWrap}>
        <Feather name="gift" size={40} color={colors.reward} />
      </View>
      <Text style={styles.name}>{reward.name}</Text>
      <View style={styles.pointsRow}>
        <Feather name="star" size={16} color={colors.reward} />
        <Text style={styles.points}>{reward.pointsCost} pts</Text>
      </View>
      <Text style={styles.status}>{STATUS_LABEL[reward.status]}</Text>

      <View style={styles.footer}>
        <Button
          label={ctaLabel}
          onPress={() => router.back()}
          disabled={reward.status !== 'available'}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    width: 120,
    height: 120,
    borderRadius: radius.card,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  name: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.h1.fontSize,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  points: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.reward,
  },
  status: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  footer: {
    marginTop: spacing.xxxl,
  },
  notFound: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
