import { useEffect, type Dispatch, type SetStateAction } from "react"

interface Props {
  sizes: string[]
  setSizes: Dispatch<SetStateAction<string[]>>
  sizesStock: number[]
  setSizesStock: Dispatch<SetStateAction<number[]>>
}
const BadgesSizesSelector = ({ sizes, setSizes, sizesStock, setSizesStock }: Props) => {
  const Badge = ({
    label,

    index,
  }: {
    label: string
    index: number
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
      <div className="flex flex-col items-center gap-1">
        <div
          className={`flex items-center justify-center px-4.5 py-1 rounded-full  hover:shadow-lg transition-all duration-300 inter-400 text-sm text-nuetral-900 cursor-pointer border ${isSelected ? "bg-primary-500 text-white border-primary-500" : " border-neutral-200"}`}
          onClick={handleClick}
        >
          {label}
        </div>

        <div className="flex items-center justify-center">
          <input
            type="number"
            disabled={!isSelected}
            className="input w-12"
            placeholder="99"
            value={sizesStock[index]}
            onChange={(e) => {
              setSizesStock((sizesStock) => {
                const _sizesStock = sizesStock.slice()
                _sizesStock[index] = Math.floor(Number(e.target.value))
                return _sizesStock
              })
            }}
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log(sizes)
  }, [sizes])
  return (
    <div className="flex gap-1.5">
      <Badge label="XS" index={0} />
      <Badge label="S" index={1} />
      <Badge label="M" index={2} />
      <Badge label="L" index={3} />
      <Badge label="XL" index={4} />
      <Badge label="XXL" index={5} />
    </div>
  )
}

export default BadgesSizesSelector
