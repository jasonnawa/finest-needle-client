import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-2">Sign In</h1>
      <SignInForm />
    </div>
  );
}
