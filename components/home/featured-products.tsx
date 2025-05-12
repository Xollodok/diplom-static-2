"use client"

import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import ProductCard from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/app/providers"

export default function FeaturedProducts({ products: initialProducts }: { products: Product[] }) {
  const router = useRouter()
  const { products } = useProducts()

  // Используем продукты из контекста, если они доступны, иначе используем начальные продукты
  const featuredProducts =
    products.length > 0 ? products.filter((product) => product.featured).slice(0, 4) : initialProducts

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Рекомендуемые товары</h2>
          <p className="text-gray-600">Наши самые популярные товары, подобранные специально для вас</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/products")} className="mt-4 md:mt-0">
          Посмотреть все товары
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
