'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login?message=You have been logged out');
};

const ensureAuth = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect('/login?message=You must be logged in to access this page');
  }
  return user;
};

const redirectAuthedUsers = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) redirect('/');
};

export { ensureAuth, signOut, redirectAuthedUsers };
