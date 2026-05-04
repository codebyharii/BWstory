import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { colors, typography, spacing, border } from '../../theme/theme';
import { useNavigation } from '../../context/NavigationContext';

const FOLLOWERS = [
  { id: '1', name: 'Priya Kapoor', username: '@priyakapoor', avatar: 'https://i.pravatar.cc/150?u=priya', isFollowing: true },
  { id: '2', name: 'Sunita Devi', username: '@sunitadevi', isFollowing: false },
  { id: '3', name: 'Ravi Kumar', username: '@ravikumar', avatar: 'https://i.pravatar.cc/150?u=ravi', isFollowing: true },
  { id: '4', name: 'Aishwarya Singh', username: '@aishsinghs', isFollowing: false },
];

export const FollowersScreen: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}><ChevronLeft size={22} color={colors.navy} /></TouchableOpacity>
        <Text style={styles.title}>Followers</Text>
        <View style={{ width: 22 }} />
      </View>
      <FlatList
        data={FOLLOWERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Avatar uri={item.avatar} initials={item.name.slice(0, 2)} size="md" />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <Button
              label={item.isFollowing ? 'Following' : 'Follow'}
              onPress={() => {}}
              size="sm"
              variant={item.isFollowing ? 'outline' : 'primary'}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    borderBottomWidth: border.width,
    borderBottomColor: colors.border,
  },
  title: { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.lg, color: colors.navy },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    gap: spacing.m,
  },
  info: { flex: 1 },
  name: { fontFamily: typography.fonts.sora.medium, fontSize: typography.sizes.base, color: colors.navy },
  username: { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.sm, color: colors.slate },
  separator: { height: border.width, backgroundColor: colors.border, marginHorizontal: spacing.screenPadding },
});
