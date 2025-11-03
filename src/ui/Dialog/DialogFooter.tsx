import { css } from '@/styled-system/css';
import { Button } from '@/ui/Button';

type Props = {
  onClose(): void;
  backButtonProps?: {
    label: string;
  };
  submitButtonProps: {
    label: string;
    form: string;
  };
};

export function DialogFooter({
  onClose,
  submitButtonProps,
  backButtonProps,
}: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        p: '16px',
        bg: 'Surface-Container',
        borderTop: '1px solid token(colors.neutral-200)',
      })}
    >
      <Button
        onClick={onClose}
        theme="outlined"
        className={css({
          minW: '120px',
        })}
      >
        {backButtonProps?.label || 'Indietro'}
      </Button>
      <Button
        onClick={onClose}
        type="submit"
        form={submitButtonProps.form}
        className={css({
          minW: '120px',
        })}
      >
        {submitButtonProps.label}
      </Button>
    </div>
  );
}
