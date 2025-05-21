import AuthForm from '@/app/auth/(auth)/providers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Login() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (user) {
    redirect('/');
  }
  return (
    <div className="max-w-md mx-auto mt-20">
      <AuthForm view="sign_in" />
    </div>
  );
}
