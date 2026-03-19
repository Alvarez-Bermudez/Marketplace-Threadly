/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { api } from "../../../api/client"
import type { ProductTypeRequest, ProductTypeResponse } from "./types"

export async function createProductType(data: ProductTypeRequest) {
  const res = await api.post("/admin/product-types", data)

  return res.data
}

export async function getProductTypes(
  page?: number,
  limit?: number,
  search?: string,
): Promise<{ data: ProductTypeResponse[]; meta: { total: number; page: number; lastPage: number } }> {
  let params: any = {}
  if (page) params.page = page
  if (limit) params.limit = limit
  if (search) params.search = search

  const res = await api.get("/product-types", { params })

  return res.data
}

export async function getProductType(id: string) {
  const res = await api.get<ProductTypeResponse>(`/product-types/${id}`)

  return res.data
}

export async function updateProductType(id: string, data: Partial<ProductTypeRequest>) {
  const res = await api.patch(`/admin/product-types/${id}`, data)
  return res.data
}

export async function deleteProductType(id: string) {
  const res = await api.delete(`/admin/product-types/${id}`)

  return res.data
}
