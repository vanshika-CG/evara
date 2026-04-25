import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing } from '../constants/spacing';

interface IconBadgeProps {
  icon: string;
  color?: string;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
}

const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  color,
  backgroundColor = Colors.primarySubtle,
  size = 40,
  style,
}) => {
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2.5,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text style={[styles.icon, { fontSize: size * 0.45 }]}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});

export default IconBadge;
