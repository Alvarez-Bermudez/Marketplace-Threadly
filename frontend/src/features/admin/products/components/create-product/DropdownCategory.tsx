import { useState } from "react"
import type { CategoryResponse } from "../../../categories/types"

interface Props {
  categories: CategoryResponse[] | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void
}
const DropdownCategory = ({ categories, onChange }: Props) => {
  const [selectedName, setSelectedName] = useState<string>()

  const [visible, setVisible] = useState(false)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleClick = (categ: CategoryResponse) => {
    setSelectedName(categ.name)
    onChange(categ.id)

    close()
  }

  return (
    <details className="dropdown" open={visible}>
      <summary className="btn m-1 w-full min-w-52 inter-500" onClick={open}>
        {!selectedName ? "Click to select Category" : selectedName}
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {categories &&
          categories.map((categ) => (
            <li key={categ.id} onClick={() => handleClick(categ)}>
              <a>
                <div className="flex gap-1.5">{categ.name}</div>
              </a>
            </li>
          ))}
      </ul>
    </details>
  )
}

export default DropdownCategory
