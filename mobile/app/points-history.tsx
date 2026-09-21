import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen, EmptyState } from '../src/components';
import { colors, spacing, typography } from '../src/theme';
import { mockPointsHistory } from '../src/mocks';

// Ruta /points-history — instrucciones, sección 32.
export default function PointsHistoryScreen() {
  if (mockPointsHistory.length === 0) {
    return (
      <Screen>
        <EmptyState icon="star" title="Sin movimientos todavía" />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={mockPointsHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Feather
                name={item.type === 'earned' ? 'plus-circle' : 'minus-circle'}
                size={18}
                color={item.type === 'earned' ? colors.reward : colors.secondary}
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString('es-NI', { day: 'numeric', month: 'long' })}
              </Text>
            </View>
            <Text style={[styles.points, item.type === 'redeemed' && styles.pointsNegative]}>
              {item.points > 0 ? '+' : ''}
              {item.points}
            </Text>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: spacing.base,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  date: {
    fontFamily: typography.micro.fontFamily,
    fontSize: typography.micro.fontSize,
    color: colors.muted,
  },
  points: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.reward,
  },
  pointsNegative: {
    color: colors.secondary,
  },
});
