'use client';
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";


export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
					<Button onClick={() => signIn("google", { redirectTo: "/dashboard" })} className="w-full mb-4">
						Sign in with Google
					</Button>
      </div>
    </div>
  );
}