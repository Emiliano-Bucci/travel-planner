import { css, cx } from '@/styled-system/css';
import { type TextVariantProps, text } from '@/styled-system/recipes';
import { type HTMLAttributes } from 'react';

type RecipeProps = {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'p'
    | 'label'
    | 'sub'
    | 'li';
};

export type TextProps = HTMLAttributes<HTMLElement> &
  RecipeProps &
  TextVariantProps & {
    isLoading?: boolean;
    styles?: ReturnType<typeof css.raw>;
  };

export function Text({
  children,
  styles: _styles,
  isLoading = false,
  as = 'p',
  textSize,
  textColor = 'on-surface',
  ...rest
}: Omit<TextProps, 'ref'>) {
  const classNames = cx(
    rest.className,
    css(_styles),
    text({ textSize, textColor }),
  );

  const attrs = {
    ...rest,
    'data-is-loading': isLoading,
  };

  switch (as) {
    default:
    case 'p': {
      return (
        <p {...attrs} className={classNames}>
          {children}
        </p>
      );
    }
    case 'span': {
      return (
        <span {...attrs} className={classNames}>
          {children}
        </span>
      );
    }
    case 'label': {
      return (
        <label {...attrs} className={classNames}>
          {children}
        </label>
      );
    }
    case 'li': {
      return (
        <li {...attrs} className={classNames}>
          {children}
        </li>
      );
    }
    case 'h1': {
      return (
        <h1 {...attrs} className={classNames}>
          {children}
        </h1>
      );
    }
    case 'h2': {
      return (
        <h2 {...attrs} className={classNames}>
          {children}
        </h2>
      );
    }
    case 'h3': {
      return (
        <h3 {...attrs} className={classNames}>
          {children}
        </h3>
      );
    }
    case 'h4': {
      return (
        <h4 {...attrs} className={classNames}>
          {children}
        </h4>
      );
    }
    case 'h5': {
      return (
        <h5 {...attrs} className={classNames}>
          {children}
        </h5>
      );
    }
    case 'h6': {
      return (
        <h6 {...attrs} className={classNames}>
          {children}
        </h6>
      );
    }
  }
}
