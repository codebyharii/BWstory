import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play } from 'lucide-react-native';
import { colors, typography, border, spacing } from '../../theme/theme';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { ActionBar } from './ActionBar';

export interface NewsItem {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  timeAgo: string;
  type: 'video' | 'image';
  thumbnail: string;
  headline: string;
  excerpt?: string;
  isBreaking?: boolean;
  isLive?: boolean;
  likes: number;
  comments: number;
  readTime?: string;
}

interface NewsCardProps {
  item: NewsItem;
  onPress?: () => void;
  onFollowPress?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onPress, onFollowPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            uri={item.author.avatar}
            initials={item.author.initials || item.author.name.slice(0, 2)}
            size="sm"
          />
          <View style={styles.userMeta}>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onFollowPress} activeOpacity={0.7}>
          <Text style={styles.followBtn}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Media */}
      <View style={styles.media}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        {/* Dark overlay gradient effect */}
        <View style={styles.overlay} />

        {item.type === 'video' && (
          <View style={styles.playBtn}>
            <Play size={18} color={colors.white} fill={colors.white} />
          </View>
        )}

        {item.readTime && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.readTime}</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.badgeRow}>
          {item.isBreaking && <Badge label="Breaking" variant="breaking" />}
          {item.isLive && <Badge label="● Live" variant="live" />}
        </View>
        <Text style={styles.headline} numberOfLines={2}>{item.headline}</Text>
        {item.excerpt && (
          <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt}</Text>
        )}
      </View>

      {/* Action Bar */}
      <ActionBar
        likes={item.likes}
        comments={item.comments}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: border.radiusCard,
    borderWidth: border.width,
    borderColor: colors.border,
    marginBottom: spacing.cardGap,
    overflow: 'hidden',
    // Subtle shadow
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s + 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  userMeta: {
    gap: 1,
  },
  authorName: {
    fontFamily: typography.fonts.sora.medium,
    fontSize: typography.sizes.base,
    color: colors.navy,
  },
  timeAgo: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.xs,
    color: colors.slate,
  },
  followBtn: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.sm,
    color: colors.forest,
  },
  media: {
    height: 220,
    backgroundColor: colors.navy,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
    opacity: 0.2,
  },
  playBtn: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.s,
    right: spacing.s,
    backgroundColor: colors.overlayDark,
    paddingHorizontal: spacing.s,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.xs,
    color: colors.white,
  },
  body: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: spacing.s,
    gap: spacing.s,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  headline: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.md,
    color: colors.navy,
    lineHeight: typography.lineHeights.normal,
  },
  excerpt: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.base,
    color: colors.slate,
    lineHeight: typography.lineHeights.normal,
  },
});
