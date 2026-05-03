import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, border, spacing } from '../theme/theme';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';

const NewsCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.followButton}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Media */}
      <View style={styles.mediaContainer}>
        {item.type === 'video' ? (
           <View style={styles.videoPlaceholder}>
             <Image source={{ uri: item.thumbnail }} style={styles.mediaImage} />
             <View style={styles.playIconContainer}>
               <View style={styles.playIcon} />
             </View>
           </View>
        ) : (
          <Image source={{ uri: item.thumbnail }} style={styles.mediaImage} />
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        {item.isBreaking && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Breaking</Text>
          </View>
        )}
        <Text style={styles.headline}>{item.headline}</Text>
      </View>

      {/* Footer / Actions */}
      <View style={styles.footer}>
        <View style={styles.actionLeft}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={20} color={colors.slate} />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color={colors.slate} />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color={colors.slate} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Bookmark size={20} color={colors.slate} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: border.radiusCard,
    borderWidth: border.width,
    borderColor: colors.border,
    marginBottom: spacing.s,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mint,
    marginRight: spacing.s,
  },
  authorName: {
    fontFamily: fonts.sora.medium,
    fontSize: 13,
    color: colors.navy,
  },
  timeAgo: {
    fontFamily: fonts.dmSans.regular,
    fontSize: 10,
    color: colors.slate,
  },
  followButton: {
    fontFamily: fonts.sora.medium,
    fontSize: 12,
    color: colors.forest,
  },
  mediaContainer: {
    width: '100%',
    height: 250,
    backgroundColor: colors.navy,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: colors.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 4,
  },
  body: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: spacing.s,
  },
  tagContainer: {
    backgroundColor: colors.forest,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: spacing.s,
  },
  tagText: {
    fontFamily: fonts.dmSans.medium,
    fontSize: 10,
    color: colors.white,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 14,
    color: colors.navy,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
    paddingTop: spacing.xs,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.l,
  },
  actionText: {
    fontFamily: fonts.dmSans.medium,
    fontSize: 12,
    color: colors.slate,
    marginLeft: spacing.xs,
  },
});

export default NewsCard;
