import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, border } from '../../theme/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.forest}
        />
      ) : (
        <Text style={[styles.label, styles[`label_${variant}`], styles[`label_size_${size}`], labelStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: border.radiusButton,
  },
  // Variants
  primary: {
    backgroundColor: colors.forest,
  },
  secondary: {
    backgroundColor: colors.navy,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.forest,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  size_sm: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs + 2,
  },
  size_md: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m - 2,
  },
  size_lg: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.m,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  // Labels
  label: {
    fontFamily: typography.fonts.sora.semiBold,
    textAlign: 'center',
  },
  label_primary: { color: colors.white },
  label_secondary: { color: colors.white },
  label_outline: { color: colors.forest },
  label_ghost: { color: colors.forest },
  label_size_sm: { fontSize: typography.sizes.sm },
  label_size_md: { fontSize: typography.sizes.base },
  label_size_lg: { fontSize: typography.sizes.md },
});
