import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { Card, IconBadge } from '../../src/components';
import { DIET_DATA } from '../../src/constants/data';

export default function DietPlannerScreen() {
  const data = DIET_DATA;
  const [dateOffset, setDateOffset] = useState(0);

  const macroItems = [
    { icon: '🔥', value: data.totalCalories.toString(), unit: 'Kcal', color: Colors.primary },
    { icon: '🥩', value: data.macros.protein.value + 'g', unit: 'Protein', color: Colors.secondary },
    { icon: '🍚', value: data.macros.carbs.value + 'g', unit: 'Carbs', color: Colors.warning },
    { icon: '🫒', value: data.macros.fats.value + 'g', unit: 'Fats', color: Colors.accent },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Diet Planner</Text>
            <Text style={styles.subtitle}>Nourish your body today</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.dateCard}>
          <View style={styles.dateRow}>
            <TouchableOpacity
              onPress={() => setDateOffset(dateOffset - 1)}
              style={styles.dateArrow}
            >
              <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.dateCenter}>
              <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
              <Text style={styles.dateText}>{data.date}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setDateOffset(dateOffset + 1)}
              style={styles.dateArrow}
            >
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.macroCard}>
          <View style={styles.macroTimeline}>
            {macroItems.map((item, index) => (
              <View key={index} style={styles.macroItem}>
                <View style={styles.macroIconWrapper}>
                  <View
                    style={[styles.macroIconBg, { backgroundColor: item.color + '15' }]}
                  >
                    <Text style={styles.macroEmoji}>{item.icon}</Text>
                  </View>
                </View>
                <Text style={[styles.macroValue, { color: item.color }]}>
                  {item.value}
                </Text>
                <Text style={styles.macroUnit}>{item.unit}</Text>
                {index < macroItems.length - 1 && (
                  <View style={styles.macroLine} />
                )}
              </View>
            ))}
          </View>
        </Card>

        {data.meals.map((meal, index) => (
          <View key={index} style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTitleRow}>
                <Text style={styles.mealIcon}>{meal.type === 'Breakfast' ? '🌅' : meal.type === 'Lunch' ? '☀️' : '🌙'}</Text>
                <Text style={styles.mealType}>{meal.type}</Text>
              </View>
              <TouchableOpacity style={styles.swapButton}>
                <Ionicons name="swap-horizontal" size={14} color={Colors.primary} />
                <Text style={styles.swapText}>Swap Meal</Text>
              </TouchableOpacity>
            </View>

            <Card style={styles.foodCard}>
              <View style={styles.foodRow}>
                <View style={styles.foodImagePlaceholder}>
                  <Text style={styles.foodEmoji}>
                    {meal.type === 'Breakfast' ? '🥣' : meal.type === 'Lunch' ? '🍛' : '🥘'}
                  </Text>
                </View>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{meal.name}</Text>
                  <Text style={styles.foodCalories}>🔥 {meal.calories} kcal</Text>
                  <View style={styles.macroTags}>
                    <View style={[styles.macroTag, { backgroundColor: Colors.secondarySubtle }]}>
                      <Text style={[styles.macroTagText, { color: Colors.secondary }]}>
                        P: {meal.protein}g
                      </Text>
                    </View>
                    <View style={[styles.macroTag, { backgroundColor: Colors.warningBg }]}>
                      <Text style={[styles.macroTagText, { color: Colors.warning }]}>
                        C: {meal.carbs}g
                      </Text>
                    </View>
                    <View style={[styles.macroTag, { backgroundColor: '#E0F2FE' }]}>
                      <Text style={[styles.macroTagText, { color: Colors.accent }]}>
                        F: {meal.fat}g
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </View>
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
  dateCard: {
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateArrow: {
    padding: Spacing.sm,
  },
  dateCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dateText: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
  macroCard: {
    marginBottom: Spacing.xxl,
    alignItems: 'center',
  },
  macroTimeline: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  macroItem: {
    alignItems: 'center',
    position: 'relative',
  },
  macroIconWrapper: {
    marginBottom: Spacing.xs,
  },
  macroIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroEmoji: {
    fontSize: 18,
  },
  macroValue: {
    ...Typography.statMedium,
  },
  macroUnit: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  macroLine: {
    width: 1,
    height: 16,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.xs,
  },
  mealSection: {
    marginBottom: Spacing.xl,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  mealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  mealIcon: {
    fontSize: 16,
  },
  mealType: {
    ...Typography.h4,
    color: Colors.text,
  },
  swapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primarySubtle,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  swapText: {
    ...Typography.captionMedium,
    color: Colors.primary,
  },
  foodCard: {
    padding: Spacing.lg,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 32,
  },
  foodInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  foodName: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  foodCalories: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  macroTags: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  macroTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  macroTagText: {
    ...Typography.captionMedium,
  },
});
