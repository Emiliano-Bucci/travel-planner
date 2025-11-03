import { css } from '@/styled-system/css';
import { Button } from '@/ui/Button';
import { Dialog } from '@/ui/Dialog';
import { DialogFooter } from '@/ui/Dialog/DialogFooter';
import { DialogHeader } from '@/ui/Dialog/DialogHeader';
import { useState } from 'react';

export function NewTrip() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Trip</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="New trip"
      >
        <DialogHeader title="New trip" onClose={() => setIsOpen(false)} />
        <div
          className={css({
            p: '24px',
          })}
        ></div>
        <DialogFooter
          onClose={() => setIsOpen(false)}
          submitButtonProps={{ label: 'Create', form: 'new-trip' }}
        />
      </Dialog>
    </>
  );
}
