import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/feed/SearchBar';
import { colors, typography, spacing, border } from '../../theme/theme';

const MOCK_ACTIVITY = [
  { id: '1', user: 'Sammy', avatar: 'https://i.pravatar.cc/150?u=sammy', action: 'started following you', time: '9 mins ago', isUnread: true },
  { id: '2', user: 'Priya', initials: 'PK', action: 'liked your story', time: '22 mins ago', isUnread: true },
  { id: '3', user: 'Rahul', initials: 'RM', action: 'commented on your post', time: '1 hr ago', isUnread: false },
  { id: '4', user: 'Ayesha', avatar: 'https://i.pravatar.cc/150?u=ayesha', action: 'started following you', time: '3 hrs ago', isUnread: false },
];

const TABS = ['News Feed', 'Social'];

export const SocialFeedScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top Tab Switcher */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, i === activeTab && styles.tabActive]}
            onPress={() => setActiveTab(i)}
          >
            <Text style={[styles.tabText, i === activeTab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity List */}
      <FlatList
        data={MOCK_ACTIVITY}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.activityItem, item.isUnread && styles.activityUnread]}>
            <View style={styles.activityLeft}>
              <Avatar uri={item.avatar} initials={item.initials || item.user.slice(0, 2)} size="sm" />
              {item.isUnread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.activityMeta}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>{item.user}</Text>
                {' '}{item.action}
              </Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
            <Button label="Follow" onPress={() => {}} size="sm" variant="outline" />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.m,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: colors.forest },
  tabText: {
    fontFamily: typography.fonts.sora.medium,
    fontSize: typography.sizes.base,
    color: colors.slate,
  },
  tabTextActive: { color: colors.navy },
  list: { paddingVertical: spacing.m },
  sectionHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.s,
  },
  sectionTitle: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.base,
    color: colors.navy,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    gap: spacing.m,
  },
  activityUnread: { backgroundColor: colors.mint + '30' },
  activityLeft: { position: 'relative' },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.forest,
    borderWidth: 1,
    borderColor: colors.white,
  },
  activityMeta: { flex: 1, gap: 2 },
  activityText: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.base,
    color: colors.navy,
    lineHeight: typography.lineHeights.normal,
  },
  activityUser: { fontFamily: typography.fonts.sora.semiBold },
  activityTime: {
    fontFamily: typography.fonts.dmSans.regular,
    fontSize: typography.sizes.xs,
    color: colors.slate,
  },
});
