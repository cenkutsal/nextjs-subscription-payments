'use client';
import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm({ view }: { view: 'sign_in' | 'sign_up' }) {
  const supabase = createClient();

  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      view={view}
    />
  );
}
