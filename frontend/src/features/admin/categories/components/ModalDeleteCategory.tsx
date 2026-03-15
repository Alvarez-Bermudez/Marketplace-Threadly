import { useEffect, useRef, type Dispatch, type SetStateAction } from "react"
import { useMutation } from "@tanstack/react-query"

import { queryClient } from "../../../../lib/queryClient"
import { deleteCategory } from "../api"

interface ModalDeleteCategoryProps {
  categoryId: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const ModalDeleteCategory = ({ categoryId, isOpen, setIsOpen }: ModalDeleteCategoryProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) {
      showModal()
    }
  }, [isOpen])

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      if (modalRef.current) {
        modalRef.current.close()
      }

      setIsOpen(false)
    },
  })

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  const handleCancel = () => {
    if (modalRef.current) {
      modalRef.current.close()
    }
    setIsOpen(false)
  }

  const handleDelete = () => {
    deleteMutation.mutate(categoryId)
  }
  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove category</h3>

          <form className="w-full flex flex-col gap-5 px-3 py-5">
            <p className="text-sm text-neutral-900 inter-400">Are you sure you want to remove this category?</p>

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
                  onClick={handleDelete}
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

export default ModalDeleteCategory
