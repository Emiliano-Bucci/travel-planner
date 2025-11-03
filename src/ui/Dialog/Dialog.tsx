import { css } from '@/styled-system/css';
import {
  type UseSpringProps,
  a,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web';
import * as dialog from '@zag-js/dialog';
import { Portal, normalizeProps, useMachine } from '@zag-js/react';
import {
  type ComponentRef,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

const OpenedDialogs = new Set<string>();

const styles = {
  root: css.raw({
    position: 'fixed',
    top: '0',
    left: '0',
    w: '100%',
    h: '100%',
    display: 'flex',
    overflow: 'hidden',
    zIndex: '1000',
    justifyContent: 'center',
    alignItems: 'center',
    p: {
      mdDown: '16px',
      md: '24px',
    },
  }),
  backdrop: css.raw({
    position: 'absolute',
    top: '0',
    left: '0',
    w: '100%',
    h: '100%',
    bg: 'rgba(0,0,0,0.5)',
  }),
  dialog: {
    root: css.raw({
      display: 'flex',
      zIndex: '10',
      bg: '#fff',
      flexDir: 'column',
      overflowY: 'auto',
      borderRadius: { md: '24px' },
      maxH: { mdDown: '100%', md: '672px' },
      maxW: { md: '560px' },
      m: '0px',
      w: '100%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }),
    dialog: css.raw({
      display: 'flex',
      flexDir: 'column',
      flex: '1',
    }),
  },
};

export type Props = {
  isOpen: boolean;
  children: ReactNode;
  containerStyles?: ReturnType<typeof css.raw>;
  keepMounted?: boolean;
  wrapperStyles?: ReturnType<typeof css.raw>;
  styles?: ReturnType<typeof css.raw>;
  springConfig?: UseSpringProps['config'];
  dataComponent?: string;
  ariaLabel: string;
  backdropStyles?: ReturnType<typeof css.raw>;
  onClose(): void;
  onClosed?(): void;
  onOpened?(): void;
  getInitialFocusElement?(): HTMLElement | null;
  animation?: {
    from: {
      [key: string]: number | string;
    };
    to: {
      [key: string]: number | string;
    };
  };
};

export function Dialog({
  isOpen,
  children,
  onClose: _onClose,
  containerStyles,
  keepMounted = false,
  wrapperStyles,
  styles: _styles,
  getInitialFocusElement,
  backdropStyles,
  onClosed,
  onOpened,
  dataComponent,
  ariaLabel = '',
  animation,
}: Props) {
  const springAnimation = animation || {
    from: {
      scale: 0.94,
    },
    to: {
      scale: 1,
    },
  };
  const uniqueId = useId();
  const [isMounted, setIsMounted] = useState(keepMounted);

  const service = useMachine(dialog.machine, {
    id: uniqueId,
    restoreFocus: false,
    open: isOpen,
    modal: true,
    initialFocusEl: getInitialFocusElement,
    onOpenChange(v) {
      if (!v.open) {
        onClose();
      }
    },
  });

  const containerRef = useRef<ComponentRef<'div'>>(null);

  const api = dialog.connect(service, normalizeProps);
  const isOpened = api.open;

  const [backdropSpring] = useSpring(
    () => ({
      opacity: isOpened ? 1 : 0,
    }),
    [isOpened],
  );
  const [spring, set] = useSpring(
    () => ({
      ...springAnimation.to,
    }),
    [isOpened],
  );

  function onClose() {
    _onClose();
  }

  useIsomorphicLayoutEffect(() => {
    if (isOpened && !isMounted) {
      setIsMounted(true);
    }
  }, [isOpened]);
  useEffect(() => {
    if (isOpened && isMounted) {
      set.start({
        from: springAnimation.from,
        to: springAnimation.to,
        onRest: ({ finished }) => {
          if (finished && onOpened) {
            onOpened();
          }
        },
      });
    }
    if (!isOpened && isMounted) {
      set.start({
        ...springAnimation.from,
        onRest({ finished }) {
          if (finished) {
            set.start({
              ...springAnimation.to,
              immediate: true,
            });
            console.log('131231');
            if (onClosed) onClosed();
          }
          if (!isOpened && finished && !keepMounted) {
            setIsMounted(false);
          }
        },
      });
    }
  }, [isOpened, isMounted]);
  useEffect(() => {
    if (isOpen) {
      OpenedDialogs.add(uniqueId);
    } else {
      OpenedDialogs.delete(uniqueId);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <Portal>
      <div
        className={css(styles.root, containerStyles)}
        {...(dataComponent
          ? {
              'data-component': dataComponent,
            }
          : {})}
        style={{
          pointerEvents: isOpened ? 'auto' : 'none',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <a.div
          {...api.getBackdropProps()}
          style={backdropSpring}
          // @ts-ignore
          className={css(styles.backdrop, backdropStyles)}
          hidden={false}
          onClick={onClose}
        />
        {/* @ts-ignore */}
        <a.div
          {...api.getPositionerProps()}
          hidden={false}
          className={css(styles.dialog.root, wrapperStyles)}
          style={{
            ...spring,
            ...(animation
              ? {}
              : {
                  opacity: backdropSpring.opacity,
                }),
          }}
        >
          <div
            {...api.getContentProps()}
            ref={containerRef}
            hidden={false}
            className={css(styles.dialog.dialog, _styles)}
            aria-label={ariaLabel}
          >
            {children}
          </div>
        </a.div>
      </div>
    </Portal>
  );
}
