import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows, typography } from '../theme';
import type { MockMember } from '../types';

export interface MemberCardProps {
  member: MockMember;
}

function formatMemberSince(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('es-NI', { year: 'numeric', month: 'long' });
}

/** Card de identidad de miembro — pantalla Club. */
export function MemberCard({ member }: MemberCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Feather name="user" size={24} color={colors.secondary} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.name} numberOfLines={1}>
          {member.displayName}
        </Text>
        <Text style={styles.since}>Miembro desde {formatMemberSince(member.memberSince)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.base,
    ...shadows.soft,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.iconButton,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  since: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
});
