import React from "react"
import type { Brand } from "../types"
import { BASE_URL } from "../../../../api/client"
import { Pencil, Trash } from "lucide-react"

interface CardBrandProps {
  brand: Brand
}
const CardBrand = ({ brand }: CardBrandProps) => {
  return (
    <div
      key={brand.id}
      className="w-full flex-1 max-h-35.5 max-w-51.25 flex flex-col gap-1 p-2.5 justify-between  border border-neutral-200 rounded-sm hover:shadow-sm transition-all duration-300"
    >
      <div className="px-7.5 py-2.5 gap-1 flex justify-center items-center">
        <img src={`${BASE_URL}${brand.imageUrl.replace("public", "")}`} width={70} height={70} />
        <p className="inter-500 text-neutral-900">{brand.name}</p>
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        <button className="flex justify-center items-center px-2 py-1 gap-1 rounded-sm border border-neutral-200 hover:bg-neutral-100 transition-all duration-300 cursor-pointer">
          <Pencil size={20} className="text-neutral-800" />
          <span className="text-sm inter-500 text-neutral-900">Edit</span>
        </button>
        <button className="flex justify-center items-center px-2 py-1 gap-1 rounded-sm border border-danger-200 hover:bg-danger-050 transition-all duration-300 cursor-pointer">
          <Trash size={20} className="text-danger-500" />
          <span className="text-sm inter-500 text-danger-500">Remove</span>
        </button>
      </div>
    </div>
  )
}

export default CardBrand
