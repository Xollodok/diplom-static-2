import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-gray-600 mb-8">Извините, страница, которую вы ищете, не существует или была перемещена.</p>
      <Button asChild>
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  )
}
