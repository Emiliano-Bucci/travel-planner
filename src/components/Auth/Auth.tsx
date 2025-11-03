import { supabase } from '@/lib/supabase';
import { LoginPage } from '@/pages/Login';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export function Auth({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { session, setSession } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <LoginPage supabase={supabase} />;
  }

  return children;
}
