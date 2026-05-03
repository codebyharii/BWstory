import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, border } from '../../theme/theme';
import { Button } from '../../components/common/Button';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  emoji: string;
  headline: string;
  subtext: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '📰',
    headline: 'Fast & Hot News',
    subtext: 'Its platform to add, share your news and update.',
  },
  {
    id: '2',
    emoji: '📤',
    headline: 'Share',
    subtext: 'What you see and tell your surrounding about that.',
  },
  {
    id: '3',
    emoji: '🌍',
    headline: 'News Around',
    subtext: 'Explore trending news clips.',
  },
];

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      onGetStarted();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={onGetStarted}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.headline}>{item.headline}</Text>
            <Text style={styles.subtext}>{item.subtext}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.btnContainer}>
        <Button
          label={activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  skip: {
    alignSelf: 'flex-end',
    padding: spacing.l,
  },
  skipText: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.base,
    color: colors.slate,
  },
  slide: {
    width,
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding * 2,
    paddingTop: spacing.xxl * 2,
    gap: spacing.m,
  },
  emoji: {
    fontSize: 72,
    marginBottom: spacing.m,
  },
  headline: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.xxl,
    color: colors.navy,
    lineHeight: 30,
  },
  subtext: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.slate,
    lineHeight: typography.lineHeights.relaxed,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.s,
    paddingVertical: spacing.l,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.forest,
    borderRadius: border.radiusPill,
  },
  btnContainer: {
    paddingHorizontal: spacing.screenPadding * 2,
    paddingBottom: spacing.xxl * 2,
  },
});
