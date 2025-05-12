import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Мария Иванова",
      role: "Дизайнер интерьера",
      content:
        "Качество аэрозольных красок ПейнтПро исключительное. Мои клиенты всегда впечатлены отделкой и долговечностью.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Михаил Петров",
      role: "Энтузиаст DIY",
      content:
        "Я пробовал много брендов, но грунтовки ПейнтПро обеспечивают лучшее покрытие и адгезию для моих домашних проектов.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Елена Смирнова",
      role: "Реставратор мебели",
      content:
        "Лаки от ПейнтПро преобразили мою реставрационную работу. Они легко наносятся и обеспечивают красивую, долговечную защиту.",
      avatar: "/placeholder.svg",
    },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Что говорят наши клиенты</h2>
          <p className="text-gray-600">Не просто верьте нам на слово</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
