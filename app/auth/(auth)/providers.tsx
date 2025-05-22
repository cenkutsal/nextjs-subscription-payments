'use client';
import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSearchParams } from 'next/navigation';
type View = 'sign_in' | 'sign_up';

export default function AuthForm({ view }: { view: View }) {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const supabase = createClient();
  return (
    <div>
      {message && <p className="text-red-500">{message}</p>}
      <Auth
        supabaseClient={supabase}
        providers={['google']}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        view={view}
        redirectTo={`${location.origin}/auth/callback`}
      />
    </div>
  );
}
