import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Share2 } from 'lucide-react-native';
import { ActionBar } from '../../components/feed/ActionBar';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { colors, typography, spacing, border } from '../../theme/theme';

export const NewsDetailScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <TouchableOpacity style={styles.backBtn}>
              <ChevronLeft size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Share2 size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <Badge label="Breaking" variant="breaking" />
          <Text style={styles.headline}>
            Kerala journalist Siddique Kappan's mother passes away at 90 years old
          </Text>
          <View style={styles.authorRow}>
            <Avatar initials="AS" size="sm" />
            <View>
              <Text style={styles.authorName}>Amit Saxena</Text>
              <Text style={styles.timeAgo}>9 mins ago • 3 min read</Text>
            </View>
          </View>
          <Text style={styles.content}>
            The family of journalist Siddique Kappan mourns the passing of his 90-year-old mother.
            Kappan, who was arrested in 2020 while on his way to Hathras, was finally released after years
            in custody, but could not be present at her side in her final days due to legal restrictions.
            {'\n\n'}
            His case sparked widespread debate about press freedom, detention conditions, and the treatment
            of journalists in India. Human rights organizations have continuously called for his release
            and for justice in his name.
          </Text>
        </View>

        <ActionBar likes={15200} comments={320} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  hero: { height: 280, backgroundColor: colors.navy, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.m,
    paddingTop: spacing.l,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  shareBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: spacing.screenPadding * 1.5, gap: spacing.m },
  headline: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.xl,
    color: colors.navy,
    lineHeight: typography.lineHeights.relaxed,
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.s },
  authorName: { fontFamily: typography.fonts.sora.medium, fontSize: typography.sizes.base, color: colors.navy },
  timeAgo: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.xs, color: colors.slate },
  content: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.md,
    color: colors.navy,
    lineHeight: typography.lineHeights.relaxed,
  },
});
