import { defineRecipe } from '@pandacss/dev';

import { semanticColorVariants } from '../semanticTokens';

export const textSize = {
  'display-l': {
    fontSize: { mdDown: '3.6rem', mdToLgx: '4.5rem', lgx: '5.7rem' },
    lineHeight: { mdDown: '4.4rem', mdToLgx: '5.5rem', lgx: '6.9rem' },
    fontWeight: '600',
    letterSpacing: '0',
  },
  'display-m': {
    fontSize: { mdDown: '3.2rem', mdToLgx: '3.6rem', lgx: '4.5rem' },
    lineHeight: { mdDown: '4rem', mdToLgx: '4.4rem', lgx: '5.5rem' },
    fontWeight: '600',
    letterSpacing: '0',
  },
  'display-s': {
    fontSize: { mdDown: '2.8rem', mdToLgx: '3.2rem', lgx: '3.6rem' },
    lineHeight: { mdDown: '3.5rem', mdToLgx: '4rem', lgx: '4.4rem' },
    fontWeight: '600',
    letterSpacing: '0',
  },
  'headline-l': {
    fontSize: { mdDown: '2.4rem', mdToLgx: '2.8rem', lgx: '3.2rem' },
    lineHeight: { mdDown: '3rem', mdToLgx: '3.5rem', lgx: '4rem' },
    fontWeight: '600',
    letterSpacing: '0',
  },
  'title-l': {
    fontSize: '2.1rem',
    lineHeight: '2.7rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'title-m': {
    fontSize: '1.6rem',
    lineHeight: '1.9rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'title-s': {
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'body-xl-500': {
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    fontWeight: '500',
    letterSpacing: '0',
  },
  'body-xl-700': {
    fontSize: '1.8rem',
    lineHeight: '2.3rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'body-l-500': {
    fontSize: '1.6rem',
    lineHeight: '2.1rem',
    fontWeight: '500',
    letterSpacing: '0',
  },
  'body-l-700': {
    fontSize: '1.6rem',
    lineHeight: '2.1rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'body-m-500': {
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    fontWeight: '500',
    letterSpacing: '0',
  },
  'body-m-700': {
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'body-s-500': {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: '500',
    letterSpacing: '0',
  },
  'body-s-700': {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'button-l': {
    fontSize: '1.6rem',
    lineHeight: '2.1rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'button-m': {
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'button-s': {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: '700',
    letterSpacing: '0',
  },
  'label-l': {
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
    fontWeight: '600',
    letterSpacing: '0.08rem',
  },
  'label-m': {
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: '700',
    letterSpacing: '0.08rem',
  },
  'label-s': {
    fontSize: '1.1rem',
    lineHeight: '1.5rem',
    fontWeight: '700',
    letterSpacing: '0.08rem',
  },
};

export const textRecipe = defineRecipe({
  className: 'text',
  description: 'Text styles from AQ design system',
  jsx: ['Text', 'Link', 'Button'],
  base: {
    letterSpacing: '0',
    fontStyle: 'normal',
    textDecoration: 'none',
    fontFamily: 'Manrope',
  },
  variants: {
    textSize: textSize,
    textColor: semanticColorVariants,
  },
  defaultVariants: {
    textSize: 'body-l-500',
    textColor: 'on-surface',
  },
});
