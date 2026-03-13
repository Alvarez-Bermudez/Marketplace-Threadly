import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to={"/login"} />
  }

  const userRole = JSON.parse(atob(token.split(".")[1])).role

  if (userRole === "admin") {
    return children
  }

  return null
}
