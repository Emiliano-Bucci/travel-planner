/**
 * Semantic color tokens - single source of truth
 * These are used in both the Panda preset and to derive recipe variants
 */
export const semanticTokens = {
  // Brand colors
  'brand-primary': {
    value: {
      _light: '{colors.brand-primary-light}',
      _dark: '{colors.brand-primary-dark}',
    },
  },
  'brand-secondary': {
    value: {
      _light: '{colors.brand-secondary-light}',
      _dark: '{colors.brand-secondary-dark}',
    },
  },
  accent: {
    value: {
      _light: '{colors.accent-light}',
      _dark: '{colors.accent-dark}',
    },
  },
  highlight: {
    value: {
      _light: '{colors.highlight-light}',
      _dark: '{colors.highlight-dark}',
    },
  },

  // Neutral colors
  'neutral-50': {
    value: {
      _light: '{colors.neutral-50-light}',
      _dark: '{colors.neutral-50-dark}',
    },
  },
  'neutral-200': {
    value: {
      _light: '{colors.neutral-200-light}',
      _dark: '{colors.neutral-200-dark}',
    },
  },
  'neutral-400': {
    value: {
      _light: '{colors.neutral-400-light}',
      _dark: '{colors.neutral-400-dark}',
    },
  },
  'neutral-500': {
    value: {
      _light: '{colors.neutral-500-light}',
      _dark: '{colors.neutral-500-dark}',
    },
  },
  'neutral-800': {
    value: {
      _light: '{colors.neutral-800-light}',
      _dark: '{colors.neutral-800-dark}',
    },
  },
  'neutral-900': {
    value: {
      _light: '{colors.neutral-900-light}',
      _dark: '{colors.neutral-900-dark}',
    },
  },

  // Background colors
  background: {
    value: {
      _light: '{colors.bg-light}',
      _dark: '{colors.bg-dark}',
    },
  },
  text: {
    value: {
      _light: '{colors.text-light}',
      _dark: '{colors.text-dark}',
    },
  },

  // Button colors
  'button-primary': {
    value: {
      _light: '{colors.button-primary-light}',
      _dark: '{colors.button-primary-dark}',
    },
  },
  'button-primary-hover': {
    value: {
      _light: '{colors.button-primary-hover-light}',
      _dark: '{colors.button-primary-hover-dark}',
    },
  },
} as const;

/**
 * Derives color variants for recipes from semantic tokens
 * This ensures recipes stay in sync with semantic tokens
 */
export const semanticColorVariants = Object.keys(semanticTokens).reduce<
  Record<string, { color: string }>
>((acc, key) => {
  acc[key] = { color: key };
  return acc;
}, {}) as Record<keyof typeof semanticTokens, { color: string }>;
