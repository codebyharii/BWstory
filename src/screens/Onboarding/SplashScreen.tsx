import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography } from '../../theme/theme';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logo}>BW</Text>
        <Text style={styles.logoSub}>story</Text>
      </View>
      <Text style={styles.tagline}>Fast. Local. News.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logo: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: 56,
    color: colors.white,
    lineHeight: 60,
  },
  logoSub: {
    fontFamily: typography.fonts.sora.regular,
    fontSize: 32,
    color: colors.mint,
    lineHeight: 40,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.slate,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
