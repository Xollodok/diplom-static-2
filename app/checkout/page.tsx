"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useCart } from "../providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from 'lucide-react'
import CheckoutSummary from "@/components/checkout/checkout-summary"

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()

  const [formState, setFormState] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the order to a backend
      clearCart()
      setIsSubmitting(false)
      setIsComplete(true)

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 1500)
  }

  // Redirect to login if not authenticated
  if (!user && typeof window !== "undefined") {
    router.push("/login?redirect=/checkout")
    return null
  }

  // Redirect to cart if cart is empty
  if (items.length === 0 && !isComplete) {
    router.push("/cart")
    return null
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-green-500" />
          <h1 className="text-2xl font-bold mb-4">Заказ успешно оформлен!</h1>
          <p className="text-gray-600 mb-8">
            Спасибо за покупку. Ваш заказ получен и обрабатывается.
          </p>
          <Button onClick={() => router.push("/")}>Вернуться на главную</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Контактная информация</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Электронная почта</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" name="address" value={formState.address} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" name="city" value={formState.city} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Область / Регион</Label>
                  <Input id="state" name="state" value={formState.state} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Почтовый индекс</Label>
                  <Input id="zipCode" name="zipCode" value={formState.zipCode} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Страна</Label>
                  <Input id="country" name="country" value={formState.country} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>

              <RadioGroup value={formState.paymentMethod} onValueChange={handleRadioChange} className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Кредитная карта</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {formState.paymentMethod === "credit-card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formState.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardName">Имя на карте</Label>
                    <Input id="cardName" name="cardName" value={formState.cardName} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Срок действия</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formState.cardExpiry}
                      onChange={handleChange}
                      placeholder="ММ/ГГ"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      value={formState.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>

              <div className="space-y-2">
                <Label htmlFor="notes">Примечания к заказу (необязательно)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formState.notes}
                  onChange={handleChange}
                  placeholder="Особые инструкции по доставке или предпочтения по товарам"
                  className="h-24"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Обработка..." : "Оформить заказ"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}
