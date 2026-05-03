import React, { useState } from 'react';
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

export const ActionBar: React.FC<ActionBarProps> = ({
  likes,
  comments,
  onLike,
  onComment,
  onShare,
  onBookmark,
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
    onBookmark?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.action} onPress={handleLike} activeOpacity={0.7}>
          <Heart
            size={20}
            color={liked ? colors.error : colors.slate}
            fill={liked ? colors.error : 'transparent'}
          />
          <Text style={[styles.count, liked && styles.countLiked]}>{formatCount(likeCount)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onComment} activeOpacity={0.7}>
          <MessageCircle size={20} color={colors.slate} />
          <Text style={styles.count}>{formatCount(comments)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onShare} activeOpacity={0.7}>
          <Share2 size={20} color={colors.slate} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleBookmark} activeOpacity={0.7}>
        <Bookmark
          size={20}
          color={bookmarked ? colors.forest : colors.slate}
          fill={bookmarked ? colors.forest : 'transparent'}
        />
      </TouchableOpacity>
    </View>
  );
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.l,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  count: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.sm,
    color: colors.slate,
  },
  countLiked: {
    color: colors.error,
  },
});
