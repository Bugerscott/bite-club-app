import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, SectionHeader, MemberCard, PointsCard, RewardCard, Divider } from '../../src/components';
import { colors, spacing, radius, typography, screenPaddingHorizontal } from '../../src/theme';
import { mockMember, mockRewards } from '../../src/mocks';

export default function ClubScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const rewardCardWidth = Math.max(120, Math.floor((width - screenPaddingHorizontal * 2 - spacing.sm) / 2));

  return (
    <Screen scroll>
      <Text style={styles.title}>Mi Club</Text>

      <View style={styles.section}>
        <MemberCard member={mockMember} />
      </View>

      <View style={styles.section}>
        <PointsCard pointsBalance={mockMember.pointsBalance} nextMilestone={500} />
      </View>

      <View style={[styles.section, styles.qrCard]}>
        <View style={styles.qrPlaceholder}>
          <Feather name="grid" size={40} color={colors.muted} />
        </View>
        <Text style={styles.qrLabel}>Código de miembro</Text>
        <Text style={styles.qrCaption}>QR pendiente de conexión con el sistema de puntos.</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Historial de puntos" actionLabel="Ver todo" onActionPress={() => router.push('/points-history')} />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <SectionHeader title="Recompensas" />
        <FlatList
          data={mockRewards}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.rewardsRow}
          renderItem={({ item }) => (
            <RewardCard
              reward={item}
              cardWidth={rewardCardWidth}
              onPress={() => router.push({ pathname: '/reward/[id]', params: { id: item.id } })}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: typography.h1.fontFamily, fontSize: typography.h1.fontSize, lineHeight: typography.h1.lineHeight, color: colors.text, marginTop: spacing.sm, marginBottom: spacing.base },
  section: { marginBottom: spacing.xl },
  divider: { marginBottom: spacing.xl },
  qrCard: { alignItems: 'center', backgroundColor: colors.background, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  qrPlaceholder: { width: 120, height: 120, borderRadius: radius.button, backgroundColor: colors.divider, alignItems: 'center', justifyContent: 'center' },
  qrLabel: { fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize, lineHeight: typography.body.lineHeight, color: colors.text, textAlign: 'center' },
  qrCaption: { fontFamily: typography.micro.fontFamily, fontSize: typography.micro.fontSize, lineHeight: typography.micro.lineHeight, color: colors.muted, textAlign: 'center' },
  rewardsRow: { justifyContent: 'space-between', marginBottom: spacing.sm },
});
