import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { ChevronLeft, Image as ImageIcon, Video, MapPin } from 'lucide-react-native';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing, border } from '../../theme/theme';

export const AddStoryScreen: React.FC = () => {
  const [content, setContent] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <ChevronLeft size={22} color={colors.navy} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Story</Text>
          <Button label="Publish" onPress={() => {}} size="sm" />
        </View>

        {/* Text Area */}
        <TextInput
          style={styles.input}
          placeholder="What's happening around you? Share your story..."
          placeholderTextColor={colors.slate}
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />

        {/* Attachment options */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolBtn}>
            <ImageIcon size={22} color={colors.navy} />
            <Text style={styles.toolLabel}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolBtn}>
            <Video size={22} color={colors.navy} />
            <Text style={styles.toolLabel}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolBtn}>
            <MapPin size={22} color={colors.navy} />
            <Text style={styles.toolLabel}>Location</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.lg,
    color: colors.navy,
  },
  input: {
    flex: 1,
    padding: spacing.screenPadding,
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.navy,
    lineHeight: typography.lineHeights.relaxed,
  },
  toolbar: {
    flexDirection: 'row',
    gap: spacing.l,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    borderTopWidth: border.width,
    borderTopColor: colors.border,
  },
  toolBtn: { alignItems: 'center', gap: 4 },
  toolLabel: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.xs,
    color: colors.slate,
  },
});
