import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

const BrandsPage = () => {
  return (
    <div className="flex-1 h-full flex flex-col ">
      <div className="p-2.5 flex justify-end border-b border-neutral-200 ">
        <Searchbar placeholder="Search brand..." />
      </div>
      <div className="flex flex-row flex-1">
        <AdminSidebar />
      </div>
    </div>
  )
}

export default BrandsPage
