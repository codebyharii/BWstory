import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, border, spacing } from '../../theme/theme';

type BadgeVariant = 'breaking' | 'trending' | 'live' | 'new';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  breaking: { bg: colors.error, text: colors.white },
  trending: { bg: colors.warning, text: colors.navy },
  live: { bg: '#E53935', text: colors.white },
  new: { bg: colors.forest, text: colors.white },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'new', style }) => {
  const { bg, text } = variantColors[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      {variant === 'live' && <View style={styles.liveDot} />}
      <Text style={[styles.label, { color: text }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.s,
    paddingVertical: 2,
    borderRadius: border.radiusPill,
    gap: 4,
  },
  label: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.xs,
    letterSpacing: 0.5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
});
