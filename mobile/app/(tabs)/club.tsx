import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, SectionHeader, MemberCard, PointsCard, RewardCard, Divider } from '../../src/components';
import { colors, spacing, radius, typography } from '../../src/theme';
import { mockMember, mockRewards } from '../../src/mocks';

// Pantalla Club — instrucciones, sección 15: Mi Club, puntos, MemberCard, QR
// placeholder, progreso, recompensas disponibles/bloqueadas, historial de
// puntos, detalle de recompensa. Sin reglas comerciales definitivas inventadas.
export default function ClubScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
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
        <Text style={styles.qrLabel}>Muestra este código en caja para sumar puntos</Text>
        <Text style={styles.qrCaption}>[DEV] Placeholder — QR real pendiente de integración</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Historial de puntos"
          actionLabel="Ver todo"
          onActionPress={() => router.push('/points-history')}
        />
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
            <RewardCard reward={item} onPress={() => router.push({ pathname: '/reward/[id]', params: { id: item.id } })} />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
  },
  divider: {
    marginBottom: spacing.xl,
  },
  qrCard: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  qrPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: radius.button,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrLabel: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
    textAlign: 'center',
  },
  qrCaption: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
    textAlign: 'center',
  },
  rewardsRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
});
