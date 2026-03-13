/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "../../../api/client"

export async function createBrand(data: { name: string; photoData: any }) {
  const res = await api.post("/admin/brands", data)

  //   console.log("A enviar. Name: ", data.name)
  //   console.log("A enviar. Photo: ", data.photoData)
  return res.data
}
