import { css } from '@/styled-system/css';
import { Text } from '@/ui/Text';

type Props = {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function DashboardBox({ title, children, actions }: Props) {
  return (
    <div
      className={css({
        display: 'grid',
        gap: '24px',
        bg: '#fff',
        borderRadius: '24px',
        border: '1px solid token(colors.neutral-200)',
        p: '24px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        })}
      >
        <Text textSize="body-xl-700">{title}</Text>
        {actions}
      </div>
      {children}
    </div>
  );
}
