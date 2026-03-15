import { useState } from "react"
import type { CategoryResponse } from "../types"
import { MoreHorizontal } from "lucide-react"

interface TableCategoriesProps {
  categories: CategoryResponse[] | undefined
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
const TableCategories = ({ categories, handleEdit, handleDelete }: TableCategoriesProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Products Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((categ) => (
              <tr key={categ.id}>
                <td>{categ.name}</td>
                <td>{categ.productsQuantity.products}</td>
                <td>
                  <Menu id={categ.id} handleDelete={handleDelete} handleEdit={handleEdit} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

interface MenuProps {
  id: string
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
const Menu = ({ id, handleEdit, handleDelete }: MenuProps) => {
  const [visible, setVisible] = useState(false)

  const showMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const onEdit = () => {
    closeMenu()
    handleEdit(id)
  }
  const onDelete = () => {
    closeMenu()
    handleDelete(id)
  }
  return (
    <>
      <button onClick={showMenu}>
        <MoreHorizontal />
      </button>
      {visible && (
        <ul className="-translate-x-full absolute menu menu-vertical bg-base-200 rounded-box">
          <li>
            <button onClick={onEdit}>Edit</button>
          </li>
          <li>
            <button onClick={onDelete}>Remove</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default TableCategories
