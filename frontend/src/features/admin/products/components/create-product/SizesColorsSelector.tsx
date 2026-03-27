import { Check, ChevronRight, Plus } from "lucide-react"
import { useRef, useState } from "react"
import { ChromePicker } from "react-color"

type ColorOption = {
  color: string
  stock: number
}

type SizeOption = {
  size: string
  colors: ColorOption[]
}

const SizeSelector = () => {
  const [selectedSizes, setSelectedSizes] = useState<SizeOption[]>([])
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [hoveredSize, setHoveredSize] = useState<string | null>(null) // Track hover separately

  const refSizeSelector = useRef<HTMLDivElement>(null)

  const handleAddSize = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.find((s) => s.size === size)) return prev
      return [...prev, { size, colors: [] }]
    })
  }

  const handleAddColor = (size: string, color: string, stock: number) => {
    setSelectedSizes((prev) =>
      prev.map((s) => (s.size === size ? { ...s, colors: [...s.colors, { color, stock }] } : s)),
    )
  }

  const ItemSize = ({ s }: { s: SizeOption }) => {
    const refItemDiv = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const isHovered = hoveredSize === s.size

    const handleMouseEnter = () => {
      setHoveredSize(s.size)
      setActiveSize(s.size)
    }

    const handleMouseLeave = (e: React.MouseEvent) => {
      // Don't close if moving to the modal
      if (modalRef.current && modalRef.current.contains(e.relatedTarget as Node)) {
        return
      }
      setHoveredSize(null)
      setActiveSize(null)
    }

    const ModalColor = () => {
      const ButtonAddColor = () => {
        const [isHovered, setIsHovered] = useState(false)

        return (
          <button
            onClick={() => {
              if (activeSize) {
                handleAddColor(activeSize, "#cccccc", 0)
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-2.5 rounded-sm flex flex-row gap-1 transition-basic items-center cursor-pointer"
          >
            <span
              className={`inter-400 ${isHovered ? "text-primary-500" : "text-neutral-900"} transition-basic text-nowrap`}
            >
              Add color
            </span>
            <Plus size={16} className={`${isHovered ? "stroke-primary-500" : "stroke-neutral-900"} transition-basic`} />
          </button>
        )
      }

      const ContainerColor = ({ c }: { c: ColorOption }) => {
        const [localColor, setLocalColor] = useState<string>("")
        const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false)

        const ButtonSelect = ({ onClick }: { onClick: () => void }) => {
          const [isHovered, setIsHovered] = useState<boolean>(false)
          return (
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onClick}
              className={`inter-400 flex gap-1 px-2.5 py-1.5 ${isHovered ? "text-primary-500" : "text-neutral-900"} items-center justify-center`}
            >
              Select <Check size={16} className={`${isHovered ? "stroke-primary-500" : "stroke-neutral-900"}`} />
            </button>
          )
        }

        return (
          <div key={c.color} className="flex items-center gap-2">
            <button
              className="w-4.5 h-4.5 rounded-full cursor-pointer"
              style={{ backgroundColor: c.color }}
              onClick={() => {
                setIsPickerVisible(true)
                setLocalColor(c.color)
              }}
            />

            {isPickerVisible && (
              <div className="flex flex-col absolute border border-neutral-200 translate-y-[60%] bg-white z-10">
                <ChromePicker
                  color={localColor}
                  onChange={(updated) => {
                    setLocalColor(updated.hex)
                  }}
                />
                <ButtonSelect
                  onClick={() => {
                    setSelectedSizes((prev) =>
                      prev.map((s) =>
                        s.size === activeSize
                          ? {
                              ...s,
                              colors: s.colors.map((col) =>
                                col.color === c.color ? { ...col, color: localColor || "#ffffff" } : col,
                              ),
                            }
                          : s,
                      ),
                    )
                    setIsPickerVisible(false)
                  }}
                />
              </div>
            )}

            <input
              type="number"
              className="w-17 outline-none rounded-sm border border-neutral-200 px-2 py-1.5 inter-400 placeholder-neutral-400 text-neutral-900"
              value={c.stock}
              onChange={(e) => {
                const newStock = Number(e.target.value)
                setSelectedSizes((prev) =>
                  prev.map((s) =>
                    s.size === activeSize
                      ? {
                          ...s,
                          colors: s.colors.map((col) => (col.color === c.color ? { ...col, stock: newStock } : col)),
                        }
                      : s,
                  ),
                )
              }}
              onMouseEnter={(e) => {
                // Prevent modal from closing when interacting with input
                e.stopPropagation()
              }}
            />
          </div>
        )
      }

      return (
        <div
          ref={modalRef}
          className="absolute shadow-md px-1.5 py-2 flex flex-col gap-1 items-center rounded-sm border bg-white border-neutral-200 z-20"
          style={{ transform: `translate(${refSizeSelector.current?.offsetWidth}px,0px)` }}
          onMouseEnter={() => setHoveredSize(s.size)}
          onMouseLeave={() => {
            setHoveredSize(null)
            setActiveSize(null)
          }}
        >
          {selectedSizes
            .find((s) => s.size === activeSize)
            ?.colors.map((c) => (
              <ContainerColor c={c} key={c.color} />
            ))}
          <ButtonAddColor />
        </div>
      )
    }

    return (
      <div className="relative flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          ref={refItemDiv}
          className={`w-full flex p-1.5 items-center justify-between rounded-sm hover:bg-neutral-050 hover:text-primary-500 transition-basic`}
        >
          <span className={`inter-400 ${isHovered ? "text-primary-500" : "text-neutral-900"} transition-basic`}>
            {s.size}
          </span>
          <ChevronRight
            size={20}
            className={`${isHovered ? "stroke-primary-500" : "stroke-neutral-900"} transition-basic`}
          />
        </div>
        {isHovered && <ModalColor />}
      </div>
    )
  }

  const ButtonAddSize = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <button
        onClick={() => setShowSizeModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="border border-neutral-200 hover:border-primary-200 p-2.5 rounded-sm flex flex-row gap-1 hover:bg-primary-050 transition-basic items-center cursor-pointer"
      >
        <span
          className={`inter-400 ${isHovered ? "text-primary-500" : "text-neutral-900"} transition-basic text-nowrap`}
        >
          Add size
        </span>
        <Plus size={16} className={`${isHovered ? "stroke-primary-500" : "stroke-neutral-900"} transition-basic`} />
      </button>
    )
  }

  return (
    <div className="relative" ref={refSizeSelector}>
      {selectedSizes.map((s) => (
        <ItemSize s={s} key={s.size} />
      ))}
      <ButtonAddSize />
      {showSizeModal && (
        <div className="absolute z-30">
          <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm border border-neutral-200">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <li
                key={size}
                onClick={() => {
                  handleAddSize(size)
                  setShowSizeModal(false)
                }}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SizeSelector
