import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { SplashScreen } from '../screens/Onboarding/SplashScreen';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { RegisterScreen } from '../screens/Onboarding/RegisterScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  onAuthenticated: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding">
        {(props) => <OnboardingScreen {...props} onGetStarted={() => props.navigation.navigate('Login')} />}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            onLogin={onAuthenticated}
            onRegister={() => props.navigation.navigate('Register')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(props) => (
          <RegisterScreen
            {...props}
            onRegister={onAuthenticated}
            onLogin={() => props.navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
