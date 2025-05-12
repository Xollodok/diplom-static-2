import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Корзина не найдена</h1>
      <p className="text-gray-600 mb-8">Извините, возникла проблема при загрузке вашей корзины.</p>
      <Button asChild>
        <Link href="/products">Перейти к товарам</Link>
      </Button>
    </div>
  )
}
