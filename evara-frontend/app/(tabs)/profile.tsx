import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing, BorderRadius } from '../../src/constants/spacing';
import { Card, IconBadge } from '../../src/components';
import { USER_PROFILE } from '../../src/constants/data';

export default function ProfileScreen() {
  const router = useRouter();
  const user = USER_PROFILE;

  const healthHistory = [
    { label: 'Cycle Logs', icon: '📅', color: Colors.primarySubtle },
    { label: 'Symptoms Logs', icon: '📊', color: Colors.primarySubtle },
    { label: 'Previous Reports', icon: '📋', color: Colors.primarySubtle },
  ];

  const settingsItems = [
    { label: 'Smart Reminders', icon: 'notifications-outline' as const, color: Colors.primary },
    { label: 'Settings', icon: 'settings-outline' as const, color: Colors.textSecondary },
    { label: 'Hormone Risk', icon: 'pulse-outline' as const, color: Colors.secondary, route: '/hormone-risk' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[Colors.primaryLighter, Colors.primarySubtle]}
              style={styles.avatarBorder}
            >
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={30} color={Colors.primary} />
              </View>
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.fullName}</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumIcon}>✨</Text>
              <Text style={styles.premiumText}>Evara Premium</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.primary }]}>{user.age}</Text>
            <Text style={styles.statLabel}>Years Old</Text>
          </Card>
          <Card style={[styles.statCard, styles.statCardAccent]}>
            <Text style={[styles.statValue, { color: Colors.secondary }]}>{user.bmi}</Text>
            <Text style={styles.statLabel}>BMI ({user.bmiStatus})</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Personal Info</Text>
        <Card style={styles.infoCard}>
          <View style={styles.infoField}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <View style={styles.infoValueRow}>
              <Text style={styles.infoValue}>{user.fullName}</Text>
              <Ionicons name="pencil-outline" size={18} color={Colors.textTertiary} />
            </View>
          </View>
          <View style={styles.infoDoubleRow}>
            <View style={styles.infoHalf}>
              <Text style={styles.infoLabel}>Height (cm)</Text>
              <View style={styles.infoValueRow}>
                <Text style={styles.infoValue}>{user.height}</Text>
                <Ionicons name="pencil-outline" size={16} color={Colors.textTertiary} />
              </View>
            </View>
            <View style={styles.infoHalf}>
              <Text style={styles.infoLabel}>Weight (kg)</Text>
              <View style={styles.infoValueRow}>
                <Text style={styles.infoValue}>{user.weight}</Text>
                <Ionicons name="pencil-outline" size={16} color={Colors.textTertiary} />
              </View>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Health History</Text>
        <Card style={styles.historyCard}>
          {healthHistory.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.historyItem,
                index < healthHistory.length - 1 && styles.historyBorder,
              ]}
            >
              <View style={styles.historyLeft}>
                <IconBadge
                  icon={item.icon}
                  backgroundColor={item.color}
                  size={40}
                />
                <Text style={styles.historyLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </Card>

        <View style={styles.actionsList}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.settingsItem}
              onPress={item.route ? () => router.push(item.route as any) : undefined}
            >
              <View style={styles.settingsLeft}>
                <View style={[styles.settingsIcon, { backgroundColor: Colors.primarySubtle }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.settingsLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </TouchableOpacity>
          ))}
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
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  avatarContainer: {},
  avatarBorder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: Spacing.lg,
  },
  profileName: {
    ...Typography.h3,
    color: Colors.text,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  premiumIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  premiumText: {
    ...Typography.smallMedium,
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statCardAccent: {
    borderColor: Colors.secondaryLighter,
    backgroundColor: Colors.secondarySubtle,
  },
  statValue: {
    ...Typography.statMedium,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    marginBottom: Spacing.xxl,
  },
  infoField: {
    marginBottom: Spacing.lg,
  },
  infoLabel: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  infoValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    paddingBottom: Spacing.md,
  },
  infoValue: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
  infoDoubleRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  infoHalf: {
    flex: 1,
  },
  historyCard: {
    marginBottom: Spacing.xxl,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  historyLabel: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
  actionsList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsLabel: {
    ...Typography.bodyMedium,
    color: Colors.text,
  },
});
