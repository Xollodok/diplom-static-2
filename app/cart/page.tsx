"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart, useProducts } from "../providers"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react"
import { useAuth } from "../providers"

export default function CartPage() {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const { products } = useProducts()
  const { user } = useAuth()

  // Get full product details for cart items
  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
      subtotal: (product?.price || 0) * item.quantity,
    }
  })

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
    } else {
      router.push("/checkout")
    }
  }

  // Empty cart message
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-8">Похоже, вы еще не добавили товары в корзину.</p>
          <Button onClick={() => router.push("/products")}>Продолжить покупки</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cart page title and column headers */}
      <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Товар</div>
                <div className="col-span-2 text-center">Цена</div>
                <div className="col-span-2 text-center">Количество</div>
                <div className="col-span-2 text-right">Сумма</div>
              </div>

              <Separator className="mb-6" />

              {cartProducts.map((item) => (
                <div key={item.id} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                        {item.product && (
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.product?.name || "Product not found"}</h3>
                        <p className="text-sm text-gray-500">{item.product?.category || ""}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 md:text-center flex justify-between md:block">
                      {/* Mobile labels */}
                      <span className="md:hidden">Цена:</span>
                      <span>₽{item.product?.price.toFixed(2) || "0.00"}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 md:text-center flex justify-between md:block">
                      {/* Mobile labels */}
                      <span className="md:hidden">Количество:</span>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Decrease quantity"
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Increase quantity"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="md:col-span-2 md:text-right flex justify-between md:block">
                      {/* Mobile labels */}
                      <span className="md:hidden">Сумма:</span>
                      <div className="flex items-center justify-end space-x-2">
                        <span>₽{item.subtotal.toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile separator */}
                  <Separator className="my-4 md:hidden" />
                </div>
              ))}

              <div className="flex justify-between mt-6">
                {/* Buttons */}
                <Button variant="outline" onClick={() => router.push("/products")}>
                  Продолжить покупки
                </Button>
                <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Очистить корзину
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            {/* Order summary */}
            <h2 className="text-lg font-bold mb-4">Итого заказа</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Подытог</span>
                <span>₽{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Налог</span>
                <span>₽{(total * 0.1).toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Итого</span>
                <span>₽{(total * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full" size="lg">
              Перейти к оформлению
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
