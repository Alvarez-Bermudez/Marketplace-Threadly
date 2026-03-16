/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { api } from "../../../api/client"
import type { Customer, Customers } from "./types"

export async function getCustomers(
  page?: number,
  limit?: number,
  search?: string,
): Promise<{ data: Customers; meta: { total: number; page: number; lastPage: number } }> {
  let params: any = {}
  if (page) params.page = page
  if (limit) params.limit = limit
  if (search) params.search = search

  const res = await api.get("/admin/customers", { params })

  return res.data
}

export async function getCustomer(id: string) {
  const res = await api.get<Customer>(`/admin/customers/${id}`)

  return res.data
}
