import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { BorderRadius, Spacing } from '../constants/spacing';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  variant?: 'default' | 'filled' | 'tag';
  color?: string;
  style?: ViewStyle;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  variant = 'default',
  color,
  style,
}) => {
  const getChipStyle = (): ViewStyle => {
    if (variant === 'tag') {
      return {
        backgroundColor: color || Colors.primarySubtle,
        borderWidth: 0,
      };
    }
    if (variant === 'filled' || selected) {
      return {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
      };
    }
    return {
      backgroundColor: Colors.white,
      borderColor: Colors.border,
    };
  };

  const getTextColor = () => {
    if (variant === 'tag') return color ? Colors.text : Colors.primary;
    if (variant === 'filled' || selected) return Colors.white;
    return Colors.textSecondary;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[styles.chip, getChipStyle(), style]}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  label: {
    ...Typography.smallMedium,
  },
});

export default Chip;
