import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GlassTabBar, TAB_BAR_HEIGHT } from '../components/navigation/GlassTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollProvider } from '../context/ScrollContext';
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
  const [activeTab, setActiveTab]   = useState<TabKey>('Feed');
  const insets = useSafeAreaInsets();
  const tabBarRef = useRef<any>(null);

  // This function is called by the active screen's FlatList onScroll
  const handleScroll = useCallback((event: any) => {
    // Forward to the GlassTabBar's internal scroll handler via ref
    tabBarRef.current?.handleScroll?.(event);
  }, []);

  const ActiveScreen = SCREENS[activeTab];

  return (
    <ScrollProvider onScroll={handleScroll}>
      <View style={styles.root}>
        {/* Screen content — bottom padded so nothing hides under the tab bar */}
        <View style={[styles.screenWrapper, {
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom,
        }]}>
          <ActiveScreen />
        </View>

        {/* Floating glass tab bar */}
        <GlassTabBar
          ref={tabBarRef}
          activeTab={activeTab}
          onTabPress={(key) => setActiveTab(key as TabKey)}
        />
      </View>
    </ScrollProvider>
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
