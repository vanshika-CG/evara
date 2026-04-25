import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing, BorderRadius } from '../src/constants/spacing';
import { Card, Header, Button, Chip } from '../src/components';
import { CHECKIN_MOODS, CHECKIN_SYMPTOMS } from '../src/constants/data';

export default function DailyCheckinScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [energy, setEnergy] = useState(60);
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Daily Check-in" subtitle="How are you feeling today?" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Your Mood</Text>
        <Card style={styles.moodCard}>
          <View style={styles.moodGrid}>
            {CHECKIN_MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                onPress={() => setSelectedMood(mood.id)}
                style={[
                  styles.moodItem,
                  selectedMood === mood.id && styles.moodItemSelected,
                ]}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    selectedMood === mood.id && styles.moodLabelSelected,
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Symptoms</Text>
        <Card style={styles.symptomCard}>
          <View style={styles.symptomGrid}>
            {CHECKIN_SYMPTOMS.map((symptom) => (
              <Chip
                key={symptom.id}
                label={symptom.label}
                selected={selectedSymptoms.includes(symptom.id)}
                onPress={() => toggleSymptom(symptom.id)}
              />
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Energy Level</Text>
        <Card style={styles.energyCard}>
          <View style={styles.energyHeader}>
            <Text style={styles.energyEmoji}>
              {energy < 30 ? '😴' : energy < 60 ? '😐' : energy < 80 ? '😊' : '⚡'}
            </Text>
            <Text style={styles.energyValue}>{energy}%</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${energy}%` }]} />
            <TouchableOpacity
              style={[styles.sliderThumb, { left: `${energy - 3}%` }]}
              onPressIn={() => {}}
            />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Low</Text>
            <Text style={styles.sliderLabel}>Moderate</Text>
            <Text style={styles.sliderLabel}>High</Text>
          </View>
          <View style={styles.energyButtons}>
            {[20, 40, 60, 80, 100].map((val) => (
              <TouchableOpacity
                key={val}
                onPress={() => setEnergy(val)}
                style={[
                  styles.energyBtn,
                  energy === val && styles.energyBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.energyBtnText,
                    energy === val && styles.energyBtnTextActive,
                  ]}
                >
                  {val}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.submitSection}>
          <Button
            title={submitted ? '✅ Submitted!' : 'Submit Check-in'}
            onPress={handleSubmit}
            variant={submitted ? 'secondary' : 'primary'}
            disabled={!selectedMood}
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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  moodCard: {
    marginBottom: Spacing.xxl,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: '30%',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  moodItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySubtle,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  moodLabel: {
    ...Typography.smallMedium,
    color: Colors.textSecondary,
  },
  moodLabelSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  symptomCard: {
    marginBottom: Spacing.xxl,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  energyCard: {
    marginBottom: Spacing.xxl,
  },
  energyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  energyEmoji: {
    fontSize: 36,
  },
  energyValue: {
    ...Typography.statMedium,
    color: Colors.primary,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: Colors.primarySubtle,
    borderRadius: 4,
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  sliderLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  energyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  energyBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  energyBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySubtle,
  },
  energyBtnText: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
  },
  energyBtnTextActive: {
    color: Colors.primary,
  },
  submitSection: {
    marginTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});
