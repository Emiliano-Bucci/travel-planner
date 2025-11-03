import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'Button styles from AQ design system',
  jsx: ['Button', 'Link'],
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: '0',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      pointerEvents: 'none',
      zIndex: '-2',
      position: 'absolute',
      inset: '0',
      w: '100%',
      borderRadius: 'inherit',
      bg: 'var(--primary-bg)',
    },
    '&::after': {
      content: '""',
      pointerEvents: 'none',
      zIndex: '-1',
      position: 'absolute',
      inset: '0',
      w: '100%',
      borderRadius: 'inherit',
      transition: 'opacity 200ms ease',
      bg: 'var(--hover-bg)',
      opacity: '0',
    },
    '&:hover:not([disabled])': {
      _after: {
        opacity: '1',
      },
    },
  },
  variants: {
    theme: {
      primary: {
        '--primary-bg': 'token(colors.button-primary)',
        '--hover-bg': 'token(colors.button-primary-hover)',
        color: 'neutral-50',
        _disabled: {
          '--primary-bg': 'colors.button-primary-hover',
          color: 'button-primary-hover',
          cursor: 'not-allowed',
        },
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'primary',
          outlineOffset: '2px',
        },
      },
      outlined: {
        '--primary-bg': 'transparent',
        '--hover-bg': 'token(colors.neutral-200)',
        color: 'button-primary',
        border: '1px solid token(colors.button-primary)',
        _disabled: {
          color: 'button-primary-disabled',
          cursor: 'not-allowed',
        },
        _focusVisible: {
          outline: '2px solid',
          outlineColor: 'primary',
          outlineOffset: '2px',
        },
      },
    },
    size: {
      none: {},
      'button-m': {
        p: '8px 16px',
        maxH: '32px',
      },
    },
    btnType: {
      default: {},
      icon: {
        p: '0px',
        borderRadius: '50%',
      },
    },
    rounded: {
      none: { borderRadius: '0px' },
      default: {
        borderRadius: '10px',
      },
    },
  },
  compoundVariants: [
    {
      btnType: 'icon',
      size: 'button-m',
      css: {
        w: '32px',
        h: '32px',
      },
    },
  ],
  defaultVariants: {
    theme: 'primary',
    rounded: 'default',
  },
});
