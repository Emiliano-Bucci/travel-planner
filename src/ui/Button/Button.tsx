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
    isLoading?: boolean;
  };

export function Button({
  theme,
  className,
  leftIcon,
  rightIcon,
  children,
  size = 'button-m',
  btnType,
  isLoading,
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
      {isLoading && (
        <div
          className={cx(
            button({ theme, size, btnType, rounded }),
            css({
              position: 'absolute',
              inset: '0',
              borderRadius: 'inherit',
              w: '100%',
              h: '100%',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          )}
        >
          <div
            className={css({
              width: '18px',
              aspectRatio: '1',
              borderRadius: '50%',
              border: '3px solid lightblue',
              borderRightColor: 'neutral-200-dark',
              animation: 'button_loader_spinner 1s infinite linear',
            })}
          />
        </div>
      )}
    </button>
  );
}
