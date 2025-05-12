import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import CategorySection from "@/components/home/category-section"
import Testimonials from "@/components/home/testimonials"
import Newsletter from "@/components/home/newsletter"
import { initialProducts } from "@/lib/data"

export default function Home() {
  // Получаем рекомендуемые товары на сервере
  const featuredProducts = initialProducts.filter((product) => product.featured).slice(0, 4)

  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <CategorySection />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
