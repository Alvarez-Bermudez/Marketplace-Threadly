/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { api } from "../../../api/client"
import type { ProductGetAll } from "./types"

export async function createProduct(data: FormData) {
  const res = await api.post("/admin/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res.data
}

export async function getProducts(
  page?: number,
  limit?: number,
  search?: string,
): Promise<{ data: ProductGetAll[]; meta: { total: number; page: number; lastPage: number } }> {
  let params: any = {}
  if (page) params.page = page
  if (limit) params.limit = limit
  if (search) params.search = search

  const res = await api.get("/products", { params })

  return res.data
}

export async function deleteProduct(id: string) {
  const res = await api.delete(`/admin/products/${id}`)

  return res.data
}
