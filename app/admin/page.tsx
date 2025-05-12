"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth, useProducts } from "../providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Edit, Trash2, Plus, Package, Users, ShoppingCart, BarChart3 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function AdminPage() {
  const router = useRouter()
  const { user, isAdmin } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()

  const [activeTab, setActiveTab] = useState("products")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "spray-paint",
    image: "/placeholder.svg",
    featured: false,
    inventory: "100",
    createdAt: new Date().toISOString(),
  })

  // Redirect if not logged in or not admin
  if ((!user || !isAdmin) && typeof window !== "undefined") {
    router.push("/login?redirect=/admin")
    return null
  }

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setNewProduct((prev) => ({ ...prev, category: value }))
  }

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct((prev) => ({ ...prev, featured: e.target.checked }))
  }

  const handleEditingProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditingProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditingSelectChange = (value: string) => {
    setEditingProduct((prev) => ({ ...prev, category: value }))
  }

  const handleEditingFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingProduct((prev) => ({ ...prev, featured: e.target.checked }))
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const productToAdd = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        inventory: Number.parseInt(newProduct.inventory),
      }

      addProduct(productToAdd)

      setSuccess("Product added successfully")
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "spray-paint",
        image: "/placeholder.svg",
        featured: false,
        inventory: "100",
        createdAt: new Date().toISOString(),
      })
    } catch (err) {
      setError("Failed to add product")
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct({
      ...product,
      price: product.price.toString(),
      inventory: product.inventory.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const productToUpdate = {
        ...editingProduct,
        price: Number.parseFloat(editingProduct.price),
        inventory: Number.parseInt(editingProduct.inventory),
      }

      updateProduct(productToUpdate)
      setIsDialogOpen(false)
      setSuccess("Product updated successfully")
    } catch (err) {
      setError("Failed to update product")
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId)
      setSuccess("Product deleted successfully")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 text-green-700 bg-green-50">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            <h2 className="font-semibold mb-4">Панель управления</h2>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Обзор
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeTab === "products" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Package className="h-4 w-4 mr-2" />
                Товары
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Заказы
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeTab === "customers" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                Клиенты
              </button>
            </nav>
          </div>
        </div>

        <div className="md:col-span-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Обзор панели управления</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Всего товаров</h3>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Всего заказов</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Всего клиентов</h3>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                </div>

                <div className="text-center py-8">
                  <p className="text-gray-500">Добро пожаловать в панель администратора!</p>
                  <p className="text-gray-500">Используйте навигацию для управления магазином.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Добавить новый товар</h2>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название товара</Label>
                      <Input id="name" name="name" value={newProduct.name} onChange={handleNewProductChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Цена (₽)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={handleNewProductChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select value={newProduct.category} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spray-paint">Аэрозольная краска</SelectItem>
                          <SelectItem value="varnish">Лак</SelectItem>
                          <SelectItem value="primer">Грунтовка</SelectItem>
                          <SelectItem value="accessories">Аксессуары</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inventory">Количество на складе</Label>
                      <Input
                        id="inventory"
                        name="inventory"
                        type="number"
                        min="0"
                        value={newProduct.inventory}
                        onChange={handleNewProductChange}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleNewProductChange}
                        className="h-24"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        name="image"
                        value={newProduct.image}
                        onChange={handleNewProductChange}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2 h-full">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newProduct.featured}
                        onChange={handleFeaturedChange}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="featured">Рекомендуемый товар</Label>
                    </div>
                  </div>

                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить товар
                  </Button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Список товаров</h2>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Товары не найдены.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Изображение</TableHead>
                          <TableHead>Название</TableHead>
                          <TableHead>Категория</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>На складе</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>₽{product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.inventory}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Заказы</h2>

                <div className="text-center py-8 text-gray-500">
                  <p>Заказы не найдены.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Клиенты</h2>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Роль</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Администратор</TableCell>
                        <TableCell>admin@paintpro.com</TableCell>
                        <TableCell>Администратор</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <form onSubmit={handleUpdateProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Название товара</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleEditingProductChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-price">Цена (₽)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={editingProduct.price}
                    onChange={handleEditingProductChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-category">Категория</Label>
                  <Select value={editingProduct.category} onValueChange={handleEditingSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spray-paint">Аэрозольная краска</SelectItem>
                      <SelectItem value="varnish">Лак</SelectItem>
                      <SelectItem value="primer">Грунтовка</SelectItem>
                      <SelectItem value="accessories">Аксессуары</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-inventory">Количество на складе</Label>
                  <Input
                    id="edit-inventory"
                    name="inventory"
                    type="number"
                    min="0"
                    value={editingProduct.inventory}
                    onChange={handleEditingProductChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="edit-description">Описание</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleEditingProductChange}
                    className="h-24"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL изображения</Label>
                  <Input
                    id="edit-image"
                    name="image"
                    value={editingProduct.image}
                    onChange={handleEditingProductChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 h-full">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingProduct.featured}
                    onChange={handleEditingFeaturedChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="edit-featured">Рекомендуемый товар</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">Обновить товар</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
