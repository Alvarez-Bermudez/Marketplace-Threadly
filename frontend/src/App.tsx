import { Route, Routes } from "react-router-dom"
import LoginPage from "./features/auth/pages/LoginPage"
import BrandsPage from "./features/admin/brands/pages/BrandsPage"
import AdminLayout from "./components/AdminLayout"
import CategoriesPage from "./features/admin/categories/pages/CategoriesPage"

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
      <Route
        path="/admin/categories"
        element={
          <AdminLayout>
            <CategoriesPage />
          </AdminLayout>
        }
      />
    </Routes>
  )
}

export default App
