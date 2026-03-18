import { useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBrands } from "../../brands/api"
import { BASE_URL } from "../../../../api/client"
import { getCategories } from "../../categories/api"

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
                  <div className="flex gap-6 w-full items-center">
                    <fieldset className="fieldset w-full max-w-100">
                      <legend className="fieldset-legend w-full">Name:</legend>
                      <input type="text" className="input w-full" placeholder="Slim Fit Denim Jacket" />
                      <p className="label">Required</p>
                    </fieldset>
                    <fieldset className="fieldset w-full max-w-100">
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

                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="space-y-0">
                      <p className="fieldset-legend text-xs">Brand:</p>
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 w-full">
                          Click to select Brand
                        </div>
                        <ul
                          tabIndex={-1}
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          {brands?.data.map((brand) => (
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
                    </div>

                    <div className="space-y-0">
                      <p className="fieldset-legend text-xs">Category:</p>
                      <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 w-full">
                          Click to select Category
                        </div>
                        <ul
                          tabIndex={-1}
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          {categories?.data.map((categ) => (
                            <li key={categ.id}>
                              <a>
                                <div className="flex gap-1.5">{categ.name}</div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
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
