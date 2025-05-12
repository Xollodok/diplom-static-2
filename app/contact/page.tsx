import ContactForm from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Контакты - ПейнтПро",
  description: "Свяжитесь с нами для получения дополнительной информации о наших продуктах и услугах",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Связаться с нами</h1>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Наши контакты</h2>
            <p className="text-gray-600 mb-6">
              Есть вопросы о наших товарах или услугах? Заполните форму, и наша команда свяжется с вами как можно
              скорее.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Наш адрес</h3>
                  <p className="text-gray-600">ул. Красочная 123, г. Москва, 123456</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Телефон</h3>
                  <p className="text-gray-600">+7 (495) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Электронная почта</h3>
                  <p className="text-gray-600">info@paintpro.ru</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Часы работы</h3>
                  <p className="text-gray-600">Понедельник - Пятница: 9:00 - 17:00</p>
                  <p className="text-gray-600">Суббота: 10:00 - 16:00</p>
                  <p className="text-gray-600">Воскресенье: Выходной</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Какова ваша политика возврата?</h3>
                <p className="text-gray-600">
                  Мы предлагаем 30-дневную политику возврата для всех неиспользованных товаров в оригинальной упаковке.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Осуществляете ли вы международную доставку?</h3>
                <p className="text-gray-600">
                  Да, мы доставляем в большинство стран мира. Стоимость доставки зависит от местоположения.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Сколько времени занимает доставка?</h3>
                <p className="text-gray-600">
                  Внутренние заказы обычно доставляются в течение 3-5 рабочих дней. Международные заказы могут занять
                  7-14 рабочих дней.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Отправить сообщение</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
