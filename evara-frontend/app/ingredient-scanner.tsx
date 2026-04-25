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
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing, BorderRadius } from '../src/constants/spacing';
import { Card, Header, Button, IconBadge } from '../src/components';
import { INGREDIENT_SCANNER } from '../src/constants/data';

export default function IngredientScannerScreen() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = INGREDIENT_SCANNER;

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScanned(true);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return Colors.success;
      case 'caution':
        return Colors.warning;
      case 'warning':
        return Colors.danger;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return 'checkmark-circle';
      case 'caution':
        return 'alert-circle';
      case 'warning':
        return 'warning';
      default:
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ingredient Scanner" subtitle="Check product safety" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!scanned ? (
          <>
            <Card style={styles.uploadCard}>
              <View style={styles.uploadArea}>
                <View style={styles.uploadIconCircle}>
                  <Ionicons name="camera-outline" size={40} color={Colors.primary} />
                </View>
                <Text style={styles.uploadTitle}>Scan Ingredients</Text>
                <Text style={styles.uploadSubtitle}>
                  Take a photo of the ingredient list or upload an image
                </Text>
              </View>

              <View style={styles.uploadButtons}>
                <Button
                  title="Take Photo"
                  onPress={handleScan}
                  loading={loading}
                  icon={<Ionicons name="camera" size={18} color={Colors.white} />}
                  style={styles.scanBtn}
                />
                <Button
                  title="Upload Image"
                  onPress={handleScan}
                  variant="outline"
                  icon={<Ionicons name="image-outline" size={18} color={Colors.primary} />}
                />
              </View>
            </Card>

            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>📌 Tips for best results</Text>
              {[
                'Ensure good lighting',
                'Capture the full ingredient list',
                'Keep the image in focus',
                'Avoid glare on packaging',
              ].map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Card>
          </>
        ) : (
          <>
            <Card style={styles.scoreCard}>
              <View style={styles.scoreContent}>
                <View style={styles.scoreCircle}>
                  <LinearGradient
                    colors={[Colors.warningLight, Colors.warning]}
                    style={styles.scoreGradient}
                  >
                    <Text style={styles.scoreValue}>{data.safetyScore}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.scoreInfo}>
                  <Text style={styles.scoreLabel}>Safety Score</Text>
                  <Text style={styles.scoreRating}>{data.rating}</Text>
                  <Text style={styles.scoreDesc}>
                    Some ingredients need attention
                  </Text>
                </View>
              </View>
            </Card>

            <Text style={styles.sectionTitle}>Ingredient Breakdown</Text>

            {data.ingredients.map((ingredient, index) => (
              <Card key={index} style={styles.ingredientCard}>
                <View style={styles.ingredientRow}>
                  <Ionicons
                    name={getStatusIcon(ingredient.status) as any}
                    size={22}
                    color={getStatusColor(ingredient.status)}
                  />
                  <View style={styles.ingredientInfo}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.ingredientNote}>{ingredient.note}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(ingredient.status) + '15' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(ingredient.status) },
                      ]}
                    >
                      {ingredient.status}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}

            <Button
              title="Scan Another"
              onPress={() => setScanned(false)}
              variant="outline"
              style={styles.scanAnotherBtn}
            />
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
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  uploadCard: {
    marginBottom: Spacing.xl,
  },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    borderWidth: 2,
    borderColor: Colors.primaryLighter,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.primarySubtle + '40',
  },
  uploadIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  uploadTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  uploadSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  uploadButtons: {
    gap: Spacing.md,
  },
  scanBtn: {
    marginBottom: 0,
  },
  tipsCard: {
    marginBottom: Spacing.xl,
  },
  tipsTitle: {
    ...Typography.bodySemiBold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tipText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  scoreCard: {
    marginBottom: Spacing.xxl,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircle: {
    marginRight: Spacing.xl,
  },
  scoreGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    ...Typography.statMedium,
    color: Colors.white,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  scoreRating: {
    ...Typography.h3,
    color: Colors.text,
    marginVertical: 2,
  },
  scoreDesc: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  ingredientCard: {
    marginBottom: Spacing.md,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  ingredientName: {
    ...Typography.bodySemiBold,
    color: Colors.text,
  },
  ingredientNote: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },
  statusText: {
    ...Typography.captionMedium,
    textTransform: 'capitalize',
  },
  scanAnotherBtn: {
    marginTop: Spacing.lg,
  },
});
