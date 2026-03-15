/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { api } from "../../../api/client"
import { type CategoryRequest, type CategoryResponse } from "./types"

export async function createCategory(data: CategoryRequest) {
  const res = await api.post("/admin/categories", data)

  return res.data
}

export async function getCategories(
  page?: number,
  limit?: number,
  search?: string,
): Promise<{ data: CategoryResponse[]; meta: { total: number; page: number; lastPage: number } }> {
  let params: any = {}
  if (page) params.page = page
  if (limit) params.limit = limit
  if (search) params.search = search

  const res = await api.get("/categories", { params })

  return res.data
}

export async function getCategory(id: string) {
  const res = await api.get<CategoryResponse>(`/categories/${id}`)

  return res.data
}

export async function updateCategory(id: string, data: Partial<CategoryRequest>) {
  const res = await api.patch(`/admin/categories/${id}`, data)
  return res.data
}

export async function deleteCategory(id: string) {
  const res = await api.delete(`/admin/categories/${id}`)

  return res.data
}
