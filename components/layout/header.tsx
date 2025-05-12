"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, useCart } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { getFullPath } from "@/lib/constants"

export default function Header() {
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()
  const { items } = useCart()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(getFullPath(`/products?search=${encodeURIComponent(searchQuery)}`))
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push(getFullPath("/"))
  }

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href={getFullPath("/")} className="text-lg font-medium transition-colors hover:text-primary">
                  Главная
                </Link>
                <Link
                  href={getFullPath("/products")}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Товары
                </Link>
                <Link
                  href={getFullPath("/contact")}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Контакты
                </Link>
                {isAdmin && (
                  <Link
                    href={getFullPath("/admin")}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    Админ
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href={getFullPath("/")} className="flex items-center space-x-2">
            <span className="font-bold text-xl">ПейнтПро</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href={getFullPath("/")} className="text-sm font-medium transition-colors hover:text-primary">
              Главная
            </Link>
            <Link href={getFullPath("/products")} className="text-sm font-medium transition-colors hover:text-primary">
              Товары
            </Link>
            <Link href={getFullPath("/contact")} className="text-sm font-medium transition-colors hover:text-primary">
              Контакты
            </Link>
            {isAdmin && (
              <Link href={getFullPath("/admin")} className="text-sm font-medium transition-colors hover:text-primary">
                Админ
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Поиск товаров..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Cart */}
          <Button variant="ghost" size="icon" onClick={() => router.push(getFullPath("/cart"))} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(getFullPath("/account"))}>Профиль</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(getFullPath("/cart"))}>Корзина</DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => router.push(getFullPath("/admin"))}>
                    Панель администратора
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => router.push(getFullPath("/login"))}>
              <User className="h-5 w-5" />
              <span className="sr-only">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
