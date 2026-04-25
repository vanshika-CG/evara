import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/colors';
import { Typography } from '../src/constants/typography';
import { Spacing } from '../src/constants/spacing';
import { Button } from '../src/components';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/figma/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Evara</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationPlaceholder}>
            <Image
              source={require('../assets/Images/get_started.png')}
              resizeMode="contain"
              style={styles.illustrationEmoji}
            />
            <View style={styles.illustrationGlow} />
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.heading}>
            {"Because Women's\nHealth Isn't One-Size-\nFits-All"}
          </Text>
          <Text style={styles.subtitle}>
            Your personalized companion for diet, menstrual cycle, menopause guidance, and fitness.
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Get Started"
            onPress={() => router.push('/personalization')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 14
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
    zIndex: 1
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: Spacing.sm,
  },
  appName: {
    ...Typography.h2,
    color: Colors.text,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  illustrationPlaceholder: {
    width: 260,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',

  },
  illustrationEmoji: {
    width: 320
  },
  illustrationGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primarySubtle,
    opacity: 0.5,
    zIndex: -1,
  },
  textSection: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
  },
  heading: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontSize: 26,
    lineHeight: 36,
  },
  subtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.lg,
  },
  buttonSection: {
    paddingBottom: Spacing.xxxl,
  },
});
