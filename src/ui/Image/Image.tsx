import { css, cx } from '@/styled-system/css';
import { type ComponentProps, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const styles = {
  root: css.raw({
    display: 'flex',
    position: 'relative',
    w: '100%',
    h: 'auto',
    '&[data-show=true] img': {
      opacity: '1',
    },
  }),
  img: css({
    w: '100%',
    h: '100%',
    opacity: '0',
    transition: 'opacity 800ms 80ms ease',
    borderRadius: 'inherit',
    zIndex: '1',
    objectFit: 'cover',
  }),
  placeholder: css({
    position: 'absolute',
    top: '0',
    left: '0',
    w: '100%',
    h: '100%',
    pointerEvents: 'none',
    bg: 'surface-container-high',
    borderRadius: 'inherit',
    transition: 'opacity 400ms ease',
  }),
};

type Props = ComponentProps<'img'> & {
  wrapperStyles?: ReturnType<typeof css.raw>;
  lazy?: boolean;
  containerProps?: ComponentProps<'div'>;
};

export function Image({
  wrapperStyles,
  lazy = false,
  containerProps = {},
  ...props
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    initialInView: false,
    triggerOnce: true,
  });

  return (
    <div
      {...containerProps}
      className={cx('image-wrapper', css(styles.root, wrapperStyles))}
      ref={ref}
      data-show={(!lazy && isLoaded) || (lazy && isLoaded && inView)}
    >
      <div className={cx('img-placeholder', styles.placeholder)} />
      <img
        {...props}
        src={lazy && !inView ? undefined : props.src}
        className={cx(styles.img, props.className)}
        onLoad={() => setIsLoaded(true)}
        decoding="async"
      />
    </div>
  );
}
