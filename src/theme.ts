import { createTheme } from '@mantine/core';

/**
 * Central Mantine theme. Tweak colors, fonts, radius, etc. here.
 * Docs: https://mantine.dev/theming/theme-object/
 *
 * Design intent: minimal, text-forward, sharp corners.
 */
export const theme = createTheme({
  // Neutral accent keeps the focus on content, not color.
  primaryColor: 'dark',
  // The `dark` palette runs light (0) → dark (9). Pick a shade per scheme so
  // outline buttons / anchors stay readable: dark text on light, light on dark.
  primaryShade: { light: 9, dark: 0 },
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '600',
  },
  // Square everything off by default.
  defaultRadius: 0,
});
