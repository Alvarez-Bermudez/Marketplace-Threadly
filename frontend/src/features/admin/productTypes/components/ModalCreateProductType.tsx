import { Plus } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { type CreateProductTypeInput, createProductTypeSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../../../lib/queryClient"
import { createProductType } from "../api"

//Remember this component contains the create button and the related modal
const ModalCreateProductType = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [errorSubmit, setErrorSubmit] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductTypeInput>({
    resolver: zodResolver(createProductTypeSchema),
  })

  const mutation = useMutation({
    mutationFn: createProductType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-types"] })

      if (modalRef.current) {
        modalRef.current.close()
      }

      if (formRef.current) {
        formRef.current.reset()
      }
    },
    onError: () => {
      setErrorSubmit("Failed to create product type")
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
  }

  const onSubmit = (data: CreateProductTypeInput) => mutation.mutate(data)

  return (
    <>
      <button
        className="fixed right-5 bottom-5 inter-400 text-sm text-white px-4 py-3 gap-1.5 flex items-center justify-end rounded-full bg-primary-700 shadow-md hover:opacity-75 transition-all duration-300"
        onClick={showModal}
      >
        Add product type
        <Plus size={20} color="white" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create product type</h3>

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
              {errorSubmit && <p className="text-sm text-danger-500">Failed to create product type</p>}
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ModalCreateProductType
