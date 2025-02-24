"use client"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <iframe 
        src="https://eixo.digital/medbio/"
        className="w-full h-screen border-0"
        title="MedBio - O formato de Bio que aumenta seus agendamentos"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="eager"
      />
    </main>
  )
}
