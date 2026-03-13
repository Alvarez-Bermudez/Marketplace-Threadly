import { Navigate } from "react-router-dom"
import { getUserRole } from "../features/auth/api"

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to={"/login"} />
  }

  const userRole = getUserRole()

  if (userRole === "ADMIN") {
    return children
  }

  return null
}
