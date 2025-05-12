"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { useCart } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MinusCircle, PlusCircle, ShoppingCart, Heart, Truck, RefreshCw, ShieldCheck } from "lucide-react"

export default function ProductDetails({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Show a toast or notification here
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {/* Product Image */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">
            {{
              "spray-paint": "Аэрозольная краска",
              varnish: "Лак",
              primer: "Грунтовка",
              accessories: "Аксессуары",
            }[product.category] || product.category}
          </p>
        </div>

        <div className="text-2xl font-bold">₽{product.price.toFixed(2)}</div>

        <p className="text-gray-700">{product.description}</p>

        <Separator />

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="font-medium">Количество:</span>
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Уменьшить количество"
            >
              <MinusCircle size={20} />
            </button>
            <span className="mx-4 w-8 text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Увеличить количество"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleAddToCart} className="flex-1" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Добавить в корзину
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            <Heart className="mr-2 h-5 w-5" />
            Добавить в избранное
          </Button>
        </div>

        {/* Product Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center">
            <Truck className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm">Бесплатная доставка</span>
          </div>
          <div className="flex items-center">
            <RefreshCw className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm">Возврат в течение 30 дней</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm">Гарантия 2 года</span>
          </div>
        </div>
      </div>
    </div>
  )
}
