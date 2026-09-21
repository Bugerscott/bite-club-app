import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../theme';
import type { Extra, SauceOption } from '../../types';
import { formatCurrency } from '../../utils';

const SAUCE_LABEL: Record<SauceOption, string> = {
  'salsa-bite': 'Salsa Bite',
  alioli: 'Alioli',
  bbq: 'BBQ',
  'salsa-brava': 'Salsa Brava',
};

export interface ProductOptionsPickerProps {
  sauces?: SauceOption[];
  selectedSauce?: SauceOption;
  onSelectSauce: (sauce: SauceOption) => void;
  extras: Extra[];
  selectedExtraIds: string[];
  onToggleExtra: (extraId: string) => void;
}

/** Selector de salsa + extras para la pantalla de detalle de producto. */
export function ProductOptionsPicker({
  sauces,
  selectedSauce,
  onSelectSauce,
  extras,
  selectedExtraIds,
  onToggleExtra,
}: ProductOptionsPickerProps) {
  return (
    <View style={styles.container}>
      {sauces && sauces.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elige tu salsa</Text>
          <View style={styles.sauceRow}>
            {sauces.map((sauce) => {
              const selected = selectedSauce === sauce;
              return (
                <Pressable
                  key={sauce}
                  onPress={() => onSelectSauce(sauce)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  accessibilityLabel={SAUCE_LABEL[sauce]}
                  style={[styles.sauceChip, selected && styles.sauceChipSelected]}
                >
                  <Text style={[styles.sauceLabel, selected && styles.sauceLabelSelected]}>
                    {SAUCE_LABEL[sauce]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      {extras.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agrega extras</Text>
          {extras.map((extra) => {
            const checked = selectedExtraIds.includes(extra.id);
            return (
              <Pressable
                key={extra.id}
                onPress={() => onToggleExtra(extra.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}
                accessibilityLabel={`${extra.name}, ${formatCurrency(extra.price)}`}
                style={styles.extraRow}
              >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                  {checked ? <Feather name="check" size={14} color={colors.background} /> : null}
                </View>
                <Text style={styles.extraName}>{extra.name}</Text>
                <Text style={styles.extraPrice}>+{formatCurrency(extra.price)}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.text,
  },
  sauceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sauceChip: {
    paddingHorizontal: spacing.base,
    height: 36,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sauceChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sauceLabel: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.text,
  },
  sauceLabelSelected: {
    color: colors.background,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  extraName: {
    flex: 1,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  extraPrice: {
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    color: colors.muted,
  },
});
