export interface Review {
  id: string
  createdAt: Date
  rating: number
  comment: string
  userId: string
  productId: string
}

export type Reviews = Review[]

export type Role = "CUSTOMER" | "ADMIN"

export interface Order {
  id: string
  createdAt: Date
  userId: string
  total: number
  status: Role
}

export type Orders = Order[]

export interface Favorite {
  id: string
  userId: string
  productId: string
}

export type Favorites = Favorite[]

export interface User {
  id: string
  email: string
  name: string
  role: Role
  createdAt: Date
  orders: Orders
  reviews: Reviews
  favorites: Favorites
}
