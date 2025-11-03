import { css, cx } from '@/styled-system/css';
import {
  type ButtonVariantProps,
  type TextVariantProps,
  button,
  text,
} from '@/styled-system/recipes';
import type { ComponentProps, ReactNode } from 'react';

import { iconCVA } from './common';

type ButtonProps = ComponentProps<'button'> &
  ButtonVariantProps & {
    className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    textSize?: TextVariantProps['textSize'];
    as?: 'button' | 'div';
  };

export function Button({
  theme,
  className,
  leftIcon,
  rightIcon,
  children,
  size = 'button-m',
  btnType,
  rounded,
  textSize = 'button-m',
  as = 'button',
  ...props
}: ButtonProps) {
  const prevIconStyles = iconCVA({ position: 'prev', size });
  const nextIconStyles = iconCVA({ position: 'next', size });

  const mergedProps = {
    ...props,
    className: cx(
      text({ textSize }),
      button({ theme, size, btnType, rounded }),
      className,
      as === 'div' &&
        css({
          cursor: 'default',
        }),
    ),
  };

  return (
    <button {...mergedProps}>
      {leftIcon && <div className={prevIconStyles.root}>{leftIcon}</div>}
      {children}
      {rightIcon && <div className={nextIconStyles.root}>{rightIcon}</div>}
    </button>
  );
}
