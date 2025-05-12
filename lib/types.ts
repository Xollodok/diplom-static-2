export interface User {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  featured: boolean
  inventory: number
  createdAt: string
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
}
