import React, { useState, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { GlassTabBar, TAB_BAR_HEIGHT } from '../components/navigation/GlassTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NewsFeedScreen } from '../screens/Feed/NewsFeedScreen';
import { SocialFeedScreen } from '../screens/Social/SocialFeedScreen';
import { AddStoryScreen } from '../screens/Feed/AddStoryScreen';
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { colors } from '../constants/colors';

type TabKey = 'Feed' | 'Social' | 'Add' | 'Alerts' | 'Me';

const SCREENS: Record<TabKey, React.FC> = {
  Feed:   NewsFeedScreen,
  Social: SocialFeedScreen,
  Add:    AddStoryScreen,
  Alerts: NotificationsScreen,
  Me:     ProfileScreen,
};

export const BottomTabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Feed');
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets  = useSafeAreaInsets();

  const ActiveScreen = SCREENS[activeTab];

  return (
    <View style={styles.root}>
      {/* Active screen — padded so content doesn't hide behind the tab bar */}
      <View style={[styles.screenWrapper, { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 8 }]}>
        <ActiveScreen />
      </View>

      {/* Floating glass tab bar */}
      <GlassTabBar
        activeTab={activeTab}
        onTabPress={(key) => setActiveTab(key as TabKey)}
        scrollY={scrollY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  screenWrapper: {
    flex: 1,
  },
});
