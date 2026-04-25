import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing, BorderRadius } from '../src/constants/spacing';
import { Button, Input, Header } from '../src/components';

type MenstrualStatus = 'regular' | 'irregular' | 'menopause';
type Lifestyle = 'sedentary' | 'moderate' | 'active';

export default function PersonalizationScreen() {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [lifestyle, setLifestyle] = useState<Lifestyle>('moderate');
  const [menstrualStatus, setMenstrualStatus] = useState<MenstrualStatus>('regular');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const lifestyleOptions: { key: Lifestyle; label: string; icon: string }[] = [
    { key: 'sedentary', label: 'Sedentary', icon: '🪑' },
    { key: 'moderate', label: 'Moderate', icon: '🚶‍♀️' },
    { key: 'active', label: 'Active', icon: '🏃‍♀️' },
  ];

  const menstrualOptions: { key: MenstrualStatus; label: string }[] = [
    { key: 'regular', label: 'Regular' },
    { key: 'irregular', label: 'Irregular' },
    { key: 'menopause', label: 'Menopause' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.stepText}>STEP 2 OF 3</Text>
      <Header title="Personalize" subtitle="Tell us a bit about yourself so Evara can tailor
your health journey."/>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <Input
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
            suffix="years"
          />
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Input
                label="Height"
                value={height}
                onChangeText={setHeight}
                placeholder="165"
                keyboardType="numeric"
                suffix="cm"
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="Weight"
                value={weight}
                onChangeText={setWeight}
                placeholder="64"
                keyboardType="numeric"
                suffix="kg"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          <View style={styles.toggleRow}>
            {lifestyleOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => setLifestyle(option.key)}
                style={[
                  styles.toggleButton,
                  lifestyle === option.key && styles.toggleButtonActive,
                ]}
              >
                <Text style={styles.toggleIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.toggleLabel,
                    lifestyle === option.key && styles.toggleLabelActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menstrual Status</Text>
          <View style={styles.statusRow}>
            {menstrualOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => setMenstrualStatus(option.key)}
                style={[
                  styles.statusButton,
                  menstrualStatus === option.key && styles.statusButtonActive,
                ]}
              >
                <View style={styles.radioOuter}>
                  {menstrualStatus === option.key && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text
                  style={[
                    styles.statusLabel,
                    menstrualStatus === option.key && styles.statusLabelActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Generate My Plan"
            onPress={handleGenerate}
            loading={loading}
            icon={<Text style={styles.sparkle}>✨</Text>}
          />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  stepText: {
    ...Typography.smallSemiBold,
    textAlign: 'center',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  toggleButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySubtle,
  },
  toggleIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  toggleLabel: {
    ...Typography.smallMedium,
    color: Colors.textSecondary,
  },
  toggleLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  statusRow: {
    gap: Spacing.md,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  statusButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySubtle,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.primaryLighter,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  statusLabel: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  statusLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sparkle: {
    fontSize: 18,
  },
});
