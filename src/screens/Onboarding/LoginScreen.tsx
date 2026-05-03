import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing } from '../../theme/theme';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate async auth
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BW<Text style={styles.logoAccent}>story</Text></Text>
          <Text style={styles.headline}>Welcome back 👋</Text>
          <Text style={styles.subtext}>Sign in to continue reading</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="name@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            isPassword
          />
          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          label="Sign In"
          onPress={handleLogin}
          loading={loading}
          fullWidth
          size="lg"
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={onRegister} style={styles.signupRow}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.offWhite },
  container: {
    flexGrow: 1,
    padding: spacing.screenPadding * 2,
    justifyContent: 'center',
    gap: spacing.m,
  },
  header: { marginBottom: spacing.xl, gap: spacing.s },
  logo: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.display,
    color: colors.navy,
  },
  logoAccent: { color: colors.forest },
  headline: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.xxl,
    color: colors.navy,
  },
  subtext: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.slate,
  },
  form: { gap: spacing.xs },
  forgotRow: { alignItems: 'flex-end', marginTop: -spacing.s },
  forgotText: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.sm,
    color: colors.forest,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    marginVertical: spacing.s,
  },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: colors.border },
  dividerText: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.sm,
    color: colors.slate,
  },
  signupRow: { alignItems: 'center' },
  signupText: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.base,
    color: colors.slate,
  },
  signupLink: {
    fontFamily: typography.fonts.sora.semiBold,
    color: colors.forest,
  },
});
