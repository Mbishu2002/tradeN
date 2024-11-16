'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'

// Mock data for orders
const mockOrders = [
  { id: 1, customer: "John Doe", status: "Pending", date: new Date(), product: "Product 1", urgent: true },
  { id: 2, customer: "Jane Smith", status: "Approved", date: new Date(), product: "Product 2", urgent: false },
  { id: 3, customer: "Bob Johnson", status: "Shipped", date: new Date(), product: "Product 3", urgent: false },
]

const orderStatuses = ["Pending", "Approved", "Shipped", "Delivered"]

export function OrdersComponent() {
  const [orders, setOrders] = useState(mockOrders)
  const [filters, setFilters] = useState({ status: '', date: '', product: '' })

  const handleStatusUpdate = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    return (
      (filters.status === '' || order.status === filters.status) &&
      (filters.date === '' || format(order.date, 'yyyy-MM-dd') === filters.date) &&
      (filters.product === '' || order.product.toLowerCase().includes(filters.product.toLowerCase()))
    )
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell>{format(order.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusUpdate(order.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Filters({ filters, setFilters }) {
  return (
    <div className="flex space-x-4">
      <div>
        <Label htmlFor="status-filter">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {orderStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date-filter">Date</Label>
        <Input
          id="date-filter"
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="product-filter">Product</Label>
        <Input
          id="product-filter"
          type="text"
          placeholder="Filter by product"
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
        />
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const getVariant = () => {
    switch (status) {
      case 'Pending': return 'default'
      case 'Approved': return 'secondary'
      case 'Shipped': return 'primary'
      case 'Delivered': return 'success'
      default: return 'default'
    }
  }

  return (
    <Badge variant={getVariant()}>{status}</Badge>
  )
}