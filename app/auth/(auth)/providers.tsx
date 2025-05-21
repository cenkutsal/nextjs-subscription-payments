'use client';
import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSearchParams } from 'next/navigation';

type View = 'sign_in' | 'sign_up';

export default function AuthForm({ view }: { view: View }) {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      view={view}
      redirectTo={`${location.origin}/auth/callback?next=${redirectTo}`}
    />
  );
}
