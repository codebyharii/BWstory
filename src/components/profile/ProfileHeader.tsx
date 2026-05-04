import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Settings } from 'lucide-react-native';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { colors, typography, spacing } from '../../theme/theme';

interface ProfileHeaderProps {
  name: string;
  location?: string;
  profession?: string;
  bio?: string;
  coverImage?: string;
  avatarUri?: string;
  isOwn?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onEdit?: () => void;
  onSettings?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = memo(({
  name, location, profession, bio, coverImage, avatarUri,
  isOwn = false, isFollowing = false, onFollow, onEdit, onSettings,
}) => {
  // Pre-slice initials once
  const initials = name.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* ── Cover ──────────────────────────────────────────────────────── */}
      <View style={styles.cover}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} fadeDuration={200} />
        ) : (
          // Two-tone gradient via stacked views (no LinearGradient dependency)
          <>
            <View style={styles.coverBase} />
            <View style={styles.coverAccent} />
          </>
        )}
        {isOwn && (
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={onSettings}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Settings size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Avatar + action row ─────────────────────────────────────────── */}
      <View style={styles.avatarRow}>
        <View style={styles.avatarRing}>
          <Avatar uri={avatarUri} initials={initials} size="xl" />
        </View>
        <View>
          {isOwn ? (
            <Button label="Edit Profile" onPress={onEdit ?? (() => {})} variant="outline" size="sm" />
          ) : (
            <Button
              label={isFollowing ? 'Following' : 'Follow'}
              onPress={onFollow ?? (() => {})}
              variant={isFollowing ? 'outline' : 'primary'}
              size="sm"
            />
          )}
        </View>
      </View>

      {/* ── Info ────────────────────────────────────────────────────────── */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {profession && <Text style={styles.profession}>{profession}</Text>}
        {location && (
          <View style={styles.locationRow}>
            <MapPin size={12} color={colors.slate} />
            <Text style={styles.location}>{location}</Text>
          </View>
        )}
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>
    </View>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white },

  cover:        { height: 140, overflow: 'hidden', position: 'relative' },
  coverBase:    { ...StyleSheet.absoluteFillObject, backgroundColor: colors.navy },
  // Diagonal accent that simulates a gradient
  coverAccent:  { position: 'absolute', bottom: 0, right: 0, width: '55%', height: '100%', backgroundColor: colors.forest, opacity: 0.28, borderTopLeftRadius: 140 },
  coverImage:   { width: '100%', height: '100%', resizeMode: 'cover' },
  settingsBtn:  { position: 'absolute', top: spacing.m, right: spacing.m },

  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.screenPadding,
    marginTop: -48,
    marginBottom: spacing.s,
  },
  avatarRing: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },

  info:         { paddingHorizontal: spacing.screenPadding, paddingBottom: spacing.m, gap: 5 },
  name:         { fontFamily: typography.fonts.sora.semiBold, fontSize: typography.sizes.xl, color: colors.navy },
  profession:   { fontFamily: typography.fonts.dmSans.medium, fontSize: typography.sizes.md, color: colors.navy },
  locationRow:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location:     { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.sm, color: colors.slate },
  bio:          { fontFamily: typography.fonts.dmSans.regular, fontSize: typography.sizes.base, color: colors.slate, lineHeight: typography.lineHeights.normal, marginTop: 2 },
});
