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
import { Card, Header, ProgressBar, IconBadge } from '../src/components';
import { HEALTH_TIMELINE } from '../src/constants/data';

export default function HealthTimelineScreen() {
  const data = HEALTH_TIMELINE;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Why this recommendation?" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.description}>
          Evara's AI personalized today's plan by analyzing three key factors from your health profile.
        </Text>

        {data.insights.map((insight, index) => (
          <Card
            key={index}
            style={styles.insightCard}
            borderLeftColor={insight.borderColor}
          >
            <View style={styles.insightHeader}>
              <View style={styles.insightTitleRow}>
                <IconBadge
                  icon={index === 0 ? '📊' : index === 1 ? '🌙' : '📈'}
                  backgroundColor={Colors.primarySubtle}
                  size={40}
                />
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <View
                style={[
                  styles.levelBadge,
                  {
                    backgroundColor:
                      insight.level === 'High Impact'
                        ? Colors.primarySubtle
                        : Colors.secondarySubtle,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.levelText,
                    {
                      color:
                        insight.level === 'High Impact'
                          ? Colors.primary
                          : Colors.secondary,
                    },
                  ]}
                >
                  {insight.level}
                </Text>
              </View>
            </View>

            <Text style={styles.insightDescription}>{insight.description}</Text>

            <ProgressBar
              progress={insight.progress}
              color={insight.color}
              backgroundColor={insight.color + '20'}
              height={6}
              label="Impact"
              style={styles.impactBar}
            />
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
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  insightCard: {
    marginBottom: Spacing.xl,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  insightTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  levelBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  levelText: {
    ...Typography.captionMedium,
  },
  insightDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  impactBar: {
    marginTop: Spacing.sm,
  },
});
