import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/health-logo.svg"
          alt="Health Monitor Logo"
          width={180}
          height={38}
          priority
          className="mb-6"
        />
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
      </div>
      <LoginForm />
    </div>
  );
}