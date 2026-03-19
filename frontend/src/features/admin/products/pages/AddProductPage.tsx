import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { Link } from "react-router-dom"
import { getBrands } from "../../brands/api"
import { BASE_URL } from "../../../../api/client"
import { getCategories } from "../../categories/api"
import type { Brands } from "../../brands/types"
import type { CategoryResponse } from "../types"
import { ChromePicker } from "react-color"
import { Check, Plus } from "lucide-react"

const AddProductPage = () => {
  const [search, setSearch] = useState<string>("")

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })

  const { data: types } = useQuery({
    queryKey: ["types"],
  })

  return (
    <>
      <div className="h-full flex-1 flex flex-col w-full ">
        <div className="p-2.5 flex justify-end border-b border-neutral-200">
          <Searchbar search={search} setSearch={setSearch} placeholder="Search product..." />
        </div>
        <div className="flex flex-row flex-1 w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col w-full">
            <div className="flex-1 flex flex-col p-3 gap-2 w-full">
              <Breadcrumbs />

              {/* Form */}

              <div className="flex-1 flex flex-col">
                <div className=" flex flex-col gap-1.5 w-full p-2 justify-start">
                  <div className="flex flex-col gap-1 w-full">
                    <fieldset className="fieldset w-full max-w-120">
                      <legend className="fieldset-legend w-full">Name:</legend>
                      <input type="text" className="input w-full" placeholder="Slim Fit Denim Jacket" />
                      <p className="label">Required</p>
                    </fieldset>
                    <fieldset className="fieldset w-full max-w-120">
                      <legend className="fieldset-legend w-full">Slug:</legend>
                      <input type="text" className="input w-full" placeholder="slim-fit-denim-jacket" />
                      <p className="label">Required</p>
                    </fieldset>
                  </div>

                  <div className="grid grid-cols-3 gap-6 w-full">
                    <fieldset className="fieldset w-full max-w-100">
                      <legend className="fieldset-legend w-full">Price ($):</legend>
                      <input type="text" className="input w-full" placeholder="12.45" />
                      <p className="label">Required</p>
                    </fieldset>
                    <fieldset className="fieldset w-full max-w-100">
                      <legend className="fieldset-legend w-full">Discount Price ($):</legend>
                      <input type="text" className="input w-full" placeholder="1.50" />
                      <p className="label">Optional</p>
                    </fieldset>
                    <fieldset className="fieldset w-full max-w-100">
                      <legend className="fieldset-legend w-full">Stock:</legend>
                      <input type="text" className="input w-full" placeholder="35" />
                      <p className="label">Required</p>
                    </fieldset>
                  </div>

                  <div className="flex gap-6 w-full ">
                    <div className="space-y-0">
                      <p className="fieldset-legend text-xs">Brand:</p>
                      <DropwdownBrand brands={brands?.data} />
                    </div>

                    <div className="space-y-0">
                      <p className="fieldset-legend text-xs">Category:</p>
                      <DropdownCategory categories={categories?.data} />
                    </div>

                    <div className="space-y-0">
                      <p className="fieldset-legend text-xs">Types:</p>
                      <DropdownCategory categories={categories?.data} />
                    </div>
                  </div>

                  <div className="flex gap-6 w-full items-stretch">
                    <div className="flex flex-col ">
                      <p className="fieldset-legend text-xs">Sizes:</p>
                      <BadgesSizesSelector />
                    </div>

                    <div className="flex flex-col ">
                      <p className="fieldset-legend text-xs">Colors:</p>
                      <ColorsSelector />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ColorsSelector = () => {
  const [colors, setColors] = useState<string[]>([])
  const [localColor, setLocalColor] = useState<string>("") //State used for select with the picker, on success add to colors
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>()

  const showPicker = () => setIsPickerVisible(true)
  const hidePicker = () => setIsPickerVisible(false)

  const addColor = () => {
    const colorSelected = localColor
    if (!colors.includes(colorSelected)) {
      setColors([...colors, colorSelected])
    }
    hidePicker()
  }
  return (
    <div className="flex gap-1.5 h-full items-center">
      {colors.map((color) => (
        <div key={color} className="rounded-full size-4" style={{ backgroundColor: color }} />
      ))}
      {!isPickerVisible && (
        <button onClick={showPicker}>
          <Plus className="text-success size-4 cursor-pointer" />
        </button>
      )}

      {isPickerVisible && (
        <button onClick={addColor}>
          <Check className="text-primary-500 size-4 cursor-pointer" />
        </button>
      )}

      {isPickerVisible && (
        <ChromePicker
          className="absolute translate-y-[60%]"
          color={localColor}
          onChange={(updated) => {
            setLocalColor(updated.hex)
          }}
        />
      )}
    </div>
  )
}

const BadgesSizesSelector = () => {
  const [sizes, setSizes] = useState<string[]>([])

  const Badge = ({
    label,
    sizes,
    setSizes,
  }: {
    label: string
    sizes: string[]
    setSizes: Dispatch<SetStateAction<string[]>>
  }) => {
    const isSelected = sizes.includes(label)

    const handleClick = () => {
      if (isSelected) {
        setSizes((sizes) => sizes.filter((i) => i !== label))
      } else {
        setSizes((sizes) => [...sizes.filter((i) => i !== label), label])
      }
    }

    return (
      <div
        className={`flex items-center justify-center px-4.5 py-1 rounded-full  hover:shadow-lg transition-all duration-300 inter-400 text-sm text-nuetral-900 cursor-pointer ${isSelected ? "bg-primary-500 text-white" : "border border-neutral-200"}`}
        onClick={handleClick}
      >
        {label}
      </div>
    )
  }

  useEffect(() => {
    console.log(sizes)
  }, [sizes])
  return (
    <div className="flex gap-1.5">
      <Badge label="XS" sizes={sizes} setSizes={setSizes} />
      <Badge label="S" sizes={sizes} setSizes={setSizes} />
      <Badge label="M" sizes={sizes} setSizes={setSizes} />
      <Badge label="L" sizes={sizes} setSizes={setSizes} />
      <Badge label="XL" sizes={sizes} setSizes={setSizes} />
      <Badge label="XXL" sizes={sizes} setSizes={setSizes} />
    </div>
  )
}

const DropdownCategory = ({ categories }: { categories: CategoryResponse[] | undefined }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 w-full">
        Click to select Category
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {categories &&
          categories.map((categ) => (
            <li key={categ.id}>
              <a>
                <div className="flex gap-1.5">{categ.name}</div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

const DropwdownBrand = ({ brands }: { brands: Brands | undefined }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 w-full">
        Click to select Brand
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {brands &&
          brands.map((brand) => (
            <li key={brand.id}>
              <a>
                <div className="flex gap-1.5">
                  <img src={`${BASE_URL}${brand.imageUrl}`} width={20} />
                  {brand.name}
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <ul>
        <li>
          <Link to="/admin/products" className="text-base inter-400 ">
            Products
          </Link>
        </li>
        <li>
          <a className="text-base inter-400 ">Create</a>
        </li>
      </ul>
    </div>
  )
}
export default AddProductPage
