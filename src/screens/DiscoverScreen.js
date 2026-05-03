import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, border } from '../theme/theme';
import NewsCard from '../components/NewsCard';
import { Search, Grid } from 'lucide-react-native';

const dummyData = [
  {
    id: '1',
    author: {
      name: 'Amit saxena',
      avatar: 'https://i.pravatar.cc/150?u=amit',
    },
    timeAgo: '9 mins ago',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    headline: 'Kerala journalist Siddique Kappan\'s mother passes away at 90...',
    isBreaking: true,
    likes: '15k',
    comments: '120',
  },
  {
    id: '2',
    author: {
      name: 'Nisha gupta',
      avatar: 'https://i.pravatar.cc/150?u=nisha',
    },
    timeAgo: '15 mins ago',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=600&q=80',
    headline: 'Global markets hit record highs amidst tech rally',
    isBreaking: false,
    likes: '2.3k',
    comments: '45',
  },
];

const DiscoverScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Grid size={24} color={colors.white} style={styles.menuIcon} />
          <View style={styles.searchContainer}>
            <Search size={16} color={colors.slate} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search" 
              placeholderTextColor={colors.slate} 
            />
          </View>
          <TouchableOpacity>
            <View style={styles.filterIconContainer}>
               {/* Filter lines mock */}
               <View style={styles.filterLine} />
               <View style={[styles.filterLine, { width: 12 }]} />
               <View style={[styles.filterLine, { width: 8 }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Feed */}
        <FlatList
          data={dummyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NewsCard item={item} />}
          contentContainerStyle={styles.feedContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  header: {
    backgroundColor: colors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
  },
  menuIcon: {
    marginRight: spacing.m,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: border.radiusButton,
    paddingHorizontal: spacing.m,
    height: 36,
    marginRight: spacing.m,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.dmSans.regular,
    fontSize: 14,
    color: colors.navy,
  },
  filterIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  filterLine: {
    height: 2,
    backgroundColor: colors.white,
    width: 16,
    marginBottom: 4,
    borderRadius: 1,
  },
  feedContainer: {
    padding: spacing.screenPadding,
    paddingTop: spacing.m,
  },
});

export default DiscoverScreen;
