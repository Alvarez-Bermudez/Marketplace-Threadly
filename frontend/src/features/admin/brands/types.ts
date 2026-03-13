import z from "zod"

export const createBrandSchema = z.object({
  name: z.string().min(1, "Field too short!"),
  photoData: z.any().refine((files) => files instanceof FileList && files.length === 1, {
    message: "Please select exactly one file",
  }),
})

export type CreateBrandInput = z.infer<typeof createBrandSchema>
