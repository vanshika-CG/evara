import React, { useState } from 'react';
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
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { Card, IconBadge } from '../../src/components';
import { CYCLE_DATA } from '../../src/constants/data';

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) days.push(i);
  }

  return { days, daysInMonth };
}

export default function CycleTrackerScreen() {
  const data = CYCLE_DATA;
  const { days } = generateCalendarDays(2023, 9);

  const getDayStyle = (day: number | null) => {
    if (!day) return {};
    if (data.periodDays.includes(day))
      return { backgroundColor: Colors.primaryLighter, borderRadius: 20 };
    if (day === data.todayDate)
      return { backgroundColor: Colors.primary, borderRadius: 20 };
    if (data.predictedDays.includes(day))
      return {
        borderWidth: 1.5,
        borderColor: Colors.primaryLighter,
        borderRadius: 20,
        borderStyle: 'dashed' as const,
      };
    return {};
  };

  const getDayTextColor = (day: number | null) => {
    if (!day) return 'transparent';
    if (day === data.todayDate) return Colors.white;
    if (data.periodDays.includes(day)) return Colors.primary;
    return Colors.text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cycle Tracker</Text>
            <Text style={styles.subtitle}>Log your daily symptoms</Text>
          </View>
        </View>

        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.periodCard}
        >
          <View style={styles.periodCardContent}>
            <View>
              <Text style={styles.periodLabel}>Next Period In</Text>
              <Text style={styles.periodDays}>{data.nextPeriodDays} Days</Text>
            </View>
            <View style={styles.phaseInfo}>
              <View style={styles.phaseBadge}>
                <Text style={styles.phaseText}>{data.currentPhase}</Text>
              </View>
              <Text style={styles.phaseDesc}>{data.phaseDescription}</Text>
            </View>
          </View>
        </LinearGradient>

        <Card style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>{data.currentMonth}</Text>
            <View style={styles.navButtons}>
              <TouchableOpacity style={styles.navBtn}>
                <Ionicons name="chevron-back" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekRow}>
            {DAYS_OF_WEEK.map((d, i) => (
              <Text key={i} style={styles.weekDay}>{d}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.dayCell, day ? getDayStyle(day) : undefined]}
                disabled={!day}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: getDayTextColor(day) },
                    day && data.predictedDays.includes(day) && !data.periodDays.includes(day)
                      ? styles.predictedText
                      : undefined,
                  ]}
                >
                  {day || ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Today</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primaryLighter }]} />
              <Text style={styles.legendText}>Period</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDotDashed]} />
              <Text style={styles.legendText}>Predicted</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.symptomsCard}>
          <View style={styles.symptomsHeader}>
            <Text style={styles.symptomsTitle}>Today's Symptoms</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.symptomsRow}>
            {data.symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomItem,
                  symptom.active && styles.symptomActive,
                ]}
              >
                <View style={[
                  styles.symptomIcon,
                  symptom.active
                    ? { backgroundColor: Colors.primary }
                    : { backgroundColor: Colors.surfaceElevated },
                ]}>
                  <Text style={styles.symptomEmoji}>
                    {symptom.id === 'pain' ? '📊' :
                     symptom.id === 'mood' ? '😊' :
                     symptom.id === 'fatigue' ? '😴' : '💧'}
                  </Text>
                </View>
                <Text style={[
                  styles.symptomLabel,
                  symptom.active && styles.symptomLabelActive,
                ]}>
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.suggestionsCard}>
          <View style={styles.suggestionsHeader}>
            <Text style={styles.sparkle}>✨</Text>
            <Text style={styles.suggestionsTitle}>Suggestions for You</Text>
          </View>
          {data.suggestions.map((suggestion, index) => (
            <View
              key={index}
              style={[
                styles.suggestionItem,
                index < data.suggestions.length - 1 && styles.suggestionBorder,
              ]}
            >
              <IconBadge
                icon={suggestion.icon}
                backgroundColor={Colors.surfaceElevated}
                size={44}
              />
              <View style={styles.suggestionText}>
                <Text style={styles.suggestionName}>{suggestion.title}</Text>
                <Text style={styles.suggestionDesc}>{suggestion.description}</Text>
              </View>
            </View>
          ))}
        </Card>
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
  periodCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  periodCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodLabel: {
    ...Typography.small,
    color: 'rgba(255,255,255,0.8)',
  },
  periodDays: {
    ...Typography.stat,
    color: Colors.white,
  },
  phaseInfo: {
    alignItems: 'flex-end',
  },
  phaseBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
    marginBottom: Spacing.xs,
  },
  phaseText: {
    ...Typography.captionMedium,
    color: Colors.white,
  },
  phaseDesc: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  calendarCard: {
    marginBottom: Spacing.xl,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  monthTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  navButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  navBtn: {
    padding: Spacing.xs,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    ...Typography.captionMedium,
    color: Colors.textTertiary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    ...Typography.bodyMedium,
    textAlign: 'center',
  },
  predictedText: {
    color: Colors.textTertiary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendDotDashed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.primaryLighter,
    borderStyle: 'dashed',
  },
  legendText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  symptomsCard: {
    marginBottom: Spacing.xl,
  },
  symptomsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  symptomsTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  symptomsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symptomItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  symptomActive: {},
  symptomIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomEmoji: {
    fontSize: 22,
  },
  symptomLabel: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
  },
  symptomLabelActive: {
    color: Colors.text,
  },
  suggestionsCard: {
    marginBottom: Spacing.xl,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  sparkle: {
    fontSize: 18,
  },
  suggestionsTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  suggestionText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  suggestionName: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  suggestionDesc: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
