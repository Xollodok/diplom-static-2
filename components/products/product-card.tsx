"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { useCart } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleClick = () => {
    router.push(`/products/${product.id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    // Show a toast or notification here
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 truncate">
          {{
            "spray-paint": "Аэрозольная краска",
            varnish: "Лак",
            primer: "Грунтовка",
            accessories: "Аксессуары",
          }[product.category] || product.category}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">₽{product.price.toFixed(2)}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
