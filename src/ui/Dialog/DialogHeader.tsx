import { css, cx } from '@/styled-system/css';
import { Text } from '@/ui/Text';
import { X } from 'lucide-react';

import { Button } from '../Button';

type Props = {
  title?: string;
  onClose(): void;
  className?: string;
};

export function DialogHeader({ title, onClose, className }: Props) {
  return (
    <div
      data-component="DialogHeader"
      className={cx(
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid token(colors.neutral-200)',
          zIndex: '1',
          position: 'sticky',
          p: '16px',
          top: '0',
        }),
        className,
      )}
    >
      {title && <Text textSize="title-m">{title}</Text>}
      <Button onClick={onClose} btnType="icon">
        <X size={18} />
      </Button>
    </div>
  );
}
