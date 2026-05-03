import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Play } from 'lucide-react-native';
import { colors, border, spacing } from '../../theme/theme';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - spacing.screenPadding * 2 - spacing.xs) / 2;

export interface PostItem {
  id: string;
  thumbnail: string;
  type: 'video' | 'image';
  views?: number;
}

interface PostGridProps {
  posts: PostItem[];
  onPostPress?: (post: PostItem) => void;
}

export const PostGrid: React.FC<PostGridProps> = ({ posts, onPostPress }) => {
  return (
    <View style={styles.grid}>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.item}
          onPress={() => onPostPress?.(post)}
          activeOpacity={0.85}
        >
          <Image source={{ uri: post.thumbnail }} style={styles.image} />
          {post.type === 'video' && (
            <View style={styles.playOverlay}>
              <Play size={16} color={colors.white} fill={colors.white} />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.xs,
    paddingTop: spacing.m,
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: border.radiusCard,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    bottom: spacing.s,
    right: spacing.s,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
