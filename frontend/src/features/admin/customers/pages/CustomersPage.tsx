import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import { getCustomers } from "../api"
import TableCustomers from "../components/TableCustomers"

const CustomersPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const { data } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: () => getCustomers(page, 10, search),
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
            <div className="flex-1 p-3">
              <TableCustomers customers={data?.data} />
            </div>

            {/* Pagination */}
            <div className="w-full p-4">
              <div className="join">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="join-item btn">
                  «
                </button>
                <button className="join-item btn">Page {page}</button>
                <button
                  disabled={page * 8 >= (data?.meta.total ?? 0)}
                  onClick={() => setPage((p) => p + 1)}
                  className="join-item btn"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomersPage
