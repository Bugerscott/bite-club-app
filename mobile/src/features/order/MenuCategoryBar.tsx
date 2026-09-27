import React, { useCallback, useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { CategoryChip } from '../../components';
import { GlassSurface } from '../../components/glass/GlassSurface';
import { hexToRgba, colors, radius, spacing } from '../../theme';
import type { MenuCategory, MenuCategoryId } from '../../types';

export interface MenuCategoryBarProps {
  categories: MenuCategory[];
  activeId: MenuCategoryId;
  onSelect: (id: MenuCategoryId) => void;
  onHeightChange?: (height: number) => void;
}

interface ChipLayout {
  x: number;
  width: number;
}

/** Barra horizontal sticky con material glass y auto-scroll del chip activo. */
export function MenuCategoryBar({ categories, activeId, onSelect, onHeightChange }: MenuCategoryBarProps) {
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Partial<Record<MenuCategoryId, ChipLayout>>>({});
  const containerWidthRef = useRef(0);
  const scrollXRef = useRef(0);

  const handleChipLayout = useCallback(
    (id: MenuCategoryId) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      layouts.current[id] = { x, width };
    },
    [],
  );

  const handleContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      containerWidthRef.current = width;
      onHeightChange?.(height);
    },
    [onHeightChange],
  );

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollXRef.current = event.nativeEvent.contentOffset.x;
  }, []);

  useEffect(() => {
    const layout = layouts.current[activeId];
    const containerWidth = containerWidthRef.current;
    if (!layout || !containerWidth) return;

    const visibleStart = scrollXRef.current;
    const visibleEnd = scrollXRef.current + containerWidth;
    const margin = spacing.base;
    const alreadyVisible = layout.x >= visibleStart + margin && layout.x + layout.width <= visibleEnd - margin;
    if (alreadyVisible) return;

    const chipCenter = layout.x + layout.width / 2;
    const targetX = Math.max(0, chipCenter - containerWidth / 2);
    scrollRef.current?.scrollTo({ x: targetX, animated: true });
  }, [activeId]);

  return (
    <View onLayout={handleContainerLayout} style={styles.wrapper}>
      <GlassSurface
        borderRadius={radius.pill}
        tintColor={hexToRgba(colors.secondary, 0.07)}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          contentContainerStyle={styles.row}
        >
          {categories.map((category) => (
            <View key={category.id} onLayout={handleChipLayout(category.id)}>
              <CategoryChip
                label={category.label}
                selected={activeId === category.id}
                onPress={() => onSelect(category.id)}
              />
            </View>
          ))}
        </ScrollView>
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
});
