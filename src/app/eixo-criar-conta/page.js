"use client"

import { RegisterForm } from "@/components/register-form"
import { useRouter } from "next/navigation"

export default function CreateAccount() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <RegisterForm onToggle={() => router.push('/')} />
    </main>
  )
} 