import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"
import ModalCreateBrand from "../components/ModalCreateBrand"
import { getBrands } from "../api"
import CardBrand from "../components/CardBrand"
import { useState } from "react"
import ModalEditBrand from "../components/ModalEditBrand"
import ModalDeleteBrand from "../components/ModalRemoveBrand"

const BrandsPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")

  const [selectedBrandId, setSelectedBrandId] = useState<string>("")
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ["brands", page, search],
    queryFn: () => getBrands(page, 8, search),
  })

  const handleEdit = (brandId: string) => {
    setSelectedBrandId(brandId)
    setIsEditOpen(true)
  }

  const handleDelete = (brandId: string) => {
    setSelectedBrandId(brandId)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <div className="h-full flex-1 flex flex-col">
        <div className="p-2.5 flex justify-end border-b border-neutral-200">
          <Searchbar search={search} setSearch={setSearch} placeholder="Search brand..." />
        </div>
        <div className="flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <div className=" flex-1 ">
              <div className="items-stretch flex flex-wrap p-7.5 gap-8 justify-start">
                {data?.data &&
                  data.data.map((brand) => (
                    <CardBrand
                      brand={brand}
                      onEdit={() => handleEdit(brand.id)}
                      onDelete={() => handleDelete(brand.id)}
                    />
                  ))}
              </div>
            </div>
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
          <ModalCreateBrand />
        </div>
      </div>

      <ModalEditBrand brandId={selectedBrandId} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <ModalDeleteBrand brandId={selectedBrandId} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
    </>
  )
}

export default BrandsPage
