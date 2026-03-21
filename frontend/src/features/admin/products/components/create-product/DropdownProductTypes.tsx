import { useState } from "react"
import type { ProductTypeResponse } from "../../../productTypes/types"

interface Props {
  productTypes: ProductTypeResponse[] | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void
}
const DropdownProductTypes = ({ productTypes, onChange }: Props) => {
  const [selectedName, setSelectedName] = useState<string>()

  const [visible, setVisible] = useState(false)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleClick = (type: ProductTypeResponse) => {
    setSelectedName(type.name)
    onChange(type.id)

    close()
  }

  return (
    <details className="dropdown" open={visible}>
      <summary className="btn m-1 w-full min-w-52 inter-500" onClick={open}>
        {!selectedName ? "Click to select Type" : selectedName}
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {productTypes &&
          productTypes.map((type) => (
            <li key={type.id} onClick={() => handleClick(type)}>
              <a>
                <div className="flex gap-1.5">{type.name}</div>
              </a>
            </li>
          ))}
      </ul>
    </details>
  )
}

export default DropdownProductTypes
