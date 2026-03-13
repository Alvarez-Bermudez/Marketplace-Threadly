import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"
import ModalCreateBrand from "../components/ModalCreateBrand"

const BrandsPage = () => {
  return (
    <>
      <div className="flex-1 h-full flex flex-col ">
        <div className="p-2.5 flex justify-end border-b border-neutral-200 ">
          <Searchbar placeholder="Search brand..." />
        </div>
        <div className=" flex flex-row flex-1">
          <AdminSidebar />
          <div className="flex-1 h-full"></div>
          <ModalCreateBrand />
        </div>
      </div>
    </>
  )
}

export default BrandsPage
