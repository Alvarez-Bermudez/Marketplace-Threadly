import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import { getProducts } from "../api"
import TableProducts from "../components/TableProducts"
import CreateProductButton from "../components/ModalCreateCategory"
import ModalDeleteProduct from "../components/ModalDeleteProduct"

const ProductsPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const { data } = useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts(page, 10, search),
  })

  const [selectedProductId, setSelectedProductId] = useState<string>("")
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleDelete = (categoryId: string) => {
    setSelectedProductId(categoryId)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <div className="h-full flex-1 flex flex-col">
        <div className="p-2.5 flex justify-end border-b border-neutral-200">
          <Searchbar search={search} setSearch={setSearch} placeholder="Search category..." />
        </div>
        <div className="flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-3 ">
              <TableProducts products={data?.data} handleDelete={handleDelete} />
            </div>

            {/* Pagination */}
            <div className="w-full p-4">
              <div className="join">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="join-item btn">
                  «
                </button>
                <button className="join-item btn">Page {page}</button>
                <button
                  disabled={page * 10 >= (data?.meta.total ?? 0)}
                  onClick={() => setPage((p) => p + 1)}
                  className="join-item btn"
                >
                  »
                </button>
              </div>
            </div>
          </div>
          <CreateProductButton />
        </div>
      </div>
      <ModalDeleteProduct productId={selectedProductId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
    </>
  )
}

export default ProductsPage
