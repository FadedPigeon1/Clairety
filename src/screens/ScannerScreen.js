/**
 * ScannerScreen — Camera Scanner
 *
 * Opens the phone camera, displays a framing guide,
 * and captures a photo to add to the user's closet.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StyleSheet,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, typography } from '../constants/theme';
import { addClosetItem } from '../services/api';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [capturing, setCapturing] = useState(false);

  // Still loading permission status
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Permission not granted — show request UI
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={64} color={colors.white} />
        <Text style={styles.permissionText}>
          Clairety needs camera access to scan your clothes.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const snapPhoto = async () => {
    if (!camera || capturing) return;
    try {
      setCapturing(true);
      const result = await camera.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      const response = await addClosetItem({
        name: 'New Scanned Item',
        category: 'Tops',
        image: `data:image/jpeg;base64,${result.base64}`,
      });

      if (response.success) {
        Alert.alert('Success', 'Item added to closet!');
        navigation.navigate('Closet');
      } else {
        Alert.alert('Error', 'Failed to save item. Please try again.');
      }
    } catch (err) {
      console.warn('Failed to save image', err);
      Alert.alert('Error', 'Something went wrong. Check your connection.');
    } finally {
      setCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={(r) => setCamera(r)}>
        <SafeAreaView style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Ionicons name="close" size={28} color={colors.white} />
            <Ionicons name="flash-off-outline" size={24} color={colors.white} />
          </View>

          {/* Framing Guide */}
          <View style={styles.frameContainer}>
            <View style={styles.frame} />
            <Text style={styles.frameHint}>ALIGN ITEM IN FRAME</Text>
          </View>

          {/* Shutter Button */}
          <View style={styles.shutterContainer}>
            <TouchableOpacity
              onPress={snapPhoto}
              style={styles.shutterOuter}
              activeOpacity={0.7}
              disabled={capturing}
            >
              <View
                style={[
                  styles.shutterInner,
                  capturing && styles.shutterCapturing,
                ]}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },

  // Permission screen
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  permissionText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    lineHeight: 26,
  },
  permissionButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
  },
  permissionButtonText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: typography.lg,
  },

  // Top bar
  topBar: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Frame
  frameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: 288,
    height: 288,
    borderWidth: 2,
    borderColor: colors.whiteOverlay50,
    borderRadius: radii.xl,
    backgroundColor: colors.whiteOverlay5,
  },
  frameHint: {
    color: colors.whiteOverlay70,
    marginTop: spacing.xxl,
    fontWeight: '500',
    letterSpacing: 3,
    fontSize: typography.xs,
  },

  // Shutter
  shutterContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 32,
  },
  shutterCapturing: {
    backgroundColor: colors.textSecondary,
  },
});
