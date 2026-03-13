import AdminHeader from "./AdminHeader"
import ProtectedAdminRoute from "./ProtectedAdminRoute"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedAdminRoute>
      <div className="h-screen flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedAdminRoute>
  )
}
