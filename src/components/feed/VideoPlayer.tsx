import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react-native';
import { colors, spacing, border } from '../../theme/theme';

interface VideoPlayerProps {
  isPlaying?: boolean;
  isMuted?: boolean;
  onPlayPause?: () => void;
  onMuteToggle?: () => void;
  onFullScreen?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isPlaying = false,
  isMuted = false,
  onPlayPause,
  onMuteToggle,
  onFullScreen,
}) => {
  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {/* Center play/pause */}
      <TouchableOpacity style={styles.centerBtn} onPress={onPlayPause} activeOpacity={0.8}>
        {isPlaying ? (
          <Pause size={26} color={colors.white} fill={colors.white} />
        ) : (
          <Play size={26} color={colors.white} fill={colors.white} />
        )}
      </TouchableOpacity>

      {/* Bottom controls */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={onMuteToggle} style={styles.controlBtn}>
          {isMuted ? (
            <VolumeX size={18} color={colors.white} />
          ) : (
            <Volume2 size={18} color={colors.white} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onFullScreen} style={styles.controlBtn}>
          <Maximize size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: spacing.m,
    right: spacing.m,
    flexDirection: 'row',
    gap: spacing.s,
  },
  controlBtn: {
    width: 32,
    height: 32,
    borderRadius: border.radiusCard,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
