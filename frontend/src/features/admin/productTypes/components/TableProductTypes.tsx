import { useState } from "react"
import type { ProductTypeResponse } from "../types"
import { MoreHorizontal } from "lucide-react"

interface TableProductTypesProps {
  productTypes: ProductTypeResponse[] | undefined
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
const TableProductTypes = ({ productTypes, handleEdit, handleDelete }: TableProductTypesProps) => {
  return (
    <div className="flex-1 h-full overflow-x-auto overflow-visible">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Products Quantity</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productTypes &&
            productTypes.map((type) => (
              <tr key={type.id} className="hover-transition">
                <td className="inter-400 text-neutral-900">{type.name}</td>
                <td className="text-center inter-400 text-neutral-900">{type.productsQuantity.products}</td>
                <td className="text-center">
                  <Menu id={type.id} handleDelete={handleDelete} handleEdit={handleEdit} />
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
        <MoreHorizontal className="text-neutral-900" />
      </button>
      {visible && (
        <ul className="z-10 -translate-x-full absolute menu menu-vertical bg-base-200 rounded-box">
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

export default TableProductTypes
