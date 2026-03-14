import z from "zod"

export const createBrandSchema = z.object({
  name: z.string().min(1, "Field too short!"),
  photoData: z.any().refine((files) => files instanceof FileList && files.length === 1, {
    message: "Please select exactly one file",
  }),
})

export type CreateBrandInput = z.infer<typeof createBrandSchema>

export const updateBrandSchema = z.object({
  name: z.string().min(1, "Field too short!").optional(),
  photoData: z
    .any()
    .optional()
    .refine((files) => !files || (files instanceof FileList && (files.length === 0 || files.length === 1)), {
      message: "Please select exactly one file",
    }),
})

export type UpdateBrandInput = z.infer<typeof updateBrandSchema>

export interface Brand {
  id: string
  name: string
  imageUrl: string
}

export type Brands = Brand[]
