import { api } from "../../../api/client"

export async function createProduct(data: FormData) {
  const res = await api.post("/admin/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res.data
}
