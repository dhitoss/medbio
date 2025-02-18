"use client"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
        <div className="mt-4 text-center">
          
        </div>
      </div>
    </main>
  )
}
