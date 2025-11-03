import logo from '@/assets/images/logo.png';
import { css } from '@/styled-system/css';
import { responsiveRoot } from '@/styled-system/patterns';
import { Image } from '@/ui/Image';
import { Text } from '@/ui/Text';
import { Link } from 'react-router';

import { Avatar } from './Avatar';

export function Header() {
  return (
    <header
      className={css({
        bg: '#fff',
        h: '64px',
        borderBottom: '1px solid token(colors.neutral-200)',
      })}
    >
      <div
        className={responsiveRoot({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          h: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          })}
        >
          <Link to="/">
            <Image
              src={logo}
              wrapperStyles={css.raw({
                w: '40px',
                h: '40px',
              })}
            />
          </Link>
          <Text as="h1" textSize="body-xl-700">
            Travel Planer
          </Text>
        </div>
        <Avatar />
      </div>
    </header>
  );
}
