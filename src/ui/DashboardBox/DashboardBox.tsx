import { css } from '@/styled-system/css';
import { Text } from '@/ui/Text';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function DashboardBox({ title, children }: Props) {
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
      <Text textSize="body-xl-700">{title}</Text>
      {children}
    </div>
  );
}
