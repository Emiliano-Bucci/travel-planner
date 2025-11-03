import { css, cx } from '@/styled-system/css';
import { Text } from '@/ui/Text';
import { type ComponentProps, type ReactNode } from 'react';

const styles = {
  input: css({
    boxSizing: 'border-box',
    all: 'unset',
    w: '100%',
    px: '12px',
    pt: '24px',
    pb: '8px',
    pl: '16px',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'neutral-500',
    bg: '#fff',
    color: 'neutral-800',
    cursor: 'text',
    fontWeight: '400',
    fontSize: '16px',
    transition: 'border-color 240ms ease, box-shadow 240ms ease',
    h: '56px',
    outline: 'none!',
    '&::placeholder': {
      color: 'neutral-500',
    },
    "[data-with-icon='true'] > &": {
      pl: '44px',
    },
    '&:hover:not([readonly]), &:focus:not([readonly])': {
      borderColor: 'neutral-500',
    },
    '&[data-has-error="true"]': {
      borderColor: 'Error!',
    },
    '&[readonly]': {
      cursor: 'default',
      outline: 'none!',
      bg: '#E9ECEF',
    },
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 2px token(colors.primary)',
    },
  }),
  label: css({
    position: 'absolute',
    color: 'neutral-500',
    fontSize: '12px',
    fontWeight: '400',
    left: '16px',
    top: '8px',
    lineHeight: '18px',
    transition: 'transform 240ms ease, font-size 240ms ease',
    "[data-with-icon='true'] > &": {
      left: '44px',
    },
    'input[data-with-placeholder="false"]:placeholder-shown:not(:focus) + &': {
      transform: 'translateY(11px)',
      fontSize: '14px',
    },
    'input[data-with-placeholder="true"]:placeholder-shown + &': {
      fontSize: '12px',
      transform: 'none',
    },
  }),
  icon: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '16px',
    w: '20px',
    h: '20px',
  }),
};

type Props = ComponentProps<'input'> & {
  label: string;
  icon?: ReactNode;
  errorMessage?: string;
};

export function Input({
  type = 'text',
  className,
  label,
  icon,
  placeholder,
  errorMessage,
  ...props
}: Props) {
  return (
    <label
      className={css({
        w: '100%',
        display: 'grid',
        gap: '4px',
        alignItems: 'start',
        alignContent: 'start',
        all: 'unset',
      })}
    >
      <div
        data-with-icon={!!icon}
        className={css({
          display: 'flex',
          w: '100%',
          position: 'relative',
        })}
      >
        {icon}
        <input
          {...props}
          type={type}
          placeholder={!placeholder ? ' ' : placeholder}
          className={cx(styles.input, className)}
          data-with-placeholder={!!placeholder}
          data-has-error={!!errorMessage}
        />
        <Text className={styles.label}>{label}</Text>
      </div>
      {errorMessage && (
        <Text
          textSize="body-s-500"
          className={css({
            ml: '16px',
            color: 'error',
          })}
        >
          {errorMessage}
        </Text>
      )}
    </label>
  );
}
