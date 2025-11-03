import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';
import { css } from '@/styled-system/css';
import { Button } from '@/ui/Button';
import { Dialog } from '@/ui/Dialog';
import { DialogFooter } from '@/ui/Dialog/DialogFooter';
import { DialogHeader } from '@/ui/Dialog/DialogHeader';
import { Input } from '@/ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type FormEvent, useState } from 'react';

export function NewTrip() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuthStore();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const createTripMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('travel').insert({
        name: data.name,
        description: data.description || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        user_id: session?.user?.id ?? '',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-trips'] });
      setIsOpen(false);
      // Reset form
      setFormData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
      });
      setErrors({});
    },
    onError: (error) => {
      console.error('Error creating trip:', error);
      setErrors({ submit: 'Failed to create trip. Please try again.' });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Trip name is required';
    }

    if (formData.start_date && formData.end_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        newErrors.end_date = 'End date must be after start date';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createTripMutation.mutate(formData);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New Trip</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="New trip"
      >
        <DialogHeader title="New trip" onClose={() => setIsOpen(false)} />
        <form
          id="new-trip"
          onSubmit={handleSubmit}
          className={css({
            p: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <Input
            label="Trip name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            errorMessage={errors.name}
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="Start date"
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
          />
          <Input
            label="End date"
            type="date"
            value={formData.end_date}
            onChange={(e) => {
              setFormData({ ...formData, end_date: e.target.value });
              if (errors.end_date) setErrors({ ...errors, end_date: '' });
            }}
            errorMessage={errors.end_date}
          />
          {errors.submit && (
            <div
              className={css({
                color: 'Error',
                fontSize: '14px',
              })}
            >
              {errors.submit}
            </div>
          )}
        </form>
        <DialogFooter
          onClose={() => setIsOpen(false)}
          submitButtonProps={{
            label: 'Create',
            form: 'new-trip',
            disabled: createTripMutation.isPending,
          }}
        />
      </Dialog>
    </>
  );
}
