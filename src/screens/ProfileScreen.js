import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { colors, fonts, spacing, border } from '../theme/theme';
import { Settings, ChevronLeft, Search } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const dummyPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { id: '2', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: '3', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { id: '4', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
];

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header / Cover */}
        <View style={styles.header}>
          <View style={styles.topBar}>
            <TouchableOpacity>
              <ChevronLeft size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Settings size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>NS</Text>
            </View>
          </View>
          
          <View style={styles.nameRow}>
            <View>
              <Text style={styles.name}>Neha Sharma</Text>
              <Text style={styles.location}>Greater Noida</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profession}>Anchor</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12k</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Tabs section */}
        <View style={styles.tabsContainer}>
           <View style={styles.tabBar}>
              <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
                 <Text style={[styles.tabText, styles.activeTabText]}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                 <Text style={styles.tabText}>Following</Text>
              </TouchableOpacity>
           </View>

           {/* Search in followers */}
           <View style={styles.searchBox}>
              <Search size={16} color={colors.slate} style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>Search</Text>
           </View>
        </View>

        {/* Post Grid (Assuming we show posts or followers here, adjusting to match a general profile view) */}
        <View style={styles.gridContainer}>
          {dummyPosts.map((post) => (
            <Image key={post.id} source={{ uri: post.image }} style={styles.gridImage} />
          ))}
        </View>

      </ScrollView>
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
    height: 120,
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.l,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    marginTop: -40,
    marginBottom: spacing.m,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mint,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  avatarInitials: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 24,
    color: colors.forest,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  name: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 18,
    color: colors.navy,
    marginBottom: 2,
  },
  location: {
    fontFamily: fonts.dmSans.regular,
    fontSize: 12,
    color: colors.slate,
  },
  profession: {
    fontFamily: fonts.dmSans.medium,
    fontSize: 14,
    color: colors.navy,
    marginBottom: spacing.l,
  },
  editButton: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: border.radiusButton,
  },
  editButtonText: {
    fontFamily: fonts.sora.medium,
    fontSize: 12,
    color: colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.m,
    borderTopWidth: border.width,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.navy,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fonts.dmSans.regular,
    fontSize: 12,
    color: colors.slate,
  },
  tabsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  tabItem: {
    flex: 1,
    paddingVertical: spacing.m,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.forest,
  },
  tabText: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.slate,
  },
  activeTabText: {
    color: colors.navy,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    borderRadius: border.radiusCard,
    paddingHorizontal: spacing.m,
    height: 40,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchPlaceholder: {
    fontFamily: fonts.dmSans.regular,
    fontSize: 14,
    color: colors.slate,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  gridImage: {
    width: (width / 2) - 4,
    height: (width / 2) - 4,
    margin: 2,
    borderRadius: 8,
  },
});

export default ProfileScreen;
