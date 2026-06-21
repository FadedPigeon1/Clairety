/**
 * OutfitMatcherScreen — Outfit Suggestions
 *
 * Shows the current "base item" from the user's closet and suggests
 * matching items from online stores with prices and shop links.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../constants/theme';
import { fetchSuggestions } from '../services/api';

const PRICE_TIERS = [50, 100, 200];

export default function OutfitMatcherScreen() {
  const [suggestions, setSuggestions] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSuggestions();
        setSuggestions(data);
      } catch (e) {
        console.warn('Failed to fetch suggestions:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredSuggestions = suggestions.filter(
    (item) => item.price <= maxPrice
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Current Base Item */}
      <View style={styles.baseCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
          }}
          style={styles.baseImage}
        />
        <View style={styles.baseInfo}>
          <Text style={styles.baseLabel}>CURRENT BASE ITEM</Text>
          <Text style={styles.baseName}>White Canvas Sneakers</Text>
        </View>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Complete the Look</Text>

      {/* Price Filter */}
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Max Price:</Text>
        {PRICE_TIERS.map((price) => {
          const isActive = maxPrice === price;
          return (
            <TouchableOpacity
              key={price}
              onPress={() => setMaxPrice(price)}
              style={[
                styles.pricePill,
                isActive ? styles.pricePillActive : styles.pricePillInactive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.pricePillText,
                  isActive
                    ? styles.pricePillTextActive
                    : styles.pricePillTextInactive,
                ]}
              >
                ${price}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Suggestions List */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.suggestionCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.suggestionImage}
              />
              <View style={styles.suggestionInfo}>
                <View>
                  <Text style={styles.storeName}>{item.store}</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.cartButton}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.url) {
                    Linking.openURL(item.url);
                  }
                }}
              >
                <Ionicons name="cart-outline" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No suggestions at this price point.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Base item card
  baseCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  baseImage: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
  },
  baseInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  baseLabel: {
    color: colors.textSecondary,
    fontSize: typography.xs,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  baseName: {
    color: colors.textPrimary,
    fontSize: typography.lg,
    fontWeight: '700',
    marginTop: 2,
  },

  // Section title
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.xl,
    fontWeight: '700',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },

  // Price filter
  priceRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    color: colors.textSecondary,
    marginRight: spacing.sm,
    fontSize: typography.sm,
  },
  pricePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.full,
    borderWidth: 1,
    marginLeft: spacing.sm,
  },
  pricePillActive: {
    backgroundColor: colors.activePill,
    borderColor: colors.activePill,
  },
  pricePillInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.inactivePillBorder,
  },
  pricePillText: {
    fontWeight: '600',
    fontSize: typography.sm,
  },
  pricePillTextActive: {
    color: colors.activePillText,
  },
  pricePillTextInactive: {
    color: colors.inactivePillText,
  },

  // Suggestions
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  suggestionImage: {
    width: 96,
    height: 96,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLight,
  },
  suggestionInfo: {
    marginLeft: spacing.lg,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  storeName: {
    color: colors.textSecondary,
    fontSize: typography.xs,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },
  itemName: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: typography.md,
  },
  itemPrice: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: typography.lg,
    marginTop: spacing.sm,
  },
  cartButton: {
    backgroundColor: colors.whiteOverlay10,
    padding: spacing.md,
    borderRadius: radii.full,
  },

  // Loading & empty
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.base,
  },
});
