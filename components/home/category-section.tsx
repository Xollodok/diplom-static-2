import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CategorySection() {
  const categories = [
    {
      name: "Аэрозольные краски",
      description: "Высококачественные аэрозольные краски для всех поверхностей",
      image: "/placeholder.svg",
      link: "/products?category=spray-paint",
    },
    {
      name: "Лаки",
      description: "Защитные покрытия для дерева и других материалов",
      image: "/placeholder.svg",
      link: "/products?category=varnish",
    },
    {
      name: "Грунтовки",
      description: "Создайте идеальную основу для ваших проектов",
      image: "/placeholder.svg",
      link: "/products?category=primer",
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Категории товаров</h2>
        <p className="text-gray-600">Найдите идеальные товары для вашего проекта</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
              <p className="mb-4">{category.description}</p>
              <Button
                asChild
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black"
              >
                <Link href={category.link}>Купить сейчас</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
