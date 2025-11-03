import { css, cx } from '@/styled-system/css';
import {
  type ButtonVariantProps,
  type TextVariantProps,
  button,
  text,
} from '@/styled-system/recipes';
import { Icon, type IconMapping } from '@/ui/Icon';
import type { ComponentProps } from 'react';

import { iconCVA, mobileCVA } from './common';

function getIconSize(textVariant: 'button-l' | 'button-m' | 'none') {
  return textVariant === 'button-l' ? 20 : 18;
}

type ButtonProps = ComponentProps<'button'> &
  ButtonVariantProps & {
    className?: string;
    leftIcon?: IconMapping;
    rightIcon?: IconMapping;
    textSize?: TextVariantProps['textSize'];
    as?: 'button' | 'div';
  };

export function Button({
  theme,
  className,
  leftIcon,
  rightIcon,
  children,
  size = 'button-l',
  btnType,
  rounded,
  textSize = 'button-m',
  as = 'button',
  ...props
}: ButtonProps) {
  const iconSize = getIconSize(size);
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

  const contentFragment = (
    <>
      <div className={mobileCVA({ size, btnType })} />
      {leftIcon && (
        <div className={prevIconStyles.root}>
          <Icon type={leftIcon} width={iconSize} height={iconSize} />
        </div>
      )}
      {children}
      {rightIcon && (
        <div className={nextIconStyles.root}>
          <Icon type={rightIcon} width={iconSize} height={iconSize} />
        </div>
      )}
    </>
  );

  if (as === 'div') {
    // @ts-expect-error - mergedProps is valid for the div component
    return <div {...mergedProps}>{contentFragment}</div>;
  }

  return <button {...mergedProps}>{contentFragment}</button>;
}
