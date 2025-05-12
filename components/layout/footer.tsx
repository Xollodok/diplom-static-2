import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { getFullPath } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ПейнтПро</h3>
            <p className="text-gray-600 mb-4">Качественные краски, лаки и грунтовки для всех ваших проектов.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Магазин</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getFullPath("/products?category=spray-paint")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Аэрозольные краски
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/products?category=varnish")} className="text-gray-600 hover:text-gray-900">
                  Лаки
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/products?category=primer")} className="text-gray-600 hover:text-gray-900">
                  Грунтовки
                </Link>
              </li>
              <li>
                <Link
                  href={getFullPath("/products?category=accessories")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Компания</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getFullPath("/about")} className="text-gray-600 hover:text-gray-900">
                  О нас
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/contact")} className="text-gray-600 hover:text-gray-900">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/careers")} className="text-gray-600 hover:text-gray-900">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/blog")} className="text-gray-600 hover:text-gray-900">
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Обслуживание клиентов</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getFullPath("/faq")} className="text-gray-600 hover:text-gray-900">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/shipping")} className="text-gray-600 hover:text-gray-900">
                  Доставка и возврат
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/warranty")} className="text-gray-600 hover:text-gray-900">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link href={getFullPath("/privacy")} className="text-gray-600 hover:text-gray-900">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ПейнтПро. Все права защищены.</p>
          <p className="mt-2">
            Это демонстрационный сайт, созданный в образовательных целях. Не является реальным магазином.
          </p>
        </div>
      </div>
    </footer>
  )
}
