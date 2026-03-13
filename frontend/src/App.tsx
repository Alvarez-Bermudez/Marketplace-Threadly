import { Route, Routes } from "react-router-dom"
import LoginPage from "./features/auth/pages/LoginPage"
import BrandsPage from "./features/admin/brands/pages/BrandsPage"
import AdminLayout from "./components/AdminLayout"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin/brands"
        element={
          <AdminLayout>
            <BrandsPage />
          </AdminLayout>
        }
      />
    </Routes>
  )
}

export default App
