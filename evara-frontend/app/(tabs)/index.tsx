import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { Card, IconBadge, ProgressBar } from '../../src/components';
import { DASHBOARD_DATA, USER_PROFILE } from '../../src/constants/data';

export default function DashboardScreen() {
  const router = useRouter();
  const data = DASHBOARD_DATA;
  const user = USER_PROFILE;
  const waterPercent = (data.water.current / data.water.goal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{data.greeting},</Text>
            <Text style={styles.name}>{user.name} 👋</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.bmiCard}>
          <LinearGradient
            colors={['#F3E8FF', '#FAFAFE']}
            style={styles.bmiGradient}
          >
            <View style={styles.bmiContent}>
              <View style={styles.bmiLeft}>
                <IconBadge icon="📊" backgroundColor={Colors.primaryLightest} />
                <View style={styles.bmiTextSection}>
                  <Text style={styles.bmiLabel}>BMI Status</Text>
                  <Text style={styles.bmiValue}>{data.bmi.value}</Text>
                </View>
              </View>
              <View style={styles.bmiRight}>
                <View style={styles.bmiStatusBadge}>
                  <Text style={styles.bmiStatusText}>{data.bmi.status}</Text>
                </View>
                <Text style={styles.bmiChange}>
                  {data.bmi.change > 0 ? '+' : ''}{data.bmi.change} this week
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Card>

        <Card style={styles.cycleCard}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cycleGradient}
          >
            <View style={styles.cycleTopRow}>
              <Text style={styles.cycleLabel}>Next Period In</Text>
              <View style={styles.phaseBadge}>
                <Text style={styles.phaseText}>{data.cycle.phase}</Text>
              </View>
            </View>
            <Text style={styles.cycleDays}>{data.cycle.nextPeriod}</Text>
            <Text style={styles.cycleFertility}>{data.cycle.fertility}</Text>
          </LinearGradient>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/diet')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {Object.entries(data.meals).map(([key, meal]) => (
          <Card key={key} style={styles.mealCard}>
            <View style={styles.mealRow}>
              <IconBadge
                icon={key === 'breakfast' ? '🌅' : key === 'lunch' ? '☀️' : '🌙'}
                backgroundColor={Colors.primarySubtle}
                size={44}
              />
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealMeta}>
                  🔥 {meal.calories} kcal · {meal.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </View>
          </Card>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Water Intake</Text>
        </View>

        <Card style={styles.waterCard}>
          <View style={styles.waterRow}>
            <IconBadge icon="💧" backgroundColor="#E0F2FE" size={44} />
            <View style={styles.waterInfo}>
              <Text style={styles.waterCount}>
                {data.water.current} / {data.water.goal} glasses
              </Text>
              <ProgressBar
                progress={waterPercent}
                color={Colors.accent}
                backgroundColor="#E0F2FE"
                height={6}
                style={styles.waterProgress}
              />
            </View>
          </View>
          <View style={styles.waterButtons}>
            {Array.from({ length: data.water.goal }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.waterDot,
                  i < data.water.current && styles.waterDotFilled,
                ]}
              />
            ))}
          </View>
        </Card>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {[
              { label: 'Check-in', icon: '📝', route: '/daily-checkin' as const },
              { label: 'Deficiency', icon: '🔬', route: '/deficiency' as const },
              { label: 'Scanner', icon: '📷', route: '/ingredient-scanner' as const },
              { label: 'Timeline', icon: '📈', route: '/health-timeline' as const },
            ].map((action) => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionItem}
                onPress={() => router.push(action.route)}
              >
                <View style={styles.actionIcon}>
                  <Text style={styles.actionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    marginBottom: Spacing.xxl,
  },
  greeting: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
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
  bmiCard: {
    marginBottom: Spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  bmiGradient: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  bmiContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bmiTextSection: {
    marginLeft: Spacing.md,
  },
  bmiLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  bmiValue: {
    ...Typography.statMedium,
    color: Colors.text,
  },
  bmiRight: {
    alignItems: 'flex-end',
  },
  bmiStatusBadge: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
    marginBottom: Spacing.xs,
  },
  bmiStatusText: {
    ...Typography.captionMedium,
    color: Colors.success,
  },
  bmiChange: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  cycleCard: {
    marginBottom: Spacing.xxl,
    padding: 0,
    overflow: 'hidden',
  },
  cycleGradient: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  cycleTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cycleLabel: {
    ...Typography.small,
    color: 'rgba(255,255,255,0.8)',
  },
  phaseBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  phaseText: {
    ...Typography.captionMedium,
    color: Colors.white,
  },
  cycleDays: {
    ...Typography.stat,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  cycleFertility: {
    ...Typography.small,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  seeAll: {
    ...Typography.smallMedium,
    color: Colors.primary,
  },
  mealCard: {
    marginBottom: Spacing.md,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  mealName: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  mealMeta: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  waterCard: {
    marginBottom: Spacing.xxl,
  },
  waterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  waterCount: {
    ...Typography.bodySemiBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  waterProgress: {
    marginTop: 0,
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  waterDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E0F2FE',
    backgroundColor: Colors.white,
  },
  waterDotFilled: {
    backgroundColor: '#67E8F9',
    borderColor: '#06B6D4',
  },
  quickActions: {
    marginBottom: Spacing.xl,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  actionItem: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionLabel: {
    ...Typography.smallMedium,
    color: Colors.text,
  },
});
