import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import {
  Home,
  Users,
  Plus,
  Bell,
  User,
} from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme/theme';

export const TAB_BAR_HEIGHT = 64;

export interface TabItem {
  key: string;
  label: string;
  Icon: React.ComponentType<any>;
  isCenter?: boolean;
}

const TABS: TabItem[] = [
  { key: 'Feed',    label: 'Feed',    Icon: Home },
  { key: 'Social',  label: 'Social',  Icon: Users },
  { key: 'Add',     label: '',        Icon: Plus, isCenter: true },
  { key: 'Alerts',  label: 'Alerts',  Icon: Bell },
  { key: 'Me',      label: 'Me',      Icon: User },
];

// ── Individual animated tab item ──────────────────────────────────────────────
interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onPress }) => {
  const scale   = useSharedValue(1);
  const opacity = useSharedValue(isActive ? 1 : 0);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = useCallback(() => {
    // Spring bounce on press
    scale.value = withSpring(1.25, { damping: 6, stiffness: 280 }, () => {
      scale.value = withSpring(isActive ? 1.1 : 1, { damping: 8, stiffness: 200 });
    });
    opacity.value = withTiming(1, { duration: 150 });
    onPress();
  }, [isActive, onPress]);

  // Sync active state changes from outside
  React.useEffect(() => {
    scale.value   = withSpring(isActive ? 1.1 : 1, { damping: 8, stiffness: 200 });
    opacity.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive]);

  const iconColor = isActive ? colors.white : 'rgba(255,255,255,0.45)';
  const { Icon } = tab;

  // ── Center "Add" button ────────────────────────────────────────────────────
  if (tab.isCenter) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={styles.centerWrapper}
      >
        <Reanimated.View style={[styles.centerBtn, animatedIconStyle]}>
          <Icon size={26} color={colors.white} strokeWidth={2.5} />
        </Reanimated.View>
      </TouchableOpacity>
    );
  }

  // ── Regular tab ────────────────────────────────────────────────────────────
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.tabBtn}
    >
      <Reanimated.View style={animatedIconStyle}>
        <Icon
          size={22}
          color={iconColor}
          strokeWidth={isActive ? 2.5 : 2}
        />
      </Reanimated.View>
      {tab.label ? (
        <Reanimated.Text
          style={[
            styles.tabLabel,
            { color: iconColor },
            animatedLabelStyle,
          ]}
        >
          {tab.label}
        </Reanimated.Text>
      ) : null}
    </TouchableOpacity>
  );
};

// ── Main GlassTabBar ──────────────────────────────────────────────────────────
interface GlassTabBarProps {
  activeTab: string;
  onTabPress: (key: string) => void;
  /** Pass the Animated.Value from the parent's scroll handler */
  scrollY: Animated.Value;
}

export const GlassTabBar: React.FC<GlassTabBarProps> = ({
  activeTab,
  onTabPress,
  scrollY,
}) => {
  const insets     = useSafeAreaInsets();
  const lastScrollY = useRef(0);
  const slideAnim   = useRef(new Animated.Value(0)).current;

  // Listen to scroll and hide/show bar
  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
      listener: (event: any) => {
        const currentY  = event.nativeEvent.contentOffset.y;
        const direction = currentY > lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = currentY;

        Animated.timing(slideAnim, {
          toValue:         direction === 'down' && currentY > 60 ? TAB_BAR_HEIGHT + insets.bottom : 0,
          duration:        250,
          useNativeDriver: true,
          easing:          require('react-native').Easing?.out?.(require('react-native').Easing?.ease) ?? undefined,
        }).start();
      },
    }),
    [insets.bottom]
  );

  const barHeight = TAB_BAR_HEIGHT + insets.bottom + 8;

  const Inner = (
    <View style={[styles.inner, { paddingBottom: insets.bottom + 8 }]}>
      {TABS.map((tab) => (
        <TabButton
          key={tab.key}
          tab={tab}
          isActive={activeTab === tab.key}
          onPress={() => onTabPress(tab.key)}
        />
      ))}
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { height: barHeight, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Glass layer — iOS BlurView / Android fallback */}
      {Platform.OS === 'ios' ? (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="chromeMaterialDark"
          blurAmount={20}
          reducedTransparencyFallbackColor={colors.navy}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidBg]} />
      )}

      {/* Colour tint overlay */}
      <View style={[StyleSheet.absoluteFill, styles.tint]} />

      {/* Top highlight border */}
      <View style={styles.topBorder} />

      {Inner}
    </Animated.View>
  );
};

// ── Scroll-aware scroll view helper (export for parent use) ───────────────────
export { };   // keeps the module clean

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    position:  'absolute',
    bottom:    0,
    left:      0,
    right:     0,
    overflow:  'hidden',
    // Drop shadow
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius:  16,
    elevation:     20,
  },
  androidBg: {
    backgroundColor: 'rgba(18, 24, 38, 0.92)',
  },
  tint: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  topBorder: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    height:          0.5,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  inner: {
    flex:           1,
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: spacing.s,
  },
  // Regular tab
  tabBtn: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            3,
    paddingTop:     spacing.s,
  },
  tabLabel: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize:   typography.sizes.xs,
    lineHeight: 12,
  },
  // Center add button
  centerWrapper: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'flex-start',
    paddingTop:     0,
    marginTop:      -18,           // lifts the button above the bar
  },
  centerBtn: {
    width:           52,
    height:          52,
    borderRadius:    26,
    backgroundColor: colors.forest,
    alignItems:      'center',
    justifyContent:  'center',
    // Glow
    shadowColor:    colors.forest,
    shadowOffset:   { width: 0, height: 4 },
    shadowOpacity:  0.55,
    shadowRadius:   12,
    elevation:      12,
    // Subtle inner border
    borderWidth:    0.5,
    borderColor:    'rgba(255,255,255,0.3)',
  },
});
