"use client"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem vindo ao MedBio
        </h1>
        <p className="text-gray-600 mb-8">
          Sua plataforma de links para profissionais da saúde
        </p>
        <div className="space-x-4">
          <a 
            href="/login" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Entrar
          </a>
          <a 
            href="/eixo-criar-conta" 
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Criar Conta
          </a>
        </div>
      </div>
    </main>
  )
}
