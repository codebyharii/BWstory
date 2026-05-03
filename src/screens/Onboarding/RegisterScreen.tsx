import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing } from '../../theme/theme';

interface RegisterScreenProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onRegister(); }, 1200);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>BW<Text style={styles.logoAccent}>story</Text></Text>
          <Text style={styles.headline}>Create account ✨</Text>
          <Text style={styles.subtext}>Join thousands of news creators</Text>
        </View>

        <View style={styles.form}>
          <Input label="Full Name" value={name} onChangeText={setName} placeholder="John Doe" />
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="name@email.com" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Password" value={password} onChangeText={setPassword} placeholder="Min 8 characters" isPassword />
        </View>

        <Button label="Create Account" onPress={handleRegister} loading={loading} fullWidth size="lg" />

        <TouchableOpacity onPress={onLogin} style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Sign In</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.offWhite },
  container: { flexGrow: 1, padding: spacing.screenPadding * 2, justifyContent: 'center', gap: spacing.m },
  header: { marginBottom: spacing.xl, gap: spacing.s },
  logo: { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.display, color: colors.navy },
  logoAccent: { color: colors.forest },
  headline: { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.xxl, color: colors.navy },
  subtext: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.md, color: colors.slate },
  form: { gap: spacing.xs },
  loginRow: { alignItems: 'center', marginTop: spacing.m },
  loginText: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.base, color: colors.slate },
  loginLink: { fontFamily: typography.fonts.sora.semiBold, color: colors.forest },
});
