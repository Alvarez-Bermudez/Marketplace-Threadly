import z from "zod"

export const createProductSchema = z.object({
  name: z.string().min(2, "Field too short!"),
  slug: z.string().min(2, "Field too short!"),

  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  stock: z.number().positive(),

  brandId: z.string().optional(),
  categoryId: z.string(),
  typeId: z.string(),

  description: z.string().optional(),
  details: z.string().optional(),

  files: z
    .any()
    .optional()
    .refine((files) => !files || files instanceof FileList),

  // sizes: z.array,
})

export type CreateProductInput = z.infer<typeof createProductSchema>

export interface Image {
  id: string
  url: string
  productId: string
}

export interface Size {
  id: string
  stock: number
  size: string
  productId: string
}

export interface Color {
  id: string
  stock: number
  color: string
  productId: string
}

export interface ProductResponse {
  id: string
  name: string
  slug: string

  price: number
  discountPrice: number | null
  stock: number

  details: string
  description: string

  ratingAverage: number
  reviewCount: number

  createdAt: Date

  brandId: string
  categoryId: string
  typeId: string

  images: Image[]
  sizes: Size[]
  colors: Color[]
}

export interface ProductRequest {
  name: string
  slug: string

  price: number
  discountPrice?: number
  stock: number

  brandId: string
  categoryId: string
  typeId: string

  description?: string
  details?: string

  // images: File[]

  sizes: string //Json string. String array
  sizesStock: string //Json string. This array contains respective stock for every size. Same length that sizes[]

  colors: string //Json string. String array
  colorsStock: number //Json string. This array contains respective stock for every color. Same length that colors[]
}
