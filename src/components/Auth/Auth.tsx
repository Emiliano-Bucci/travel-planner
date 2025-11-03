import { LoginPage } from '@/pages/Login';
import { useAuthStore } from '@/stores/useAuthStore';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://lzhbdtfnwkxnpzimcsec.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGJkdGZud2t4bnB6aW1jc2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjgzNDUsImV4cCI6MjA3Nzc0NDM0NX0.CSXiC2NYI5cgcDNXC-k6HmVD3Tcfz-1vt8bFVBVyO1U',
  {
    auth: {
      flowType: 'pkce', // 👈 Questo elimina l'hash
      autoRefreshToken: true,
      persistSession: true,
    },
  },
);

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
