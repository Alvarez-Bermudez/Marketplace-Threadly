import { api } from "../../../api/client"
import { type Brands } from "./types"

export async function createBrand(data: FormData) {
  const res = await api.post("/admin/brands", data)

  return res.data
}

export async function getBrands() {
  const res = await api.get<Brands>("/brands")

  return res.data
}
