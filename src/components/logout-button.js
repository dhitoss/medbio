'use client'

import { signOut } from "next-auth/react"

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      Sair
    </button>
  )
} 