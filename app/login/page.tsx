import AuthForm from '@/app/auth/(auth)/providers';

export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <AuthForm view="sign_in" />
    </div>
  );
}
