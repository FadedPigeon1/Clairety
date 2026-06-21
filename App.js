/**
 * Clairety — Fashion Wardrobe App
 *
 * Entry point. Wraps the tab navigator in NavigationContainer.
 */

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#ffffff',
    background: '#020617',
    card: '#020617',
    text: '#ffffff',
    border: '#1e293b',
    notification: '#ffffff',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle="light-content" />
      <TabNavigator />
    </NavigationContainer>
  );
}
