import { api } from "../../../api/client"

export async function createBrand(data: FormData) {
  const res = await api.post("/admin/brands", data)

  return res.data
}
