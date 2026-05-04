import React, { memo, useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme/theme';

interface ActionBarProps {
  likes: number;
  comments: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

// O(1) formatter — called only when count value changes
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export const ActionBar: React.FC<ActionBarProps> = memo(({
  likes, comments, onLike, onComment, onShare, onBookmark,
}) => {
  const [liked,      setLiked]      = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount,  setLikeCount]  = useState(likes);

  // useCallback prevents new function refs on every parent re-render
  const handleLike = useCallback(() => {
    setLiked((prev) => {
      setLikeCount((c) => prev ? c - 1 : c + 1);
      return !prev;
    });
    onLike?.();
  }, [onLike]);

  const handleBookmark = useCallback(() => {
    setBookmarked((prev) => !prev);
    onBookmark?.();
  }, [onBookmark]);

  // Pre-formatted strings — not recalculated on each render when unchanged
  const likeLabel    = formatCount(likeCount);
  const commentLabel = formatCount(comments);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* Like */}
        <TouchableOpacity
          style={styles.action}
          onPress={handleLike}
          activeOpacity={0.7}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Heart
            size={19}
            color={liked ? colors.error : colors.slate}
            fill={liked ? colors.error : 'transparent'}
          />
          <Text style={[styles.count, liked && styles.countLiked]}>{likeLabel}</Text>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity
          style={styles.action}
          onPress={onComment}
          activeOpacity={0.7}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MessageCircle size={19} color={colors.slate} />
          <Text style={styles.count}>{commentLabel}</Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity
          style={styles.action}
          onPress={onShare}
          activeOpacity={0.7}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Share2 size={19} color={colors.slate} />
        </TouchableOpacity>
      </View>

      {/* Bookmark */}
      <TouchableOpacity
        onPress={handleBookmark}
        activeOpacity={0.7}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      >
        <Bookmark
          size={19}
          color={bookmarked ? colors.forest : colors.slate}
          fill={bookmarked ? colors.forest : 'transparent'}
        />
      </TouchableOpacity>
    </View>
  );
});

ActionBar.displayName = 'ActionBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s + 2,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.l },
  action: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  count: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.sm,
    color: colors.slate,
  },
  countLiked: { color: colors.error },
});
