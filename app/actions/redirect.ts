import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function redirectToLogin() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function redirectToHome() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    redirect('/');
  }
  return user;
}
