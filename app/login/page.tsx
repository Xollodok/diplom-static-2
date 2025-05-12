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
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">{activeTab === "login" ? "Вход" : "Создание аккаунта"}</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login-email">Электронная почта</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-900">
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Войти
              </Button>

              <div className="text-center text-sm text-gray-500">
                Нет аккаунта?{" "}
                <button type="button" onClick={() => setActiveTab("register")} className="text-primary hover:underline">
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="register-name">Полное имя</Label>
                <Input
                  id="register-name"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Электронная почта</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Подтверждение пароля</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Создать аккаунт
              </Button>

              <div className="text-center text-sm text-gray-500">
                Уже есть аккаунт?{" "}
                <button type="button" onClick={() => setActiveTab("login")} className="text-primary hover:underline">
                  Войти
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
