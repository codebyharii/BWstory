import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { StatsRow } from '../../components/profile/StatsRow';
import { PostGrid } from '../../components/profile/PostGrid';
import { colors } from '../../theme/theme';

const POSTS = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', type: 'image' as const },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', type: 'video' as const },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', type: 'image' as const },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', type: 'video' as const },
  { id: '5', thumbnail: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=400&q=80', type: 'image' as const },
  { id: '6', thumbnail: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?auto=format&fit=crop&w=400&q=80', type: 'image' as const },
];

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name="Neha Sharma"
          location="Greater Noida"
          profession="Anchor | News Creator"
          bio="Telling stories that matter. Fast and local news from around India 🇮🇳"
          isOwn
        />
        <StatsRow
          stats={[
            { label: 'Posts', value: 15 },
            { label: 'Followers', value: 85000 },
            { label: 'Following', value: 12000 },
          ]}
        />
        <PostGrid posts={POSTS} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.offWhite },
  scroll: { flex: 1 },
});
