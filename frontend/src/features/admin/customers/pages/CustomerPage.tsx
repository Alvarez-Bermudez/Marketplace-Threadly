import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import { getCustomer } from "../api"
import { useParams } from "react-router-dom"
import { formatCurrencyUSD, formatDateShort } from "../../../../lib/utils"
import type { Order } from "../types"

const CustomerPage = () => {
  const [search, setSearch] = useState<string>("")
  const { id } = useParams<{ id: string }>()
  console.log(id)

  const { data } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer(id!),
  })

  return (
    <>
      <div className="h-full flex-1 flex flex-col">
        <div className="p-2.5 flex justify-end border-b border-neutral-200">
          <Searchbar search={search} setSearch={setSearch} placeholder="Search by name or email..." />
        </div>
        <div className="flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col p-5 gap-4.5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h2 className="inter-500 text-xl text-neutral-900">{data?.name}</h2>
                  <span className="inter-400 text-primary-500">{data?.email}</span>
                </div>
                <span className="text-sm inter-400 text-neutral-900">
                  Joined on {formatDateShort(data?.registeredAt)}
                </span>
              </div>
              <OrdersView orders={data?.orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface OrdersViewProps {
  orders: Order[] | undefined
}
const OrdersView = ({ orders }: OrdersViewProps) => {
  return (
    <>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">Orders</div>
        <div className="collapse-content text-sm flex flex-col gap-2.5">
          <p>smosok</p>
          {orders &&
            orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-2.5 p-4 border border-neutral-200 rounded-sm">
                <div className="flex items-center gap-1">
                  <p className="inter-400 text-neutral-600">Id:</p>
                  <p className="inter-400 text-neutral-900">{order.id.slice(0, 15)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="inter-400 text-neutral-600">Total:</p>
                  <p className="inter-400 text-neutral-900">{formatCurrencyUSD(order.total)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="inter-400 text-neutral-600">Satus:</p>
                  <p className="inter-400 text-neutral-900">{order.status}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="inter-400 text-neutral-600">Date:</p>
                  <p className="inter-400 text-neutral-900">{formatDateShort(order.createdAt)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
export default CustomerPage
