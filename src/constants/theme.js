/**
 * Clairety Design System — Theme Tokens
 *
 * Single source of truth for the app's visual design.
 * All screens and components import from here.
 */

export const colors = {
  // Core palette (slate dark mode)
  background: '#020617',   // slate-950
  surface: '#0f172a',      // slate-900
  surfaceLight: '#1e293b',  // slate-800
  surfaceLighter: '#334155', // slate-700

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',  // slate-400
  textMuted: '#64748b',      // slate-500
  textDim: '#475569',        // slate-600

  // Accent
  white: '#ffffff',
  black: '#000000',

  // Interactive
  activePill: '#ffffff',
  activePillText: '#000000',
  inactivePill: '#0f172a',
  inactivePillText: '#cbd5e1', // slate-300
  inactivePillBorder: '#334155',

  // Overlays
  whiteOverlay10: 'rgba(255, 255, 255, 0.10)',
  whiteOverlay5: 'rgba(255, 255, 255, 0.05)',
  whiteOverlay50: 'rgba(255, 255, 255, 0.50)',
  whiteOverlay70: 'rgba(255, 255, 255, 0.70)',

  // Tab bar
  tabActive: '#ffffff',
  tabInactive: '#64748b',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const typography = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
