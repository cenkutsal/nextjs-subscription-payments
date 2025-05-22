import AuthForm from '@/app/auth/(auth)/providers';
import { redirectToHome } from '../actions/redirect';

export default async function Register() {
  await redirectToHome();

  return (
    <div className="max-w-md mx-auto mt-20">
      <AuthForm view="sign_up" />
    </div>
  );
}
