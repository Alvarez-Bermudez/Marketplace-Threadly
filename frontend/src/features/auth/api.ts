import { api } from "../../api/client"

export async function login(data: { email: string; password: string }) {
  const res = await api.post("auth/login", data)

  const token = res.data.access_token

  localStorage.setItem("token", token)

  return res.data
}
