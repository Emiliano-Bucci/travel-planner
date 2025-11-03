import { Auth } from '@/components/Auth';
import { css } from '@/styled-system/css';
import { responsiveRoot } from '@/styled-system/patterns';
import { Outlet } from 'react-router';

import { Header } from './Header';

export function RootLayout() {
  return (
    <div
      data-color-mode="light"
      className={css({
        display: 'grid',
        w: '100%',
        minH: '100%',
      })}
    >
      <Auth>
        <Header />
        <div
          className={responsiveRoot({
            mt: '40px',
          })}
        >
          <Outlet />
        </div>
      </Auth>
    </div>
  );
}
