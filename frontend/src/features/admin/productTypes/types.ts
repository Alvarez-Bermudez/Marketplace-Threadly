import z from "zod"

export const createProductTypeSchema = z.object({
  name: z.string().min(1, "Field too short!"),
})

export type CreateProductTypeInput = z.infer<typeof createProductTypeSchema>

export const updateProductTypeSchema = z.object({
  name: z.string().min(1, "Field too short!").optional(),
})

export type UpdateProductTypeInput = z.infer<typeof updateProductTypeSchema>

export interface ProductTypeResponse {
  id: string
  name: string
  productsQuantity: { products: number }
}

export interface ProductTypeRequest {
  name: string
}
