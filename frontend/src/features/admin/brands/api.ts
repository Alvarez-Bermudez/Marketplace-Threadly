/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { api } from "../../../api/client"
import { type Brand, type Brands } from "./types"

export async function createBrand(data: FormData) {
  const res = await api.post("/admin/brands", data)

  return res.data
}

export async function getBrands(
  page?: number,
  limit?: number,
  search?: string,
): Promise<{ data: Brands; meta: { total: number; page: number; lastPage: number } }> {
  let params: any = {}
  if (page) params.page = page
  if (limit) params.limit = limit
  if (search) params.brand = search

  const res = await api.get("/brands", { params })

  return res.data
}

export async function getBrand(id: string) {
  const res = await api.get<Brand>(`/brands/${id}`)

  return res.data
}

export async function updateBrand(id: string, data: FormData) {
  const res = await api.patch(`/admin/brands/${id}`, data)
  return res.data
}
