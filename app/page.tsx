import { DepositForm } from '@/components/DepositForm';
import { createClient } from '@/utils/supabase/server';
import AuthProvider from '@/components/AuthProvider';
import { Landing } from '@/components/Landing';

export default async function Page() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  return (
    <>
      <AuthProvider />
      {!user?.user && <Landing />}
      {user?.user && <DepositForm />}
    </>
  );
}
