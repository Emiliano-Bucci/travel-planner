import { cva, sva } from '@/styled-system/css';

const iconCVA = sva({
  slots: ['root', 'icon'],
  base: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  variants: {
    size: {
      'button-l': {},
      'button-m': {},
      none: {},
    },
    position: {
      prev: {},
      next: {},
    },
  },
  compoundVariants: [
    {
      size: 'button-l',
      position: 'prev',
      css: {
        root: {
          ml: '-8px',
          mr: '8px',
        },
      },
    },
    {
      size: 'button-l',
      position: 'next',
      css: {
        root: {
          ml: '8px',
          mr: '-8px',
        },
      },
    },
    {
      size: 'button-m',
      position: 'prev',
      css: {
        root: {
          ml: '-4px',
          mr: '4px',
        },
      },
    },
    {
      size: 'button-m',
      position: 'next',
      css: {
        root: {
          ml: '4px',
          mr: '-4px',
        },
      },
    },
  ],
});
const mobileCVA = cva({
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    w: '100%',
    h: 'calc(100% + 8px)',
    zIndex: '-5',
  },
  variants: {
    size: {
      'button-l': {
        display: 'none',
      },
      'button-m': {
        h: 'calc(100% + 12px)',
      },
      none: {},
    },
    btnType: {
      default: {},
      icon: {
        display: 'flex',
        w: '44px',
        h: '44px',
        borderRadius: '50%',
      },
    },
  },
});

export { iconCVA, mobileCVA };
