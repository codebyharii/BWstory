import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Home, Users, Plus, Bell, User } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme/theme';

export const TAB_BAR_HEIGHT = 58;

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { key: 'Feed',   label: 'Feed',   Icon: Home },
  { key: 'Social', label: 'Social', Icon: Users },
  { key: 'Add',    label: '',       Icon: Plus,  isCenter: true },
  { key: 'Alerts', label: 'Alerts', Icon: Bell },
  { key: 'Me',     label: 'Me',     Icon: User },
];

// ─── Single animated tab button ───────────────────────────────────────────────
function TabButton({ tabKey, label, Icon, isCenter, isActive, onPress }: {
  tabKey: string;
  label: string;
  Icon: any;
  isCenter?: boolean;
  isActive: boolean;
  onPress: () => void;
}) {
  const scale   = useSharedValue(isActive ? 1.08 : 1);
  const opacity = useSharedValue(isActive ? 1 : 0.45);

  useEffect(() => {
    scale.value   = withSpring(isActive ? 1.08 : 1,  { damping: 7, stiffness: 260 });
    opacity.value = withTiming(isActive ? 1   : 0.45, { duration: 180 });
  }, [isActive]);

  const handlePress = () => {
    scale.value = withSpring(1.3, { damping: 5, stiffness: 300 }, () => {
      scale.value = withSpring(isActive ? 1.08 : 1, { damping: 8, stiffness: 220 });
    });
    onPress();
  };

  const iconAnim  = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const labelAnim = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const iconColor = isActive ? '#fff' : 'rgba(255,255,255,0.45)';

  if (isCenter) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.centerWrapper}>
        <Reanimated.View style={[styles.centerBtn, iconAnim]}>
          <Icon size={24} color="#fff" strokeWidth={2.5} />
        </Reanimated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.tabBtn}>
      <Reanimated.View style={iconAnim}>
        <Icon size={22} color={iconColor} strokeWidth={isActive ? 2.5 : 1.8} />
      </Reanimated.View>
      {label ? (
        <Reanimated.Text style={[styles.tabLabel, { color: iconColor }, labelAnim]}>
          {label}
        </Reanimated.Text>
      ) : null}
    </TouchableOpacity>
  );
}

// ─── Ref type exposed to parent ───────────────────────────────────────────────
export interface GlassTabBarRef {
  handleScroll: (event: any) => void;
}

// ─── Main GlassTabBar ─────────────────────────────────────────────────────────
interface GlassTabBarProps {
  activeTab: string;
  onTabPress: (key: string) => void;
}

const GlassTabBarInner = (
  { activeTab, onTabPress }: GlassTabBarProps,
  ref: React.Ref<GlassTabBarRef>
) => {
  const insets      = useSafeAreaInsets();
  const lastScrollY = useRef(0);
  const slideAnim   = useRef(new Animated.Value(0)).current;
  const barHeight   = TAB_BAR_HEIGHT + insets.bottom;

  const handleScroll = (event: any) => {
    const y = event?.nativeEvent?.contentOffset?.y ?? 0;
    const direction = y > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = y;

    Animated.timing(slideAnim, {
      toValue:         direction === 'down' && y > 40 ? barHeight + 12 : 0,
      duration:        230,
      easing:          Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({ handleScroll }));

  // Web: find the RN Web FlatList scroll container and attach a native DOM listener
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    let lastY = 0;
    let attached: Element | null = null;

    const onNativeScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const y = target.scrollTop;
      const dir = y > lastY ? 'down' : 'up';
      lastY = y;

      Animated.timing(slideAnim, {
        toValue:         dir === 'down' && y > 40 ? barHeight + 12 : 0,
        duration:        230,
        easing:          Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };

    // Poll every 300ms until we find the scrollable container
    const tryAttach = () => {
      // RN Web renders FlatList inside a div with overflow:scroll/auto
      const candidates = Array.from(document.querySelectorAll<HTMLElement>('div'));
      const scrollable = candidates.find(
        (el) =>
          el.scrollHeight > el.clientHeight + 10 &&
          (getComputedStyle(el).overflowY === 'scroll' ||
           getComputedStyle(el).overflowY === 'auto') &&
          el.clientHeight > 100
      );

      if (scrollable && scrollable !== attached) {
        if (attached) attached.removeEventListener('scroll', onNativeScroll);
        scrollable.addEventListener('scroll', onNativeScroll, { passive: true });
        attached = scrollable;
      }
    };

    const interval = setInterval(tryAttach, 300);
    tryAttach(); // run immediately

    return () => {
      clearInterval(interval);
      if (attached) attached.removeEventListener('scroll', onNativeScroll);
    };
  }, [barHeight]);

  // Web glass style uses real CSS backdrop-filter
  const webStyle = Platform.OS === 'web' ? {
    backdropFilter:         'blur(28px) saturate(160%)',
    WebkitBackdropFilter:   'blur(28px) saturate(160%)',
  } : {};

  return (
    <Animated.View
      style={[
        styles.container,
        { height: barHeight, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Glass base layer */}
      <View style={[StyleSheet.absoluteFill, styles.glassBase, webStyle as any]} />

      {/* Warm tint overlay — gives the iOS "frosted" warm cast */}
      <View style={[StyleSheet.absoluteFill, styles.tint]} />

      {/* Specular top-edge highlight (the bright 0.5px line) */}
      <View style={styles.topHighlight} />

      {/* Tab buttons */}
      <View style={[styles.inner, { paddingBottom: insets.bottom }]}>
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            tabKey={tab.key}
            label={tab.label}
            Icon={tab.Icon}
            isCenter={tab.isCenter}
            isActive={activeTab === tab.key}
            onPress={() => onTabPress(tab.key)}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export const GlassTabBar = forwardRef(GlassTabBarInner);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    position:      'absolute',
    bottom:        0,
    left:          0,
    right:         0,
    overflow:      'hidden',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius:  16,
    elevation:     24,
  },
  glassBase: {
    // Native: dark navy semi-transparent (simulates glass on dark content)
    backgroundColor: 'rgba(16, 22, 36, 0.78)',
  },
  tint: {
    // Very light warm film — the "frosted" warmth
    backgroundColor: 'rgba(255, 255, 255, 0.055)',
  },
  topHighlight: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    height:          0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  inner: {
    flex:             1,
    flexDirection:    'row',
    alignItems:       'center',
    paddingHorizontal: 4,
    paddingTop:       6,
  },
  tabBtn: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap:            3,
  },
  tabLabel: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize:   10,
    lineHeight: 12,
  },
  centerWrapper: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'flex-start',
    marginTop:      -22,
  },
  centerBtn: {
    width:           52,
    height:          52,
    borderRadius:    26,
    backgroundColor: colors.forest,
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     colors.forest,
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.65,
    shadowRadius:    12,
    elevation:       14,
    borderWidth:     0.5,
    borderColor:     'rgba(255,255,255,0.3)',
  },
});
