"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2 } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)

    // Show success message
    setIsSubmitted(true)
    setEmail("")

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-100 rounded-lg p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Подпишитесь на нашу рассылку</h2>
          <p className="text-gray-600 mb-6">Будьте в курсе наших последних товаров, акций и советов по покраске.</p>

          {isSubmitted ? (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span>Спасибо за подписку!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Подписаться</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
