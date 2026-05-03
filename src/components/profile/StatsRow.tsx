import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, border, spacing } from '../../theme/theme';

interface Stat {
  label: string;
  value: number | string;
}

interface StatsRowProps {
  stats: Stat[];
  onStatPress?: (label: string) => void;
}

function formatStat(val: number | string): string {
  if (typeof val === 'string') return val;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}k`;
  return String(val);
}

export const StatsRow: React.FC<StatsRowProps> = ({ stats, onStatPress }) => {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <TouchableOpacity
            style={styles.stat}
            onPress={() => onStatPress?.(stat.label)}
            activeOpacity={0.7}
          >
            <Text style={styles.value}>{formatStat(stat.value)}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </TouchableOpacity>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing.m,
    borderTopWidth: border.width,
    borderTopColor: colors.border,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  value: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.lg,
    color: colors.navy,
  },
  label: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.sm,
    color: colors.slate,
  },
  divider: {
    width: border.width,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
