/**
 * ClothingCard — Clothing item display card
 *
 * Used in the Closet grid and can be reused in other lists.
 * Props:
 *   item: { id, name, category, image }
 *   onPress?: () => void
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../constants/theme';

export default function ClothingCard({ item, onPress }) {
  const Card = onPress ? TouchableOpacity : View;
  const cardProps = onPress ? { onPress, activeOpacity: 0.8 } : {};

  return (
    <Card style={styles.card} {...cardProps}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  image: {
    width: '100%',
    height: 192,
    backgroundColor: colors.surfaceLight,
  },
  info: {
    padding: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: typography.base,
  },
  category: {
    color: colors.textSecondary,
    fontSize: typography.xs,
    marginTop: spacing.xs,
  },
});
