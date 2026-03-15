import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { type UpdateCategoryInput, updateCategorySchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getCategory, updateCategory } from "../api"
import { queryClient } from "../../../../lib/queryClient"

interface ModalEditCategoryProps {
  categoryId: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const ModalEditCategory = ({ categoryId, isOpen, setIsOpen }: ModalEditCategoryProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [errorSubmit, setErrorSubmit] = useState<string>("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
  })

  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
  })

  useEffect(() => {
    if (isOpen) {
      showModal()
    }
  }, [isOpen])

  useEffect(() => {
    if (category)
      reset({
        name: category.name,
      })
    setErrorSubmit("")
  }, [category, reset])

  const mutation = useMutation({
    mutationFn: async (data: UpdateCategoryInput) => {
      return updateCategory(categoryId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      if (modalRef.current) {
        modalRef.current.close()
      }

      if (formRef.current) {
        formRef.current.reset()
      }

      setIsOpen(false)
    },
    onError: () => {
      setErrorSubmit("Failed to edit category")
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

  const onSubmit = (data: UpdateCategoryInput) => mutation.mutate(data)

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update category</h3>

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
              {errorSubmit && <p className="text-sm text-danger-500">Failed to edit category</p>}
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ModalEditCategory
