import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { Card, IconBadge, Chip } from '../../src/components';
import { FITNESS_DATA } from '../../src/constants/data';

export default function FitnessScreen() {
  const router = useRouter();
  const data = FITNESS_DATA;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Daily Fitness</Text>
            <Text style={styles.subtitle}>Tailored for your body today</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.heroCard} noPadding>
          <View style={styles.heroImage}>
            <Text style={styles.heroEmoji}>🧘‍♀️</Text>
            <View style={styles.heroGlow} />
          </View>
        </Card>

        <Card style={styles.whyCard} borderLeftColor={Colors.primaryLight}>
          <View style={styles.whyHeader}>
            <Text style={styles.sparkleIcon}>✨</Text>
            <Text style={styles.whyTitle}>Why this routine?</Text>
          </View>
          <Text style={styles.whyDescription}>{data.whyRoutine}</Text>
          <View style={styles.tagRow}>
            {data.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="tag" />
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Today's Plan</Text>

        {data.workouts.map((workout) => (
          <Card key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutRow}>
              <View
                style={[styles.workoutIcon, { backgroundColor: workout.color }]}
              >
                <Text style={styles.workoutEmoji}>{workout.icon}</Text>
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDesc}>{workout.description}</Text>
                <View style={styles.workoutMeta}>
                  <Ionicons name="time-outline" size={14} color={Colors.textTertiary} />
                  <Text style={styles.workoutMetaText}>{workout.duration}</Text>
                  <Ionicons name="flame-outline" size={14} color={Colors.textTertiary} />
                  <Text style={styles.workoutMetaText}>{workout.calories}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryLight]}
                  style={styles.playGradient}
                >
                  <Ionicons name="play" size={18} color={Colors.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryLighter,
  },
  heroCard: {
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  heroImage: {
    height: 200,
    backgroundColor: Colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
  },
  heroEmoji: {
    fontSize: 80,
  },
  heroGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primaryLightest,
    opacity: 0.5,
    zIndex: -1,
  },
  whyCard: {
    marginBottom: Spacing.xxl,
  },
  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sparkleIcon: {
    fontSize: 18,
  },
  whyTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  whyDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  workoutCard: {
    marginBottom: Spacing.md,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutEmoji: {
    fontSize: 26,
  },
  workoutInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  workoutName: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  workoutDesc: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  workoutMetaText: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginRight: Spacing.sm,
  },
  playButton: {
    marginLeft: Spacing.sm,
  },
  playGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
