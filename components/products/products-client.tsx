"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import ProductCard from "@/components/products/product-card"
import ProductFilters from "@/components/products/product-filters"
import { useProducts } from "@/app/providers"

interface ProductsClientProps {
  initialProducts: Product[]
  initialCategories: string[]
}

export default function ProductsClient({ initialProducts, initialCategories }: ProductsClientProps) {
  const { products } = useProducts()
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000])
  const [sortBy, setSortBy] = useState<string>("featured")

  // Используем продукты из контекста, если они доступны, иначе используем начальные продукты
  const productsToUse = products.length > 0 ? products : initialProducts

  // Фильтрация продуктов
  const filteredProducts = productsToUse.filter((product) => {
    // Фильтр по категории
    if (categoryFilter && product.category !== categoryFilter) {
      return false
    }

    // Фильтр по цене
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return a.featured ? -1 : 1
    }
  })

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4">
        <ProductFilters
          categories={initialCategories}
          selectedCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="w-full md:w-3/4">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Товары, соответствующие вашим критериям, не найдены.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
