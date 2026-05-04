import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import {
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
} from '@expo-google-fonts/sora';
import {
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/store';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Sora_400Regular,
      Sora_500Medium,
      Sora_600SemiBold,
      DMSans_400Regular,
      DMSans_500Medium,
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#1A7A55" />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <View style={styles.root}>
          <BottomTabNavigator />
        </View>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#1B2533',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    // Constrain to mobile width when previewing on Web
    maxWidth:  Platform.OS === 'web' ? 480 : undefined,
    width:     '100%',
    alignSelf: 'center',
  },
});
