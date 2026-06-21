/**
 * ClosetScreen — My Closet
 *
 * Displays a grid of clothing items from the user's closet.
 * Supports filtering by category (All, Tops, Bottoms, Outerwear, Shoes).
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing, typography } from '../constants/theme';
import { fetchCloset } from '../services/api';
import FilterBar from '../components/FilterBar';
import ClothingCard from '../components/ClothingCard';

const FILTERS = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes'];

export default function ClosetScreen() {
  const [filter, setFilter] = useState('All');
  const [closetItems, setClosetItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        try {
          setLoading(true);
          const items = await fetchCloset();
          if (!cancelled) setClosetItems(items);
        } catch (e) {
          console.warn('Failed to fetch closet items:', e);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const filteredItems =
    filter === 'All'
      ? closetItems
      : closetItems.filter((item) => item.category === filter);

  return (
    <SafeAreaView style={styles.container}>
      <FilterBar
        filters={FILTERS}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {filter === 'All'
              ? 'Your closet is empty. Scan some clothes!'
              : `No ${filter.toLowerCase()} in your closet yet.`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ClothingCard item={item} />}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.md,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.sm,
  },
});
