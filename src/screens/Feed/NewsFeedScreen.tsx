import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { colors, spacing, typography, border } from '../../theme/theme';
import { NewsCard, NewsItem } from '../../components/feed/NewsCard';
import { SearchBar } from '../../components/feed/SearchBar';
import { AlignJustify, SlidersHorizontal, X, Bookmark, Settings, LogOut, User } from 'lucide-react-native';
import { useScrollContext } from '../../context/ScrollContext';
import { useNavigation } from '../../context/NavigationContext';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    author: { name: 'Amit Saxena', avatar: 'https://i.pravatar.cc/150?u=amit', initials: 'AS' },
    timeAgo: '9 mins ago',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=700&q=80',
    headline: "Kerala journalist Siddique Kappan's mother passes away at 90...",
    excerpt: 'The journalist who was jailed for years has mourned the loss of his mother.',
    isBreaking: true,
    isLive: false,
    likes: 15200,
    comments: 320,
    readTime: '04:12',
  },
  {
    id: '2',
    author: { name: 'Nisha Gupta', avatar: 'https://i.pravatar.cc/150?u=nisha', initials: 'NG' },
    timeAgo: '22 mins ago',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=700&q=80',
    headline: 'India records highest single-day vaccination milestone',
    isBreaking: false,
    likes: 8900,
    comments: 145,
  },
  {
    id: '3',
    author: { name: 'Rahul Mehta', initials: 'RM' },
    timeAgo: '1 hr ago',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=700&q=80',
    headline: 'PM Modi addresses the nation on Independence Day',
    isBreaking: false,
    isLive: true,
    likes: 42000,
    comments: 1200,
    readTime: '22:40',
  },
  {
    id: '4',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya2', initials: 'PS' },
    timeAgo: '2 hrs ago',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=700&q=80',
    headline: 'Farmers protest enters 200th day — rain dampens spirits but not resolve',
    excerpt: 'Thousands of farmers continue to hold ground at Delhi borders despite heavy rain.',
    isBreaking: false,
    likes: 9200,
    comments: 430,
  },
];

const FILTER_CATEGORIES = ['All', 'Breaking', 'Politics', 'Sports', 'Tech', 'Health', 'Entertainment'];

// ─── Sidebar Drawer ───────────────────────────────────────────────────────────
function SideDrawer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { navigate } = useNavigation();

  const menuItems = [
    { label: 'My Profile',  Icon: User,     action: () => { navigate('Me');     onClose(); } },
    { label: 'Saved',       Icon: Bookmark, action: () => { onClose(); } },
    { label: 'Settings',    Icon: Settings, action: () => { onClose(); } },
    { label: 'Sign Out',    Icon: LogOut,   action: () => { onClose(); } },
  ];

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.drawerBackdrop} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={() => {}}>
          {/* Header */}
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>BWstory</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <X size={20} color={colors.slate} />
            </TouchableOpacity>
          </View>

          {/* Menu items */}
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.drawerItem}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <item.Icon size={20} color={colors.navy} />
              <Text style={styles.drawerItemLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Filter Sheet ─────────────────────────────────────────────────────────────
function FilterSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState('All');

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetBackdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filter Stories</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color={colors.slate} />
            </TouchableOpacity>
          </View>
          <Text style={styles.sheetSubtitle}>Category</Text>
          <View style={styles.chips}>
            {FILTER_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, selected === cat && styles.chipActive]}
                onPress={() => setSelected(cat)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipLabel, selected === cat && styles.chipLabelActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.applyBtnLabel}>Apply Filter</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Main Feed Screen ─────────────────────────────────────────────────────────
export const NewsFeedScreen: React.FC = () => {
  const [search, setSearch]         = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { onScroll }                = useScrollContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Hamburger — opens sidebar drawer */}
        <TouchableOpacity
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AlignJustify size={22} color={colors.white} />
        </TouchableOpacity>

        <SearchBar value={search} onChangeText={setSearch} />

        {/* Filter lines — opens filter sheet */}
        <TouchableOpacity
          onPress={() => setFilterOpen(true)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <SlidersHorizontal size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={MOCK_NEWS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Sidebar Drawer */}
      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Filter Bottom Sheet */}
      <FilterSheet visible={filterOpen} onClose={() => setFilterOpen(false)} />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.navy },
  topBar: {
    backgroundColor: colors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    gap: spacing.m,
  },
  list: {
    backgroundColor: colors.offWhite,
    padding: spacing.screenPadding,
    gap: spacing.cardGap,
  },

  // ── Sidebar Drawer ──────────────────────────────────────────────────────
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
  },
  drawer: {
    width: '72%',
    backgroundColor: colors.white,
    paddingTop: spacing.xxl * 2,
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  drawerTitle: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.xl,
    color: colors.navy,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    paddingVertical: spacing.m,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  drawerItemLabel: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.md,
    color: colors.navy,
  },

  // ── Filter Bottom Sheet ─────────────────────────────────────────────────
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xxl * 2,
    paddingTop: spacing.m,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.m,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  sheetTitle: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.lg,
    color: colors.navy,
  },
  sheetSubtitle: {
    fontFamily: typography.fonts.sora.medium,
    fontSize: typography.sizes.base,
    color: colors.slate,
    marginBottom: spacing.m,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
    marginBottom: spacing.xl,
  },
  chip: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs + 2,
    borderRadius: border.radiusPill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.offWhite,
  },
  chipActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  chipLabel: {
    fontFamily: typography.fonts.dmSans.medium,
    fontSize: typography.sizes.sm,
    color: colors.slate,
  },
  chipLabelActive: {
    color: colors.white,
  },
  applyBtn: {
    backgroundColor: colors.forest,
    borderRadius: border.radiusButton,
    paddingVertical: spacing.m,
    alignItems: 'center',
  },
  applyBtnLabel: {
    fontFamily: typography.fonts.sora.semiBold,
    fontSize: typography.sizes.base,
    color: colors.white,
  },
});
