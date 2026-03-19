import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { type UpdateProductTypeInput, updateProductTypeSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getProductType, updateProductType } from "../api"
import { queryClient } from "../../../../lib/queryClient"

interface ModalEditProductTypeProps {
  productTypeId: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const ModalEditProductType = ({ productTypeId, isOpen, setIsOpen }: ModalEditProductTypeProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [errorSubmit, setErrorSubmit] = useState<string>("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProductTypeInput>({
    resolver: zodResolver(updateProductTypeSchema),
  })

  const { data: productType } = useQuery({
    queryKey: ["product-types", productTypeId],
    queryFn: () => getProductType(productTypeId),
  })

  useEffect(() => {
    if (isOpen) {
      showModal()
    }
  }, [isOpen])

  useEffect(() => {
    if (productType)
      reset({
        name: productType.name,
      })
    setErrorSubmit("")
  }, [productType, reset])

  const mutation = useMutation({
    mutationFn: async (data: UpdateProductTypeInput) => {
      return updateProductType(productTypeId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-types", productTypeId] })
      queryClient.invalidateQueries({ queryKey: ["product-types"] })
      if (modalRef.current) {
        modalRef.current.close()
      }

      if (formRef.current) {
        formRef.current.reset()
      }

      setIsOpen(false)
    },
    onError: () => {
      setErrorSubmit("Failed to edit product type")
    },
  })

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
    if (modalRef.current) {
      modalRef.current.close()
    }
    setErrorSubmit("")
    setIsOpen(false)
  }

  const onSubmit = (data: UpdateProductTypeInput) => mutation.mutate(data)

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update product type</h3>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 px-3 py-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="text-neutral-900 inter-400 text-sm">
                Name:
              </label>
              <input id="name" {...register("name")} placeholder="Adidas" className="input input-neutral w-full" />
              {errors.name && <p className="text-danger-200">{errors.name.message}</p>}
            </div>

            <div className="modal-action">
              <div className="flex gap-2">
                <button
                  className="px-3 py-2.5 border border-neutral-200 inter-500 rounded-sm hover:bg-neutral-050 transition-all duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2.5 bg-primary-500 text-white inter-500 rounded-sm hover:opacity-75 transition-all duration-300"
                  type="submit"
                >
                  Accept
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              {errorSubmit && <p className="text-sm text-danger-500">Failed to edit product type</p>}
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ModalEditProductType
