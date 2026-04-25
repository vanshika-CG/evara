import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Spacing } from '../constants/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  borderLeftColor?: string;
  padding?: number;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  borderLeftColor,
  padding,
  noPadding = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        borderLeftColor && { borderLeftWidth: 3, borderLeftColor },
        padding !== undefined && { padding },
        noPadding && { padding: 0 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Card;
