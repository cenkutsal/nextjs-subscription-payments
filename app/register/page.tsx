import AuthForm from '@/app/auth/(auth)/providers';

export default async function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Create Account
        </h1>
        <AuthForm view="sign_up" />
      </div>
    </div>
  );
}
