/**
 * FilterBar — Horizontal scrollable filter chips
 *
 * Used on the Closet screen for category filtering.
 * Props:
 *   filters: string[]
 *   activeFilter: string
 *   onFilterChange: (filter: string) => void
 */

import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function FilterBar({ filters, activeFilter, onFilterChange }) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isActive = item === activeFilter;
          return (
            <TouchableOpacity
              onPress={() => onFilterChange(item)}
              style={[
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  pill: {
    marginRight: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: colors.activePill,
    borderColor: colors.activePill,
  },
  pillInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.inactivePillBorder,
  },
  pillText: {
    fontWeight: '600',
    fontSize: typography.base,
  },
  pillTextActive: {
    color: colors.activePillText,
  },
  pillTextInactive: {
    color: colors.inactivePillText,
  },
});
