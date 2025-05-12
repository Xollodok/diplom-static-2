import { notFound } from "next/navigation"
import { initialProducts } from "@/lib/data"
import ProductDetails from "@/components/products/product-details"
import RelatedProductsServer from "@/components/products/related-products-server"

export const dynamicParams = false

export function generateStaticParams() {
  return initialProducts.map((product) => ({
    id: product.id,
  }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = initialProducts.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Товар не найден - ПейнтПро",
      description: "Запрашиваемый товар не найден в нашем каталоге",
    }
  }

  return {
    title: `${product.name} - ПейнтПро`,
    description: product.description.substring(0, 160),
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = initialProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Находим похожие товары (той же категории)
  const relatedProducts = initialProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <RelatedProductsServer products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
