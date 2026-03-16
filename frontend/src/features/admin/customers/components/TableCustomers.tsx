import { useState } from "react"
import type { Customers } from "../types"
import { MoreHorizontal } from "lucide-react"
import { formatDateUS } from "../../../../lib/utils"
import { Link } from "react-router-dom"

interface TableCustomersProps {
  customers: Customers | undefined
}
const TableCustomers = ({ customers }: TableCustomersProps) => {
  return (
    <div className="flex-1 h-full overflow-x-auto overflow-visible">
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Orders Quantity</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((custom) => (
              <tr key={custom.id} className="hover-transition">
                <td className="inter-400 text-neutral-900">
                  <div className="flex flex-col gap-1">
                    <p className="inter-500 text-neutral-900">{custom.name}</p>
                    <p className="inter-400 text-sm text-neutral-900">{custom.email}</p>
                  </div>
                </td>
                <td className="inter-400 text-neutral-900">{custom.orders._count}</td>
                <td className="inter-400 text-neutral-900">{formatDateUS(custom.registeredAt)}</td>
                <td className="text-center">
                  <Menu id={custom.id} />
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
}
const Menu = ({ id }: MenuProps) => {
  const [visible, setVisible] = useState(false)

  const showMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <>
      <button onClick={showMenu}>
        <MoreHorizontal className="text-nuetral-900" />
      </button>
      {visible && (
        <ul className="z-10 -translate-x-full absolute menu menu-vertical bg-base-200 rounded-box">
          <li>
            <Link to={`/admin/customers/${id}`} onClick={closeMenu}>
              View
            </Link>
          </li>
        </ul>
      )}
    </>
  )
}

export default TableCustomers
