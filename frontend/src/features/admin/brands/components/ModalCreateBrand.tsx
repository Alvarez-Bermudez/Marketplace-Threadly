/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { type CreateBrandInput, createBrandSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createBrand } from "../api"
import { queryClient } from "../../../../lib/queryClient"

const ModalCreateBrand = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBrandInput>({
    resolver: zodResolver(createBrandSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: CreateBrandInput) => {
      const formData = new FormData()
      formData.append("name", data.name)

      if (data.photoData && data.photoData.length > 0) {
        formData.append("photoData", data.photoData[0]) // FileList → File
      }

      return createBrand(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] })
      if (modalRef.current) {
        modalRef.current.close()
      }

      if (formRef.current) {
        formRef.current.reset()
      }
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
  }

  const onSubmit = (data: CreateBrandInput) => mutation.mutate(data)

  return (
    <>
      <button
        className="fixed right-5 bottom-5 inter-400 text-sm text-white px-4 py-3 gap-1.5 flex items-center justify-end rounded-full bg-primary-700 shadow-md hover:opacity-75 transition-all duration-300"
        onClick={showModal}
      >
        Add brand
        <Plus size={20} color="white" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create brand</h3>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 px-3 py-5">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="text-neutral-900 inter-400 text-sm">
                Name:
              </label>
              <input id="name" {...register("name")} placeholder="Adidas" className="input input-neutral w-full" />
              {errors.name && <p className="text-danger-200">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <input type="file" {...register("photoData")} className="file-input w-full" />
              {errors.photoData && <p className="text-danger-200">{errors.photoData.message?.toString()}</p>}
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
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
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ModalCreateBrand
