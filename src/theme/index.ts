import { definePreset } from '@pandacss/dev';
import pandaBasePreset from '@pandacss/preset-base';

import { colors } from './colors';
import { buttonRecipe } from './components/button';
import { textRecipe } from './components/text';
import { semanticTokens } from './semanticTokens';

export const breakpoints = {
  xxs: '340px',
  xsm: '360px',
  xs: '600px',
  md: '768px',
  lg: '1024px',
  lgx: '1280px',
  lgxx: '1440px',
  xl: '1600px',
};

export const preset = definePreset({
  name: '@/AQ',
  utilities: pandaBasePreset.utilities,
  conditions: {
    ...pandaBasePreset.conditions,
    light: '[data-color-mode="light"] &',
    dark: '[data-color-mode="dark"] &',
  },
  patterns: {
    iconRoot: {
      description: 'Container for icons',
      properties: {
        size: {
          type: 'string',
        },
      },
      defaultValues: {
        size: '20px',
      },
      transform(props) {
        const { size, ...rest } = props;
        return {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...rest,
          w: size,
          h: size,
        };
      },
    },
    responsiveRoot: {
      description: 'Container for responsive root',
      properties: {},
      defaultValues: {},
      transform(props) {
        return {
          mx: 'auto',
          w: 'min(1024px, calc(100% - 24px))',
          ...props,
        };
      },
    },
  },
  theme: {
    recipes: {
      button: buttonRecipe,
      text: textRecipe,
    },
    tokens: {
      colors,
    },
    semanticTokens: {
      colors: semanticTokens,
    },
    breakpoints,
  },
});
