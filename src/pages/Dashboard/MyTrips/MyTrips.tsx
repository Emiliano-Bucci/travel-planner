import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';
import { DashboardBox } from '@/ui/DashboardBox';
import { useQuery } from '@tanstack/react-query';

import { NewTrip } from './NewTrip';

export function MyTrips() {
  const { session } = useAuthStore();

  const {
    data: trips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel')
        .select('*')
        .eq('user_id', session?.user?.id ?? '')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <DashboardBox title="My Trips" actions={<NewTrip />}>
      {isLoading && <p>Loading trips...</p>}
      {error && <p>Error loading trips: {error.message}</p>}
      {trips && trips.length === 0 && (
        <p>No trips yet. Create your first trip!</p>
      )}
      {trips && trips.length > 0 && (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>{trip.name}</li>
          ))}
        </ul>
      )}
    </DashboardBox>
  );
}
