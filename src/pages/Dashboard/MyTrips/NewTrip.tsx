import { supabase } from '@/lib/supabase';
import { queryClient } from '@/main';
import { useAuthStore } from '@/stores/useAuthStore';
import { css } from '@/styled-system/css';
import { Button } from '@/ui/Button';
import { Dialog } from '@/ui/Dialog';
import { DialogFooter } from '@/ui/Dialog/DialogFooter';
import { DialogHeader } from '@/ui/Dialog/DialogHeader';
import { Input } from '@/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Zod schema for form validation
const tripSchema = z
  .object({
    name: z.string().min(1, 'Trip name is required').trim(),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  })
  .refine(
    (data) => {
      // Validate that end_date is after start_date if both are provided
      if (data.start_date && data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date'],
    },
  );

type TripFormData = z.infer<typeof tripSchema>;

function DialogContent({
  handleOnSubmit,
  onClose,
}: {
  handleOnSubmit: (fn: () => Promise<void>) => void;
  onClose: () => Promise<void>;
}) {
  const { session } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
    },
  });

  const onSubmit = (data: TripFormData) => {
    handleOnSubmit(async () => {
      try {
        const { error } = await supabase.from('travel').insert({
          name: data.name,
          description: data.description || null,
          start_date: data.start_date || null,
          end_date: data.end_date || null,
          user_id: session?.user?.id ?? '',
        });

        if (error) {
          throw error;
        }

        await onClose();
        reset();
      } catch (error) {
        console.error('Error creating trip:', error);
        setError('root', {
          message: 'Failed to create trip. Please try again.',
        });
      }
    });
  };

  return (
    <form
      id="new-trip"
      onSubmit={handleSubmit(onSubmit)}
      className={css({
        p: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      })}
    >
      <Input
        label="Trip name"
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <Input
        label="Description"
        {...register('description')}
        errorMessage={errors.description?.message}
      />
      <Input
        label="Start date"
        type="date"
        {...register('start_date')}
        errorMessage={errors.start_date?.message}
      />
      <Input
        label="End date"
        type="date"
        {...register('end_date')}
        errorMessage={errors.end_date?.message}
      />
      {errors.root && (
        <div
          className={css({
            color: 'Error',
            fontSize: '14px',
          })}
        >
          {errors.root.message}
        </div>
      )}
    </form>
  );
}

export function NewTrip() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Trip</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="New trip"
      >
        <DialogHeader title="New trip" onClose={() => setIsOpen(false)} />
        <DialogContent
          handleOnSubmit={startTransition}
          onClose={async () => {
            await queryClient.invalidateQueries({ queryKey: ['my-trips'] });
            setIsOpen(false);
          }}
        />
        <DialogFooter
          onClose={() => setIsOpen(false)}
          submitButtonProps={{
            label: 'Create',
            form: 'new-trip',
            isLoading: isSubmitting,
          }}
        />
      </Dialog>
    </>
  );
}
