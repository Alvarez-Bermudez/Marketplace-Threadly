import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import ModalEditCategory from "../components/ModalEditCategory"
import ModalDeleteCategory from "../components/ModalDeleteCategory"
import TableCategories from "../components/TableCategories"
import ModalCreateCategory from "../components/ModalCreateCategory"
import { getCategories } from "../api"

const CategoriesPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ["categories", page, search],
    queryFn: () => getCategories(page, 10, search),
  })

  const handleEdit = (brandId: string) => {
    setSelectedCategoryId(brandId)
    setIsEditOpen(true)
  }

  const handleDelete = (brandId: string) => {
    setSelectedCategoryId(brandId)
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
            <div className=" flex-1 ">
              <TableCategories categories={data?.data} handleEdit={handleEdit} handleDelete={handleDelete} />
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
          <ModalCreateCategory />
        </div>
      </div>

      <ModalEditCategory categoryId={selectedCategoryId} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <ModalDeleteCategory categoryId={selectedCategoryId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
    </>
  )
}

export default CategoriesPage
