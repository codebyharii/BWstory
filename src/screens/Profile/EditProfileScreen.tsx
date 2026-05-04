import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Avatar } from '../../components/common/Avatar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing, border } from '../../theme/theme';
import { useNavigation } from '../../context/NavigationContext';

export const EditProfileScreen: React.FC = () => {
  const [name, setName] = useState('Neha Sharma');
  const [location, setLocation] = useState('Greater Noida');
  const [profession, setProfession] = useState('Anchor');
  const [bio, setBio] = useState('Telling stories that matter.');
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}><ChevronLeft size={22} color={colors.navy} /></TouchableOpacity>
          <Text style={styles.title}>Update Account</Text>
          <Button label="Save" onPress={goBack} size="sm" />
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCover} />
            <View style={styles.avatarWrap}>
              <Avatar initials="NS" size="xl" />
              <TouchableOpacity style={styles.cameraBtn}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Input label="Name" value={name} onChangeText={setName} />
          <Input label="Gender" value="Female" editable={false} />
          <Input label="Location" value={location} onChangeText={setLocation} />
          <Input label="Profession" value={profession} onChangeText={setProfession} />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            style={styles.bioInput}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.lg,
    color: colors.navy,
  },
  body: { padding: spacing.screenPadding },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl },
  avatarCover: {
    height: 100,
    width: '100%',
    backgroundColor: colors.navy,
    borderRadius: border.radiusCard,
    marginBottom: -40,
  },
  avatarWrap: { position: 'relative' },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: border.width,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: { fontSize: 14 },
  bioInput: { height: 80 },
});
