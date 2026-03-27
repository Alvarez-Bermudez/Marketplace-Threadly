import { useMutation, useQuery } from "@tanstack/react-query"
import AdminSidebar from "../../../../components/AdminSidebar"
import Searchbar from "../../../../components/Searchbar"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBrands } from "../../brands/api"
import { getCategories } from "../../categories/api"
import { Plus } from "lucide-react"
import { getProductTypes } from "../../productTypes/api"
import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { queryClient } from "../../../../lib/queryClient"
import { createProductSchema, type CreateProductInput } from "../types"
import Breadcrumbs from "../components/create-product/Breadcrumbs"
import DropdownCategory from "../components/create-product/DropdownCategory"
import DropdownBrand from "../components/create-product/DropdownBrand"
import DropdownProductTypes from "../components/create-product/DropdownProductTypes"
import { createProduct } from "../api"
import SizeSelector from "../components/create-product/SizesColorsSelector"

//Note: use headers: {"Content-Type": "multipart/form-data"}
const AddProductPage = () => {
  const [search, setSearch] = useState<string>("") //Unused but keept for ui reasons

  // useEffect(() => {
  //   console.log(colors)
  //   console.log(colorsStock)
  // }, [colors, colorsStock])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })

  const navigate = useNavigate()

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  })

  const { data: productTypes } = useQuery({
    queryKey: ["product-types"],
    queryFn: () => getProductTypes(),
  })

  const mutation = useMutation({
    mutationFn: (data: CreateProductInput) => {
      const formData = new FormData()

      formData.append("name", data.name)
      formData.append("slug", data.slug)
      formData.append("price", data.price.toString())
      if (data.discountPrice) {
        formData.append("discountPrice", data.discountPrice.toString())
      }
      formData.append("stock", data.stock.toString())
      if (data.brandId) {
        formData.append("brandId", data.brandId)
      }
      formData.append("categoryId", data.categoryId)
      formData.append("typeId", data.typeId)
      if (data.description) {
        formData.append("description", data.description)
      }
      if (data.details) {
        formData.append("details", data.details)
      }

      if (data.files) {
        Array.from(data.files).forEach((file) => {
          formData.append("files", file as Blob)
        })
      }

      //Pass sizes and sizesStock
      // const _sizesStock = sizesStock.filter((i) => i !== 0).map((i) => Math.abs(i)) //Remove the zeros. And avoid pass negative values, transforming them to positive
      // if (sizes.length == _sizesStock.length && sizes.length > 0) {
      //   formData.append("sizes", JSON.stringify(sizes))
      //   formData.append("sizesStock", JSON.stringify(_sizesStock))
      // }

      //Pass colors and colorsStock
      // const _colorsStock = colorsStock.filter((i) => i !== 0).map((i) => Math.abs(i)) //Remove the zeros. And avoid pass negative values, transforming them to positive values
      // if (colors.length == _colorsStock.length && colors.length > 0) {
      //   formData.append("colors", JSON.stringify(colors))
      //   formData.append("colorsStock", JSON.stringify(_colorsStock))
      // }

      console.log(JSON.stringify(formData, null, 2))
      return createProduct(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      navigate("/admin/products")
    },
    onError: (e) => {
      console.log(e.message)
    },
  })

  const isPending = mutation.isPending

  const onSubmit = (data: CreateProductInput) => {
    mutation.mutate(data)
  }

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
                <div className=" flex flex-col gap-3 w-full p-2 justify-start">
                  <div className="flex flex-col gap-1 w-full">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="fieldset w-full max-w-120">
                          <legend className="fieldset-legend w-full">Name:</legend>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="input w-full"
                            placeholder="Slim Fit Denim Jacket"
                          />
                          {errors.name && <p className="text-sm text-danger-500">{errors.name.message}</p>}
                          <p className="label">Required</p>
                        </fieldset>
                      )}
                    />

                    <Controller
                      control={control}
                      name="slug"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="fieldset w-full max-w-120">
                          <legend className="fieldset-legend w-full">Slug:</legend>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="input w-full"
                            placeholder="slim-fit-denim-jacket"
                          />
                          {errors.slug && <p className="text-sm text-danger-500">{errors.slug.message}</p>}
                          <p className="label">Required</p>
                        </fieldset>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-6 w-full">
                    <Controller
                      control={control}
                      name="price"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="fieldset w-full max-w-100">
                          <legend className="fieldset-legend w-full">Price ($):</legend>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="input w-full"
                            placeholder="12.45"
                          />
                          {errors.price && <p className="text-sm text-danger-500">{errors.price.message}</p>}
                          <p className="label">Required</p>
                        </fieldset>
                      )}
                    />

                    <Controller
                      control={control}
                      name="discountPrice"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="fieldset w-full max-w-100">
                          <legend className="fieldset-legend w-full">Discount Price ($):</legend>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="input w-full"
                            placeholder="1.50"
                          />
                          {errors.discountPrice && (
                            <p className="text-sm text-danger-500">{errors.discountPrice.message}</p>
                          )}
                          <p className="label">Optional</p>
                        </fieldset>
                      )}
                    />

                    <Controller
                      control={control}
                      name="stock"
                      render={({ field: { onChange, value } }) => (
                        <fieldset className="fieldset w-full max-w-100">
                          <legend className="fieldset-legend w-full">Stock:</legend>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="input w-full"
                            placeholder="35"
                          />
                          {errors.stock && <p className="text-sm text-danger-500">{errors.stock.message}</p>}

                          <p className="label">Required</p>
                        </fieldset>
                      )}
                    />
                  </div>

                  <div className="flex gap-6 w-full ">
                    <Controller
                      control={control}
                      name="categoryId"
                      render={({ field: { onChange } }) => (
                        <div className="space-y-0">
                          <p className="fieldset-legend text-xs">Category:</p>
                          <DropdownCategory categories={categories?.data} onChange={onChange} />
                        </div>
                      )}
                    />

                    <Controller
                      control={control}
                      name="brandId"
                      render={({ field: { onChange } }) => (
                        <div className="space-y-0">
                          <p className="fieldset-legend text-xs">Brand:</p>
                          <DropdownBrand brands={brands?.data} onChange={onChange} />
                        </div>
                      )}
                    />

                    <Controller
                      control={control}
                      name="typeId"
                      render={({ field: { onChange } }) => (
                        <div className="space-y-0">
                          <p className="fieldset-legend text-xs">Types:</p>
                          <DropdownProductTypes productTypes={productTypes?.data} onChange={onChange} />
                        </div>
                      )}
                    />

                    <Controller
                      control={control}
                      name="files"
                      render={({ field: { onChange } }) => (
                        <div className="space-y-0">
                          <p className="fieldset-legend text-xs">Images:</p>
                          <input
                            type="file"
                            multiple
                            className="file-input"
                            onChange={(e) => onChange(e.target.files)}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex gap-6 w-full items-stretch">
                    <SizeSelector />
                  </div>

                  <div>
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <div className="flex flex-col gap-1">
                          <textarea
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            className="textarea w-full max-w-150"
                            placeholder="Description"
                          />
                          {errors.description && (
                            <p className="text-sm text-danger-500">{errors.description.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      control={control}
                      name="details"
                      render={({ field: { onChange, value } }) => (
                        <div className="flex flex-col gap-1">
                          <textarea
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            className="textarea"
                            placeholder="Details"
                          />
                          {errors.details && <p className="text-sm text-danger-500">{errors.details.message}</p>}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending}
                  className="fixed right-5 bottom-5 inter-400 text-sm text-white px-4 py-3 gap-1.5 flex items-center justify-end rounded-full bg-primary-700 shadow-md hover:opacity-75 transition-all duration-300"
                >
                  Add product
                  <Plus size={20} color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProductPage
