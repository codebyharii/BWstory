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
  const scale = useSharedValue(isActive ? 1.08 : 1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.08 : 1, { damping: 7, stiffness: 260 });
  }, [isActive]);

  const handlePress = () => {
    scale.value = withSpring(1.28, { damping: 5, stiffness: 300 }, () => {
      scale.value = withSpring(isActive ? 1.08 : 1, { damping: 8, stiffness: 220 });
    });
    onPress();
  };

  const iconAnim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // Active = white, Inactive = muted white — BOTH always visible
  const iconColor  = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.52)';
  const labelColor = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.48)';

  // ── Center "+" button — sits at the same flex level, just visually raised ──
  if (isCenter) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.tabBtn}>
        <Reanimated.View style={[styles.centerBtn, iconAnim]}>
          <Icon size={22} color="#fff" strokeWidth={2.5} />
        </Reanimated.View>
        {/* Empty label placeholder to keep height consistent */}
        <Text style={[styles.tabLabel, { color: 'transparent' }]}>{'·'}</Text>
      </TouchableOpacity>
    );
  }

  // ── Regular tab — icon + label always shown ────────────────────────────────
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.tabBtn}>
      <Reanimated.View style={iconAnim}>
        <Icon size={22} color={iconColor} strokeWidth={isActive ? 2.5 : 1.8} />
      </Reanimated.View>
      <Text style={[styles.tabLabel, { color: labelColor }]}>{label}</Text>
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
    alignItems:       'stretch',     // all tab cells same height
    paddingHorizontal: 0,
    paddingTop:       0,
  },
  // Every tab cell — same size, same layout
  tabBtn: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'flex-end',       // align from bottom so labels line up
    paddingBottom:  8,
    gap:            3,
  },
  tabLabel: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize:   10,
    lineHeight: 12,
    textAlign:  'center',
  },
  // Center Add button — raised with negative marginTop, stays in same flex cell
  centerBtn: {
    width:           48,
    height:          48,
    borderRadius:    24,
    backgroundColor: colors.forest,
    alignItems:      'center',
    justifyContent:  'center',
    marginTop:       -18,            // raises it above the bar line
    shadowColor:     colors.forest,
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.65,
    shadowRadius:    10,
    elevation:       14,
    borderWidth:     0.5,
    borderColor:     'rgba(255,255,255,0.28)',
  },
});
