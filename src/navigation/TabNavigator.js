/**
 * TabNavigator — Bottom Tab Navigation
 *
 * Three tabs: My Closet, Scanner, Outfit Matcher.
 * Wrapped in NavigationContainer by App.js.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../constants/theme';

import ClosetScreen from '../screens/ClosetScreen';
import ScannerScreen from '../screens/ScannerScreen';
import OutfitMatcherScreen from '../screens/OutfitMatcherScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Closet: { focused: 'shirt', unfocused: 'shirt-outline' },
  Scanner: { focused: 'scan-circle', unfocused: 'scan-circle-outline' },
  Matcher: { focused: 'color-wand', unfocused: 'color-wand-outline' },
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: '700',
          fontSize: typography.xxl,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surfaceLight,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{ title: 'My Closet' }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Matcher"
        component={OutfitMatcherScreen}
        options={{ title: 'Outfit Matcher' }}
      />
    </Tab.Navigator>
  );
}
