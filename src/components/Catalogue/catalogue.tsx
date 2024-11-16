'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Edit, Trash2 } from 'lucide-react'

// Mock data for products
const mockProducts = [
  { id: 1, name: "Product 1", price: 19.99, stock: 50, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Product 2", price: 29.99, stock: 30, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Product 3", price: 39.99, stock: 0, image: "/placeholder.svg?height=100&width=100" },
]

export function CatalogueComponent() {
  const [products, setProducts] = useState(mockProducts)
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 100], stockStatus: '' })

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }])
  }

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(products.map(product => product.id === id ? { ...product, ...updatedProduct } : product))
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === '' || product.category === filters.category) &&
      (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) &&
      (filters.stockStatus === '' || 
        (filters.stockStatus === 'in-stock' && product.stock > 0) ||
        (filters.stockStatus === 'out-of-stock' && product.stock === 0))
    )
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catalogue</h1>
      <div className="flex justify-between items-center mb-4">
        <Filters filters={filters} setFilters={setFilters} />
        <AddProductDialog onAddProduct={handleAddProduct} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  )
}

function Filters({ filters, setFilters }) {
  return (
    <div className="flex space-x-4">
      <Select
        value={filters.category}
        onValueChange={(value) => setFilters({ ...filters, category: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="books">Books</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.stockStatus}
        onValueChange={(value) => setFilters({ ...filters, stockStatus: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stock status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="in-stock">In Stock</SelectItem>
          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-[200px]">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={filters.priceRange}
          onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
        />
        <div className="flex justify-between text-sm">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {product.name}
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(product.id, product)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(product.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
        <p className="font-bold">${product.price.toFixed(2)}</p>
        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </Badge>
      </CardContent>
    </Card>
  )
}

function AddProductDialog({ onAddProduct }) {
  const [step, setStep] = useState(1)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '', tags: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddProduct(newProduct)
    setNewProduct({ name: '', price: '', stock: '', image: '', tags: '' })
    setStep(1)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details of your new product. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={`step${step}`} onValueChange={(value) => setStep(parseInt(value.replace('step', '')))}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="step1">Basic Info</TabsTrigger>
              <TabsTrigger value="step2">Additional Info</TabsTrigger>
            </TabsList>
            <TabsContent value="step1">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="step2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Feature Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newProduct.tags}
                    onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="stock-alert" />
                  <Label htmlFor="stock-alert">Enable stock alert</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}