import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, border } from '../../theme/theme';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string;
  initials?: string;
  size?: AvatarSize;
  showBadge?: boolean;
  style?: ViewStyle;
}

// Static lookup — O(1), computed once at module load
const SIZE: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 44, lg: 64, xl: 88 };

export const Avatar: React.FC<AvatarProps> = memo(({
  uri, initials = '?', size = 'md', showBadge = false, style,
}) => {
  const dim      = SIZE[size];
  const radius   = dim / 2;
  const fontSize = Math.round(dim * 0.35);

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.circle, { width: dim, height: dim, borderRadius: radius }]}>
        {uri ? (
          <Image
            source={{ uri }}
            style={[styles.image, { borderRadius: radius }]}
            fadeDuration={150}
          />
        ) : (
          <Text style={[styles.initials, { fontSize }]}>
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        )}
      </View>
      {showBadge && <View style={styles.badge} />}
    </View>
  );
});

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  circle: {
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: border.width,
    borderColor: colors.border,
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  initials: {
    fontFamily: typography.fonts.sora.semiBold,
    color: colors.forest,
  },
  badge: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.forest,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});
