import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"
import ModalCreateBrand from "../components/ModalCreateBrand"
import { getBrands } from "../api"
import CardBrand from "../components/CardBrand"

const BrandsPage = () => {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  })

  return (
    <>
      <div className="flex-1 h-full flex flex-col ">
        <div className="p-2.5 flex justify-end border-b border-neutral-200 ">
          <Searchbar placeholder="Search brand..." />
        </div>
        <div className=" flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 h-full">
            <div className="h-fit items-stretch flex-1 flex flex-wrap p-7.5 gap-8 justify-start">
              {brands && brands.map((brand) => <CardBrand brand={brand} />)}
            </div>
          </div>
          <ModalCreateBrand />
        </div>
      </div>
    </>
  )
}

export default BrandsPage
