import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const CreateProductButton = () => {
  return (
    <>
      <Link
        className="fixed right-5 bottom-5 inter-400 text-sm text-white px-4 py-3 gap-1.5 flex items-center justify-end rounded-full bg-primary-700 shadow-md hover:opacity-75 transition-all duration-300"
        to="/admin/products/create"
      >
        Add product
        <Plus size={20} color="white" />
      </Link>
    </>
  )
}

export default CreateProductButton
