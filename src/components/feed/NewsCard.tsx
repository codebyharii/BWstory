import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play } from 'lucide-react-native';
import { colors, typography, border, spacing } from '../../theme/theme';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { ActionBar } from './ActionBar';

export interface NewsItem {
  id: string;
  author: { name: string; avatar?: string; initials?: string };
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

// ── Memoised so FlatList only re-renders cards that actually changed ───────────
export const NewsCard: React.FC<NewsCardProps> = memo(({ item, onPress, onFollowPress }) => {
  // Pre-compute initials once — avoids repeated .slice() on every render
  const initials = item.author.initials ?? item.author.name.slice(0, 2);

  return (
    <TouchableOpacity
      activeOpacity={0.93}
      onPress={onPress}
      style={styles.card}
      // Improves touch hit area without layout cost
      hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar uri={item.author.avatar} initials={initials} size="sm" />
          <View style={styles.userMeta}>
            <Text style={styles.authorName} numberOfLines={1}>{item.author.name}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onFollowPress}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.followBtn}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* ── Media ──────────────────────────────────────────────────────── */}
      <View style={styles.media}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          // Fade in image once loaded — no layout jump
          fadeDuration={200}
        />
        <View style={styles.overlay} />
        {item.type === 'video' && (
          <View style={styles.playBtn} pointerEvents="none">
            <Play size={18} color={colors.white} fill={colors.white} />
          </View>
        )}
        {item.readTime && (
          <View style={styles.durationBadge} pointerEvents="none">
            <Text style={styles.durationText}>{item.readTime}</Text>
          </View>
        )}
      </View>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <View style={styles.body}>
        {(item.isBreaking || item.isLive) && (
          <View style={styles.badgeRow}>
            {item.isBreaking && <Badge label="Breaking" variant="breaking" />}
            {item.isLive    && <Badge label="● Live"   variant="live" />}
          </View>
        )}
        <Text style={styles.headline} numberOfLines={2}>{item.headline}</Text>
        {item.excerpt && (
          <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt}</Text>
        )}
      </View>

      {/* ── Action Bar ─────────────────────────────────────────────────── */}
      <ActionBar likes={item.likes} comments={item.comments} />
    </TouchableOpacity>
  );
});

NewsCard.displayName = 'NewsCard';

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: border.radiusCard,
    borderWidth: border.width,
    borderColor: colors.border,
    marginBottom: spacing.cardGap,
    overflow: 'hidden',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.055,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s + 2,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.s, flex: 1 },
  userMeta: { gap: 2, flex: 1 },
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
    paddingLeft: spacing.m,
  },
  media: {
    height: 210,
    backgroundColor: colors.border,       // placeholder colour prevents flash
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  playBtn: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.s,
    right: spacing.s,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
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
  badgeRow: { flexDirection: 'row', gap: spacing.xs },
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
