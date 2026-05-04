import React, { memo, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList,
  TouchableOpacity, ListRenderItemInfo,
} from 'react-native';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing, border } from '../../theme/theme';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ActivityItem {
  id: string;
  user: string;
  avatar?: string;
  initials?: string;
  action: string;
  time: string;
  isUnread: boolean;
}

// Defined outside component — never recreated on re-render
const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', user: 'Sammy',  avatar: 'https://i.pravatar.cc/150?u=sammy',  action: 'started following you',    time: '9 mins ago',  isUnread: true  },
  { id: '2', user: 'Priya',  initials: 'PK',                               action: 'liked your story',          time: '22 mins ago', isUnread: true  },
  { id: '3', user: 'Rahul',  initials: 'RM',                               action: 'commented on your post',    time: '1 hr ago',    isUnread: false },
  { id: '4', user: 'Ayesha', avatar: 'https://i.pravatar.cc/150?u=ayesha', action: 'started following you',    time: '3 hrs ago',   isUnread: false },
  { id: '5', user: 'Vikram', initials: 'VK',                               action: 'shared your story',         time: '5 hrs ago',   isUnread: false },
];

const TABS = ['News Feed', 'Social'] as const;

// ─── Memoised Activity Row ────────────────────────────────────────────────────
const ActivityRow: React.FC<{ item: ActivityItem }> = memo(({ item }) => {
  const initials = item.initials ?? item.user.slice(0, 2);

  return (
    <View style={[styles.row, item.isUnread && styles.rowUnread]}>
      <View style={styles.avatarWrap}>
        <Avatar uri={item.avatar} initials={initials} size="sm" />
        {item.isUnread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.meta}>
        <Text style={styles.rowText} numberOfLines={2}>
          <Text style={styles.userName}>{item.user}</Text>
          {'  '}{item.action}
        </Text>
        <Text style={styles.rowTime}>{item.time}</Text>
      </View>
      <Button label="Follow" onPress={() => {}} size="sm" variant="outline" />
    </View>
  );
});

ActivityRow.displayName = 'ActivityRow';

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.offWhite },
  tabs:    { flexDirection: 'row', backgroundColor: colors.white, borderBottomWidth: border.width, borderBottomColor: colors.border },
  tab:     { flex: 1, paddingVertical: spacing.m, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.forest },
  tabText:   { fontFamily: typography.fonts.sora.medium, fontSize: typography.sizes.base, color: colors.slate },
  tabTextActive: { color: colors.navy },

  list:          { paddingVertical: spacing.m },
  sectionHeader: { paddingHorizontal: spacing.screenPadding, paddingVertical: spacing.s },
  sectionTitle:  { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.base, color: colors.navy },
  separator:     { height: 0.5, backgroundColor: colors.border, marginHorizontal: spacing.screenPadding },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    gap: spacing.m,
    backgroundColor: colors.white,
  },
  rowUnread: { backgroundColor: `${colors.mint}28` },

  avatarWrap: { position: 'relative' },
  unreadDot: {
    position: 'absolute', top: 0, right: 0,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.forest,
    borderWidth: 1.5, borderColor: colors.white,
  },

  meta:     { flex: 1, gap: 2 },
  rowText:  { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.base, color: colors.navy, lineHeight: typography.lineHeights.normal },
  userName: { fontFamily: typography.fonts.sora.semiBold },
  rowTime:  { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.xs, color: colors.slate },
});

// ─── List header — static element ─────────────────────────────────────────────
const ListHeader = (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Today</Text>
  </View>
);

// ─── keyExtractor outside component — stable function ref ─────────────────────
const keyExtractor = (item: ActivityItem) => item.id;

// ─── SocialFeedScreen ─────────────────────────────────────────────────────────
export const SocialFeedScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ActivityItem>) => <ActivityRow item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Tab switcher */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, i === activeTab && styles.tabActive]}
            onPress={() => setActiveTab(i)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, i === activeTab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity feed */}
      <FlatList
        data={MOCK_ACTIVITY}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        // Performance tuning
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};
