import { api } from "../../api/client"
import type { User } from "../../types/types"

export async function login(data: { email: string; password: string }) {
  const res = await api.post("auth/login", data)

  const token = res.data.access_token
  console.log("token", token)
  localStorage.setItem("token", token)

  return res.data
}

export async function logout() {
  localStorage.removeItem("token")
  window.location.href = "/login"
}

type getUserRoleReturns = "ADMIN" | "CUSTOMER" | null
export const getUserRole = (): getUserRoleReturns => {
  const token = localStorage.getItem("token")

  if (!token) return null

  const userRole = JSON.parse(atob(token.split(".")[1])).role

  return userRole
}

export async function getMe() {
  const res = await api.get<User>("auth/me")
  return res.data
}
