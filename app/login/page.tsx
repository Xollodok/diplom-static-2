"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/"
  const { login, register, user } = useAuth()

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [activeTab, setActiveTab] = useState("login")
  const [error, setError] = useState<string | null>(null)

  // Redirect if already logged in
  if (user && typeof window !== "undefined") {
    router.push(redirectPath)
    return null
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const success = login(loginForm.email, loginForm.password)

    if (success) {
      router.push(redirectPath)
    } else {
      setError("Неверный email или пароль")
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    const success = register(registerForm.name, registerForm.email, registerForm.password)

    if (success) {
      router.push(redirectPath)
    } else {
      setError("Email уже используется")
    }
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Вход</h1>
          <p className="text-gray-500">Войдите в свой аккаунт</p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  )
}
