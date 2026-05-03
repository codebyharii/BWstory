import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../../theme/theme';

interface LoaderProps {
  fullScreen?: boolean;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false, label }) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size="large" color={colors.forest} />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    );
  }

  return <ActivityIndicator size="small" color={colors.forest} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite,
    gap: 12,
  },
  label: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.base,
    color: colors.slate,
  },
});
