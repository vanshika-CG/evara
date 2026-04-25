import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing, BorderRadius } from '../src/constants/spacing';
import { Card, Header, CircularProgress, IconBadge } from '../src/components';
import { HORMONE_RISK } from '../src/constants/data';

export default function HormoneRiskScreen() {
  const data = HORMONE_RISK;

  const getLevelColor = () => {
    switch (data.level) {
      case 'Low':
        return Colors.success;
      case 'Medium':
        return Colors.warning;
      case 'High':
        return Colors.danger;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Hormone Risk" subtitle="Your hormonal health assessment" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.riskCard}>
          <View style={styles.circularContainer}>
            <CircularProgress
              progress={data.riskPercent}
              size={180}
              color={getLevelColor()}
              strokeWidth={14}
            >
              <View style={styles.circleContent}>
                <Text style={styles.riskPercent}>{data.riskPercent}%</Text>
                <View
                  style={[styles.levelBadge, { backgroundColor: getLevelColor() + '20' }]}
                >
                  <Text style={[styles.levelText, { color: getLevelColor() }]}>
                    {data.level}
                  </Text>
                </View>
              </View>
            </CircularProgress>
          </View>

          <Text style={styles.riskLabel}>Risk Score</Text>
          <Text style={styles.riskExplanation}>{data.explanation}</Text>
        </Card>

        <Text style={styles.sectionTitle}>Contributing Factors</Text>

        {data.factors.map((factor, index) => (
          <Card key={index} style={styles.factorCard}>
            <View style={styles.factorRow}>
              <IconBadge
                icon={factor.icon}
                backgroundColor={Colors.primarySubtle}
                size={44}
              />
              <View style={styles.factorInfo}>
                <Text style={styles.factorLabel}>{factor.label}</Text>
                <Text style={styles.factorValue}>{factor.value}</Text>
              </View>
              <View
                style={[
                  styles.factorBadge,
                  {
                    backgroundColor:
                      factor.value === 'High'
                        ? Colors.dangerBg
                        : factor.value === 'Poor'
                        ? Colors.dangerBg
                        : factor.value === 'Low'
                        ? Colors.warningBg
                        : Colors.successBg,
                  },
                ]}
              >
                <View
                  style={[
                    styles.factorDot,
                    {
                      backgroundColor:
                        factor.value === 'High'
                          ? Colors.danger
                          : factor.value === 'Poor'
                          ? Colors.danger
                          : factor.value === 'Low'
                          ? Colors.warning
                          : Colors.success,
                    },
                  ]}
                />
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.recommendationCard} borderLeftColor={Colors.primaryLight}>
          <View style={styles.recHeader}>
            <Text style={styles.recIcon}>💡</Text>
            <Text style={styles.recTitle}>Recommendations</Text>
          </View>
          <View style={styles.recList}>
            {[
              'Practice stress-reduction techniques like meditation',
              'Aim for 7-8 hours of quality sleep',
              'Include hormone-balancing foods in your diet',
              'Regular moderate exercise (30 min daily)',
            ].map((rec, i) => (
              <View key={i} style={styles.recItem}>
                <Text style={styles.recBullet}>•</Text>
                <Text style={styles.recText}>{rec}</Text>
              </View>
            ))}
          </View>
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
  riskCard: {
    marginBottom: Spacing.xxl,
    alignItems: 'center',
  },
  circularContainer: {
    marginBottom: Spacing.xl,
  },
  circleContent: {
    alignItems: 'center',
  },
  riskPercent: {
    ...Typography.stat,
    color: Colors.text,
  },
  levelBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
    marginTop: Spacing.xs,
  },
  levelText: {
    ...Typography.captionMedium,
    fontWeight: '700',
  },
  riskLabel: {
    ...Typography.label,
    color: Colors.textTertiary,
    marginBottom: Spacing.md,
  },
  riskExplanation: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  factorCard: {
    marginBottom: Spacing.md,
  },
  factorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  factorLabel: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  factorValue: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  factorBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  recommendationCard: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  recIcon: {
    fontSize: 18,
  },
  recTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  recList: {
    gap: Spacing.md,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  recBullet: {
    ...Typography.body,
    color: Colors.primary,
    marginTop: -1,
  },
  recText: {
    ...Typography.body,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
});
