export const colors = {
  // Brand
  navy: '#1B2533',
  forest: '#1A7A55',
  mint: '#D4EDE2',
  offWhite: '#F7F9F8',
  slate: '#9AA8AE',
  border: '#E5EDED',
  white: '#FFFFFF',
  black: '#000000',

  // Semantic
  error: '#E53935',
  success: '#1A7A55',
  warning: '#F9A825',
  info: '#1565C0',

  // Overlays
  overlayDark: 'rgba(27, 37, 51, 0.6)',
  overlayLight: 'rgba(255, 255, 255, 0.15)',
} as const;

export type ColorKey = keyof typeof colors;
