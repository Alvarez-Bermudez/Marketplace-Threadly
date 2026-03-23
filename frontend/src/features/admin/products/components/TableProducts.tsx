import { useState } from "react"
import type { ProductGetAll } from "../types"
import { MoreHorizontal, Star } from "lucide-react"
import { formatCurrencyUSD, formatNumberUS } from "../../../../lib/utils"
import { BASE_URL } from "../../../../api/client"
import { Link } from "react-router-dom"

interface TableProductsProps {
  products: ProductGetAll[] | undefined
  handleDelete: (id: string) => void
}
const TableProducts = ({ products, handleDelete }: TableProductsProps) => {
  return (
    <div className="flex-1 h-full items-start flex overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th className="inter-500"></th>
            <th className="inter-500"></th>
            <th className="inter-500">Name</th>
            <th className="inter-500">Price</th>
            <th className="inter-500">Stock</th>
            <th className="inter-500">No Orders</th>
            <th className="inter-500">Category</th>
            <th className="inter-500">Rating Average</th>
            <th className="inter-500">Review Count</th>
            <th className="inter-500"></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((prod, i) => (
              <tr key={prod.id} className="hover:bg-neutral-050 transition-all duration-400">
                <th className="inter-400">{i + 1}</th>
                <th className="inter-400">
                  <img src={`${BASE_URL}/${prod.coverImage}`} width={40} height={40} loading="lazy" />
                </th>
                <th className="inter-500">{prod.name}</th>
                <th className="inter-400">
                  <div className="flex flex-col gap-1">
                    <span className="">{formatCurrencyUSD(prod.price)}</span>
                    {prod.discountPrice && (
                      <div className="px-0.5 py-1 rounded-full bg-red-400  flex items-center justify-center">
                        <span className="text-white inter-500 text-xs">-{formatCurrencyUSD(prod.discountPrice)} </span>
                      </div>
                    )}
                  </div>
                </th>
                <th className="inter-400">{formatNumberUS(prod.stock)}</th>
                <th className="inter-400">{formatNumberUS(prod.orderNumber)}</th>
                <th className="inter-400">{prod.category}</th>
                <th>
                  <div className="flex gap-1">
                    <Star size={20} color={"oklch(90.5% 0.182 98.111)"} className="text-yellow-300" />
                    <span className="inter-400">{prod.ratingAverage}</span>
                  </div>
                </th>
                <th className="inter-400">{formatNumberUS(prod.reviewCount)}</th>
                <th>
                  <Menu id={prod.id} handleDelete={handleDelete} />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

interface MenuProps {
  id: string
  handleDelete: (id: string) => void
}
const Menu = ({ id, handleDelete }: MenuProps) => {
  const [visible, setVisible] = useState(false)

  const showMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const onDelete = () => {
    closeMenu()
    handleDelete(id)
  }
  return (
    <>
      <button onClick={showMenu}>
        <MoreHorizontal className="text-nuetral-900" />
      </button>
      {visible && (
        <ul className="z-10 -translate-x-full absolute menu menu-vertical bg-base-200 rounded-box">
          <li>
            <Link to={`/admin/products/edit/${id}`} className="inter-400 flex items-center w-full">
              Edit
            </Link>
          </li>
          <li>
            <li>
              <button onClick={onDelete} className="inter-400 flex items-center w-full p-0">
                Remove
              </button>
            </li>
          </li>
        </ul>
      )}
    </>
  )
}

export default TableProducts
