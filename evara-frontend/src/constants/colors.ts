export const Colors = {
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryLighter: '#C4B5FD',
  primaryLightest: '#E9D5FF',
  primarySubtle: '#F3E8FF',
  primaryBg: '#FAF5FF',

  secondary: '#EC4899',
  secondaryLight: '#F472B6',
  secondaryLighter: '#FBCFE8',
  secondarySubtle: '#FDF2F8',

  accent: '#06B6D4',
  accentLight: '#67E8F9',

  success: '#10B981',
  successLight: '#6EE7B7',
  successBg: '#ECFDF5',

  warning: '#F59E0B',
  warningLight: '#FCD34D',
  warningBg: '#FFFBEB',

  danger: '#EF4444',
  dangerLight: '#FCA5A5',
  dangerBg: '#FEF2F2',

  white: '#FFFFFF',
  background: '#FAFAFE',
  surface: '#FFFFFF',
  surfaceElevated: '#F8F7FC',

  text: '#1E1B4B',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  divider: '#F0EEFB',

  shadow: 'rgba(139, 92, 246, 0.08)',
  overlay: 'rgba(30, 27, 75, 0.5)',

  gradient: {
    primary: ['#8B5CF6', '#A78BFA'] as const,
    primarySoft: ['#E9D5FF', '#F3E8FF'] as const,
    header: ['#8B5CF6', '#7C3AED'] as const,
    card: ['#F3E8FF', '#FAFAFE'] as const,
    pink: ['#EC4899', '#F472B6'] as const,
    cycleHeader: ['#8B5CF6', '#A78BFA'] as const,
  },

  mood: {
    happy: '#10B981',
    good: '#34D399',
    neutral: '#F59E0B',
    sad: '#F472B6',
    stressed: '#EF4444',
  },

  chart: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    blue: '#3B82F6',
    green: '#10B981',
    orange: '#F59E0B',
  },
} as const;
