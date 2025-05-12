import { Suspense } from "react"
import { initialProducts } from "@/lib/data"
import ProductsClient from "@/components/products/products-client"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Все товары - ПейнтПро",
  description: "Просмотрите наш каталог качественных красок, лаков и грунтовок",
}

export default function ProductsPage() {
  // Получаем все категории на сервере
  const categories = Array.from(new Set(initialProducts.map((p) => p.category)))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Все товары</h1>

      <Suspense
        fallback={
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <Skeleton className="h-[600px] w-full" />
            </div>
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[300px] w-full" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ProductsClient initialProducts={initialProducts} initialCategories={categories} />
      </Suspense>
    </div>
  )
}
