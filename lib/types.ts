export interface User {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  created_at: string
}

export type CartItem = {
  id: string
  product_id: string
  user_id: string
  quantity: number
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total: number
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}
