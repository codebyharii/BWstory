import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors, typography, border, spacing } from '../../theme/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  isPassword = false,
  ...rest
}) => {
  const [secureText, setSecureText] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputRow,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          {...rest}
          secureTextEntry={secureText}
          style={styles.input}
          placeholderTextColor={colors.slate}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText((prev) => !prev)}
            style={styles.eyeIcon}
          >
            {secureText ? (
              <EyeOff size={18} color={colors.slate} />
            ) : (
              <Eye size={18} color={colors.slate} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.sm,
    color: colors.navy,
    marginBottom: spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: border.width,
    borderColor: colors.border,
    borderRadius: border.radiusCard,
    paddingHorizontal: spacing.m,
    height: 48,
  },
  inputFocused: {
    borderColor: colors.forest,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.navy,
  },
  eyeIcon: {
    paddingLeft: spacing.s,
  },
  errorText: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
