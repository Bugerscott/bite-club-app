import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, shadows, typography } from '../../theme';
import type { Address } from '../../types';

export interface AddressCardProps {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

/** Card de dirección — usada en /addresses y /delivery. */
export function AddressCard({ address, selected = false, onSelect, onEdit, onDelete }: AddressCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      disabled={!onSelect}
      accessibilityRole={onSelect ? 'radio' : undefined}
      accessibilityState={onSelect ? { selected } : undefined}
      accessibilityLabel={`${address.label}: ${address.line1}`}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.iconWrap}>
        <Feather name="map-pin" size={18} color={selected ? colors.primary : colors.secondary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>{address.label}</Text>
        <Text style={styles.line} numberOfLines={2}>
          {address.line1}
          {address.line2 ? `, ${address.line2}` : ''}, {address.city}
        </Text>
      </View>
      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit ? (
            <Pressable onPress={onEdit} accessibilityRole="button" accessibilityLabel="Editar dirección" hitSlop={8}>
              <Feather name="edit-2" size={16} color={colors.secondary} />
            </Pressable>
          ) : null}
          {onDelete ? (
            <Pressable onPress={onDelete} accessibilityRole="button" accessibilityLabel="Eliminar dirección" hitSlop={8}>
              <Feather name="trash-2" size={16} color={colors.secondary} />
            </Pressable>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.card,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  cardSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  line: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
