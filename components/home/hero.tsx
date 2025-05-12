import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative">
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Преобразите свое пространство с помощью премиальных красок
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Откройте для себя нашу коллекцию высококачественных аэрозольных красок, лаков и грунтовок для всех ваших
              творческих проектов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/products">Купить сейчас</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base bg-transparent text-white border-white hover:bg-white hover:text-gray-900"
              >
                <Link href="/contact">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
