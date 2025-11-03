import { pluginRemoveFeatures } from '@pandabox/panda-plugins';
import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

import { preset } from './src/theme';

export default defineConfig({
  eject: true,
  minify: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  outdir: 'src/styled-system',
  cssVarRoot: ':root',
  presets: [preset],
  jsxStyleProps: 'none',
  jsxFramework: 'react',
  globalCss: defineGlobalStyles({
    '& body': {
      bg: 'color-mix(in srgb, var(--colors-brand-primary-light) 5%, #fff)',
    },
  }),
  plugins: [
    pluginRemoveFeatures({
      features: ['no-jsx', 'no-styled'],
    }),
  ],
});
