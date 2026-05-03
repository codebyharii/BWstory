import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Fonts
import * as Font from 'expo-font';
import { 
  Sora_400Regular, 
  Sora_500Medium, 
  Sora_600SemiBold 
} from '@expo-google-fonts/sora';
import { 
  DMSans_400Regular, 
  DMSans_500Medium 
} from '@expo-google-fonts/dm-sans';

// Screens
import DiscoverScreen from './src/screens/DiscoverScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Icons & Theme
import { colors } from './src/theme/theme';
import { Home, Users, PlusSquare, Bell, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

// Placeholder components for other tabs
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Sora_400Regular,
        Sora_500Medium,
        Sora_600SemiBold,
        DMSans_400Regular,
        DMSans_500Medium,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.offWhite }}>
        <ActivityIndicator size="large" color={colors.forest} />
      </View>
    );
  }

  return (
    <View style={styles.webWrapper}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let IconComponent;
                size = 24;

                if (route.name === 'Feed') {
                  IconComponent = Home;
                } else if (route.name === 'Social') {
                  IconComponent = Users;
                } else if (route.name === 'Add') {
                  IconComponent = PlusSquare;
                } else if (route.name === 'Alerts') {
                  IconComponent = Bell;
                } else if (route.name === 'Me') {
                  IconComponent = User;
                }

                return <IconComponent size={size} color={color} strokeWidth={focused ? 2.5 : 2} />;
              },
              tabBarActiveTintColor: colors.forest,
              tabBarInactiveTintColor: colors.slate,
              tabBarStyle: {
                height: 52,
                borderTopWidth: 0.5,
                borderTopColor: colors.border,
                backgroundColor: colors.white,
                paddingBottom: 4,
              },
              tabBarLabelStyle: {
                fontFamily: 'DMSans_500Medium',
                fontSize: 10,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen name="Feed" component={DiscoverScreen} />
            <Tab.Screen name="Social" children={() => <PlaceholderScreen name="Social" />} />
            <Tab.Screen name="Add" children={() => <PlaceholderScreen name="Add" />} />
            <Tab.Screen name="Alerts" children={() => <PlaceholderScreen name="Alerts" />} />
            <Tab.Screen name="Me" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    maxWidth: 480, // Mobile width constraint
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#000', // Black background outside the mobile view
  }
});
