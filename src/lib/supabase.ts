import { createClient } from '@supabase/supabase-js';

import type { Database } from './database.types';

export const supabase = createClient<Database>(
  'https://lzhbdtfnwkxnpzimcsec.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGJkdGZud2t4bnB6aW1jc2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjgzNDUsImV4cCI6MjA3Nzc0NDM0NX0.CSXiC2NYI5cgcDNXC-k6HmVD3Tcfz-1vt8bFVBVyO1U',
  {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
    },
  },
);
