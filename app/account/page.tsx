"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AccountPage() {
  const router = useRouter()
  const { user, logout } = useAuth()

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [activeTab, setActiveTab] = useState("profile")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Redirect if not logged in
  if (!user && typeof window !== "undefined") {
    router.push("/login?redirect=/account")
    return null
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // In a real app, you would update the user profile in the database
    // For this demo, we'll just show a success message
    setSuccess("Профиль успешно обновлен")
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    // In a real app, you would verify the current password and update it
    // For this demo, we'll just show a success message
    setSuccess("Password updated successfully")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Мой аккаунт</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            <h2 className="font-semibold mb-4">Навигация</h2>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                Профиль
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "security" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                Безопасность
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                Заказы
              </button>
              <Separator className="my-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-red-50"
              >
                Выйти
              </button>
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-500 text-green-700 bg-green-50">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="profile" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Информация профиля</h2>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Полное имя</Label>
                      <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Электронная почта</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit">Сохранить изменения</Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Изменить пароль</h2>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit">Обновить пароль</Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">История заказов</h2>

                <div className="text-center py-8 text-gray-500">
                  <p>Вы еще не сделали ни одного заказа.</p>
                  <Button variant="outline" onClick={() => router.push("/products")} className="mt-4">
                    Начать покупки
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
