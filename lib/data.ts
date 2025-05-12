import type { Product } from "./types"

const categoryMap = {
  "spray-paint": "Аэрозольная краска",
  varnish: "Лак",
  primer: "Грунтовка",
  accessories: "Аксессуары",
}

export const initialProducts: Product[] = [
  {
    id: "product-1",
    name: "Премиальная матовая аэрозольная краска",
    description:
      "Высококачественная матовая аэрозольная краска, идеальная для внутренних и наружных проектов. Обеспечивает отличное покрытие и быстро сохнет.",
    price: 899.99,
    category: "spray-paint",
    image: "/placeholder.svg",
    featured: true,
    inventory: 150,
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "product-2",
    name: "Глянцевый лак",
    description:
      "Защитный прозрачный лак с глянцевым покрытием. Идеально подходит для защиты деревянных поверхностей от влаги и износа.",
    price: 1299.99,
    category: "varnish",
    image: "/placeholder.svg",
    featured: true,
    inventory: 75,
    createdAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "product-3",
    name: "Универсальная грунтовка",
    description:
      "Универсальная грунтовка, которая прилипает к различным поверхностям, включая дерево, металл и пластик. Создает гладкую основу для нанесения краски.",
    price: 999.99,
    category: "primer",
    image: "/placeholder.svg",
    featured: false,
    inventory: 100,
    createdAt: "2023-03-05T00:00:00Z",
  },
  {
    id: "product-4",
    name: "Металлическая золотая аэрозольная краска",
    description:
      "Богатая металлическая золотая аэрозольная краска, которая придает роскошную отделку любому проекту. Быстросохнущая и долговечная.",
    price: 999.99,
    category: "spray-paint",
    image: "/placeholder.svg",
    featured: true,
    inventory: 120,
    createdAt: "2023-04-20T00:00:00Z",
  },
  {
    id: "product-5",
    name: "Лак с сатиновым покрытием",
    description:
      "Лак со средним блеском, который обеспечивает тонкую, элегантную отделку. Защищает поверхности, подчеркивая естественную красоту дерева.",
    price: 1399.99,
    category: "varnish",
    image: "/placeholder.svg",
    featured: false,
    inventory: 60,
    createdAt: "2023-05-15T00:00:00Z",
  },
  {
    id: "product-6",
    name: "Антикоррозийная грунтовка",
    description:
      "Специализированная грунтовка, предназначенная для предотвращения ржавчины на металлических поверхностях. Создает прочную связь для последующих слоев краски.",
    price: 1199.99,
    category: "primer",
    image: "/placeholder.svg",
    featured: false,
    inventory: 85,
    createdAt: "2023-06-10T00:00:00Z",
  },
  {
    id: "product-7",
    name: "Аэрозольная краска для школьной доски",
    description:
      "Превращает поверхности в школьные доски. Идеально подходит для творческих домашних проектов, детских комнат и организационных пространств.",
    price: 899.99,
    category: "spray-paint",
    image: "/placeholder.svg",
    featured: false,
    inventory: 90,
    createdAt: "2023-07-05T00:00:00Z",
  },
  {
    id: "product-8",
    name: "Профессиональный краскопульт",
    description:
      "Высокопроизводительный краскопульт для эффективного и равномерного нанесения. Регулируемые настройки для различных типов краски и проектов.",
    price: 5999.99,
    category: "accessories",
    image: "/placeholder.svg",
    featured: true,
    inventory: 30,
    createdAt: "2023-08-20T00:00:00Z",
  },
]
