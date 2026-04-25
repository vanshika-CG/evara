import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 160,
  strokeWidth = 12,
  color = Colors.primary,
  backgroundColor = Colors.primarySubtle,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const segments = 36;
  const gapAngle = 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.trackOuter, { width: size, height: size, borderRadius: size / 2 }]}>
        <View
          style={[
            styles.trackInner,
            {
              width: size - strokeWidth * 2,
              height: size - strokeWidth * 2,
              borderRadius: (size - strokeWidth * 2) / 2,
              backgroundColor: Colors.white,
            },
          ]}
        />
        <View style={[StyleSheet.absoluteFill, { borderRadius: size / 2, overflow: 'hidden' }]}>
          {Array.from({ length: segments }).map((_, i) => {
            const angle = (i / segments) * 360;
            const isFilled = (i / segments) * 100 <= clampedProgress;
            const segmentColor = isFilled ? color : backgroundColor;
            return (
              <View
                key={i}
                style={[
                  styles.segment,
                  {
                    width: strokeWidth,
                    height: strokeWidth,
                    borderRadius: strokeWidth / 2,
                    backgroundColor: segmentColor,
                    position: 'absolute',
                    left: center + radius * Math.cos(((angle - 90) * Math.PI) / 180) - strokeWidth / 2,
                    top: center + radius * Math.sin(((angle - 90) * Math.PI) / 180) - strokeWidth / 2,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.content}>
        {children || (
          <View style={styles.defaultContent}>
            <Text style={styles.progressText}>{clampedProgress}%</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySubtle,
  },
  trackInner: {
    position: 'absolute',
    zIndex: 1,
  },
  segment: {},
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  defaultContent: {
    alignItems: 'center',
  },
  progressText: {
    ...Typography.stat,
    color: Colors.primary,
  },
});

export default CircularProgress;
