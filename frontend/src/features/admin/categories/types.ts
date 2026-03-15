import z from "zod"

export const createCategorySchema = z.object({
  name: z.string().min(2, "Field too short!"),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z.string().min(2, "Field too short!").optional(),
})

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>

export interface CategoryResponse {
  id: string
  name: string
  productsQuantity: { products: number }
}

export interface CategoryRequest {
  name: string
}
