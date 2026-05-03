import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing } from '../../theme/theme';
import { NewsCard, NewsItem } from '../../components/feed/NewsCard';
import { SearchBar } from '../../components/feed/SearchBar';
import { AlignJustify } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

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
];

export const NewsFeedScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <AlignJustify size={22} color={colors.white} />
        </TouchableOpacity>
        <SearchBar value={search} onChangeText={setSearch} />
        <View style={styles.filterLines}>
          <View style={styles.fl} />
          <View style={[styles.fl, { width: 14 }]} />
          <View style={[styles.fl, { width: 10 }]} />
        </View>
      </View>

      {/* Feed */}
      <FlatList
        data={MOCK_NEWS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

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
  filterLines: { justifyContent: 'center', gap: 4 },
  fl: { height: 2, width: 20, backgroundColor: colors.white, borderRadius: 1 },
  list: {
    backgroundColor: colors.offWhite,
    padding: spacing.screenPadding,
    gap: spacing.cardGap,
  },
});
