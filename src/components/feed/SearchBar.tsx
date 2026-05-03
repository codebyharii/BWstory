import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { colors, typography, border, spacing } from '../../theme/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search stories...',
  onFilterPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Search size={16} color={colors.slate} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.slate}
        style={styles.input}
      />
      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filter}>
          <SlidersHorizontal size={16} color={colors.navy} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: border.radiusButton,
    paddingHorizontal: spacing.m,
    height: 38,
    gap: spacing.s,
  },
  input: {
    flex: 1,
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.base,
    color: colors.navy,
  },
  filter: {
    paddingLeft: spacing.xs,
  },
});
