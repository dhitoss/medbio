"use client"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
} 