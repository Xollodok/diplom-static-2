"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Product, User, CartItem } from "@/lib/types"
import { initialProducts } from "@/lib/data"
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type AuthContextType = {
  user: SupabaseUser | null
  loading: boolean
}

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
}

type ProductContextType = {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})
const CartContext = createContext<CartContextType | undefined>(undefined)
const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  // Auth state
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)

  // Products state
  const [products, setProducts] = useState<Product[]>([])

  // Initialize data on client-side
  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    // Load or initialize products
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      // Initialize with default products if none exist
      localStorage.setItem("products", JSON.stringify(initialProducts))
      setProducts(initialProducts)
    }

    // Create admin account if it doesn't exist
    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    const adminExists = users.some((u: User) => u.email === "admin@paintpro.com")
    if (!adminExists) {
      const adminUser = {
        id: "admin-1",
        name: "Администратор",
        email: "admin@paintpro.com",
        password: "1234", // In a real app, this would be hashed
        isAdmin: true,
      }
      users.push(adminUser)
      localStorage.setItem("users", JSON.stringify(users))
    }
  }, [])

  // Update cart total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return sum + (product?.price || 0) * item.quantity
    }, 0)

    setCartTotal(total)
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems, products])

  // Auth functions
  const login = (email: string, password: string) => {
    const storedUsers = localStorage.getItem("users")
    if (!storedUsers) return false

    const users = JSON.parse(storedUsers)
    const foundUser = users.find((u: User) => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = (name: string, email: string, password: string) => {
    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if user already exists
    if (users.some((u: User) => u.email === email)) {
      return false
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
      isAdmin: false,
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Auto login after registration
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))

    return true
  }

  // Cart functions
  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id)

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [
          ...prev,
          {
            id: `cart-item-${Date.now()}`,
            productId: product.id,
            quantity,
          },
        ]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Product functions
  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: `product-${Date.now()}`,
    }

    setProducts((prev) => {
      const updated = [...prev, newProduct]
      localStorage.setItem("products", JSON.stringify(updated))
      return updated
    })
  }

  const updateProduct = (product: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === product.id ? product : p))
      localStorage.setItem("products", JSON.stringify(updated))
      return updated
    })
  }

  const deleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId)
      localStorage.setItem("products", JSON.stringify(updated))
      return updated
    })

    // Also remove from cart if present
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <CartContext.Provider
        value={{
          items: cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          total: cartTotal,
        }}
      >
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          {children}
        </ProductContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

// Custom hooks to use the contexts
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
