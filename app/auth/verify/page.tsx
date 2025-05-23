export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Check your email</h1>
          <p className="text-gray-300">
            We've sent you an email with a link to verify your account. Please
            check your inbox and click the link to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
