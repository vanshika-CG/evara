import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing, BorderRadius } from '../src/constants/spacing';
import { Card, Header, Button, IconBadge } from '../src/components';
import { DEFICIENCY_SYMPTOMS, DEFICIENCY_RESULT } from '../src/constants/data';

export default function DeficiencyScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const result = DEFICIENCY_RESULT;

  const toggleSymptom = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Header title="Deficiency Check" subtitle="Listen to your body's signals" showBack />
        <TouchableOpacity style={styles.avatar}>
          <Ionicons name="person" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.symptomsCard}>
          <Text style={styles.cardTitle}>Select your symptoms</Text>
          {DEFICIENCY_SYMPTOMS.map((symptom) => {
            const isSelected = selected.includes(symptom.id);
            return (
              <TouchableOpacity
                key={symptom.id}
                onPress={() => toggleSymptom(symptom.id)}
                style={[
                  styles.symptomRow,
                  isSelected && styles.symptomRowSelected,
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color={Colors.white} />
                  )}
                </View>
                <Text
                  style={[
                    styles.symptomLabel,
                    isSelected && styles.symptomLabelSelected,
                  ]}
                >
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Button
            title="Analyze Symptoms"
            onPress={handleAnalyze}
            loading={loading}
            disabled={selected.length === 0}
            icon={<Text style={{ fontSize: 16 }}>📊</Text>}
            style={styles.analyzeBtn}
          />
        </Card>

        {analyzed && (
          <>
            <Text style={styles.sectionTitle}>Your Analysis</Text>
            <Card style={styles.resultCard} borderLeftColor={Colors.primaryLight}>
              <View style={styles.resultHeader}>
                <IconBadge icon="💧" backgroundColor={Colors.primarySubtle} size={44} />
                <View style={styles.resultTitleSection}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                </View>
              </View>
              <Text style={styles.resultDescription}>{result.description}</Text>
              <Text style={styles.foodsTitle}>Suggested Foods</Text>
              <View style={styles.foodsRow}>
                {result.foods.map((food) => (
                  <View key={food.name} style={styles.foodItem}>
                    <View style={styles.foodIconWrapper}>
                      <Text style={styles.foodEmoji}>{food.icon}</Text>
                    </View>
                    <Text style={styles.foodName}>{food.name}</Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card style={styles.doctorCard} borderLeftColor={Colors.primaryLighter}>
              <View style={styles.doctorRow}>
                <IconBadge icon="🩺" backgroundColor={Colors.primarySubtle} size={44} />
                <View style={styles.doctorText}>
                  <Text style={styles.doctorTitle}>Doctor Recommendation</Text>
                  <Text style={styles.doctorDesc}>{result.doctorNote}</Text>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Spacing.xl,
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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  symptomsCard: {
    marginBottom: Spacing.xxl,
  },
  cardTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  symptomRowSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  checkboxSelected: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  symptomLabel: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
  symptomLabelSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  analyzeBtn: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  resultCard: {
    marginBottom: Spacing.xl,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  resultTitleSection: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  resultTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  resultDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  foodsTitle: {
    ...Typography.bodySemiBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  foodsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  foodItem: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.surfaceElevated,
  },
  foodIconWrapper: {
    marginBottom: Spacing.sm,
  },
  foodEmoji: {
    fontSize: 28,
  },
  foodName: {
    ...Typography.smallMedium,
    color: Colors.text,
  },
  doctorCard: {
    marginBottom: Spacing.xl,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  doctorTitle: {
    ...Typography.bodySemiBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  doctorDesc: {
    ...Typography.small,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
