import { css } from '@/styled-system/css';

import { MyTrips } from './MyTrips';

export function Dashboard() {
  return (
    <div
      className={css({
        display: 'grid',
        gap: '24px',
      })}
    >
      <MyTrips />
    </div>
  );
}
