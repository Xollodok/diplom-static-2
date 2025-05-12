"use client"

import { useCart, useProducts } from "@/app/providers"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSummary() {
  const { items, total } = useCart()
  const { products } = useProducts()

  // Get full product details for cart items
  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
      subtotal: (product?.price || 0) * item.quantity,
    }
  })

  // Calculate tax and total
  const tax = total * 0.1
  const grandTotal = total + tax

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
      <h2 className="text-lg font-bold mb-4">Итого заказа</h2>

      <div className="space-y-4 mb-6">
        {cartProducts.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <span className="font-medium">{item.product?.name}</span>
              <span className="text-gray-500 block text-sm">Кол-во: {item.quantity}</span>
            </div>
            <span>₽{item.subtotal.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Подытог</span>
          <span>₽{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Доставка</span>
          <span>Бесплатно</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Налог (10%)</span>
          <span>₽{tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-bold text-lg">
        <span>Итого</span>
        <span>₽{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}
