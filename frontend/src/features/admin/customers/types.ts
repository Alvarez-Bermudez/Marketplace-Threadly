type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export interface Item {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
  }
}

export interface Order {
  id: string
  total: number
  status: OrderStatus
  createdAt: string
  items: Item[]
}

export interface Customer {
  id: string
  name: string
  email: string
  registeredAt: string
  orders: Order[]
}

export interface CustomerAll {
  id: string
  name: string
  email: string
  registeredAt: string
  orders: {
    _count: number
  }
}

export type Customers = CustomerAll[]
