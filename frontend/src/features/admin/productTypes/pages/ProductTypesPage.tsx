import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import { getProductTypes } from "../api"
import TableProductTypes from "../components/TableProductTypes"
import ModalCreateProductType from "../components/ModalCreateProductType"
import ModalEditProductType from "../components/ModalEditProductType"
import ModalDeleteProductType from "../components/ModalDeleteProductType"

const ProductTypePage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const [selectedProductTypeId, setSelectedProductTypeId] = useState<string>("")
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ["product-types", page, search],
    queryFn: () => getProductTypes(page, 10, search),
  })

  const handleEdit = (productTypeId: string) => {
    setSelectedProductTypeId(productTypeId)
    setIsEditOpen(true)
  }

  const handleDelete = (brandId: string) => {
    setSelectedProductTypeId(brandId)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <div className="h-full flex-1 flex flex-col">
        <div className="p-2.5 flex justify-end border-b border-neutral-200">
          <Searchbar search={search} setSearch={setSearch} placeholder="Search product type by name..." />
        </div>
        <div className="flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-3 ">
              <TableProductTypes productTypes={data?.data} handleEdit={handleEdit} handleDelete={handleDelete} />
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
          <ModalCreateProductType />
        </div>
      </div>

      <ModalEditProductType productTypeId={selectedProductTypeId} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <ModalDeleteProductType productTypeId={selectedProductTypeId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
    </>
  )
}

export default ProductTypePage
