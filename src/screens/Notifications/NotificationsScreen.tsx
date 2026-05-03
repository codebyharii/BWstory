import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { Avatar } from '../../components/common/Avatar';
import { colors, typography, spacing, border } from '../../theme/theme';

const TABS = ['News Feed', 'Social'];

const MOCK_NOTIFICATIONS = [
  { id: '1', group: 'Today', user: 'Sammy', action: 'started following you', time: '2 mins ago', isUnread: true, avatar: 'https://i.pravatar.cc/150?u=sammy2' },
  { id: '2', group: 'Today', user: 'Priya', action: 'liked your story', time: '9 mins ago', isUnread: true },
  { id: '3', group: 'This Week', user: 'Rahul', action: 'commented: "We wanted this!!"', time: '3 hrs ago', isUnread: false, avatar: 'https://i.pravatar.cc/150?u=rahul2' },
  { id: '4', group: 'This Week', user: 'Ayesha', action: 'started following you', time: '1 day ago', isUnread: false },
];

export const NotificationsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const groups = [...new Set(MOCK_NOTIFICATIONS.map((n) => n.group))];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, i === activeTab && styles.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[styles.tabText, i === activeTab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications */}
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const showHeader = index === 0 || MOCK_NOTIFICATIONS[index - 1].group !== item.group;
          return (
            <>
              {showHeader && (
                <View style={styles.groupHeader}>
                  <Text style={styles.groupLabel}>{item.group}</Text>
                </View>
              )}
              <View style={[styles.row, item.isUnread && styles.rowUnread]}>
                <View style={styles.avatarWrap}>
                  <Avatar uri={item.avatar} initials={item.user.slice(0, 2)} size="sm" showBadge={item.isUnread} />
                </View>
                <View style={styles.meta}>
                  <Text style={styles.notifText}>
                    <Text style={styles.userName}>{item.user}</Text>{' '}{item.action}
                  </Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            </>
          );
        }}
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
  tabText: { fontFamily: typography.fonts.sora.medium, fontSize: typography.sizes.base, color: colors.slate },
  tabTextActive: { color: colors.navy },
  groupHeader: { paddingHorizontal: spacing.screenPadding, paddingVertical: spacing.s, backgroundColor: colors.offWhite },
  groupLabel: { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.sm, color: colors.navy },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
    gap: spacing.m,
  },
  rowUnread: { backgroundColor: colors.mint + '40' },
  avatarWrap: {},
  meta: { flex: 1, gap: 2 },
  notifText: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.base, color: colors.navy, lineHeight: typography.lineHeights.normal },
  userName: { fontFamily: typography.fonts.sora.semiBold },
  time: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.xs, color: colors.slate },
});
