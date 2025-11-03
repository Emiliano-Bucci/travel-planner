import { css, cx } from '@/styled-system/css';
import {
  type ButtonVariantProps,
  type TextVariantProps,
  button,
  text,
} from '@/styled-system/recipes';
import { iconCVA, mobileCVA } from '@/ui/Button/common';
import { Icon, type IconMapping } from '@/ui/Icon';
import type { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router';

function getIconSize(textVariant: 'button-l' | 'button-m' | 'none') {
  return textVariant === 'button-l' ? 20 : 18;
}

type RouterLinkProps = ComponentProps<typeof RouterLink>;
type LinkProps = Omit<RouterLinkProps, 'className'> &
  ButtonVariantProps & {
    className?: string;
    leftIcon?: IconMapping;
    rightIcon?: IconMapping;
    textSize?: TextVariantProps['textSize'];
    renderMobileSurface?: boolean;
  };

export function Link({
  theme = 'none',
  className,
  leftIcon,
  rightIcon,
  children,
  size = 'button-m',
  btnType,
  rounded,
  textSize = 'button-s',
  renderMobileSurface = true,
  ...props
}: LinkProps) {
  const iconSize = getIconSize(size);
  const prevIconStyles = iconCVA({ position: 'prev', size });
  const nextIconStyles = iconCVA({ position: 'next', size });

  return (
    <RouterLink
      {...props}
      className={cx(
        text({ textSize }),
        button({ theme, size, btnType, rounded }),
        css({
          maxH: '100%',
        }),
        className,
      )}
    >
      {renderMobileSurface && <div className={mobileCVA({ size, btnType })} />}
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
    </RouterLink>
  );
}
