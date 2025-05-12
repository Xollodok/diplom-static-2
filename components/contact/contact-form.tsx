"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Сообщение отправлено!</h3>
        <p className="text-gray-600">Спасибо за обращение. Мы свяжемся с вами как можно скорее.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Ваше имя</Label>
        <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Электронная почта</Label>
        <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Тема</Label>
        <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Сообщение</Label>
        <Textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          className="h-32"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить сообщение"}
      </Button>
    </form>
  )
}
