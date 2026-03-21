import { useState } from "react"
import type { Brand, Brands } from "../../../brands/types"
import { BASE_URL } from "../../../../../api/client"

interface Props {
  brands: Brands | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void
}

const DropdownBrand = ({ brands, onChange }: Props) => {
  const [selectedName, setSelectedName] = useState<string>()
  const [selectedImgUri, setSelectedImgUri] = useState<string>()

  const [visible, setVisible] = useState(false)

  const open = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  const handleClick = (brand: Brand) => {
    setSelectedName(brand.name)
    onChange(brand.id)
    setSelectedImgUri(brand.imageUrl)

    close()
  }
  return (
    <>
      <details className="dropdown" open={visible}>
        <summary className="btn m-1 w-full min-w-52 inter-500 flex gap-1.5" onClick={open}>
          {selectedImgUri && <img src={`${BASE_URL}${selectedImgUri}`} width={20} />}
          {!selectedName ? "Click to select Brand" : selectedName}
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          {brands &&
            brands.map((brand) => (
              <li key={brand.id} onClick={() => handleClick(brand)}>
                <a>
                  <div className="flex gap-1.5">
                    <img src={`${BASE_URL}${brand.imageUrl}`} width={20} />
                    {brand.name}
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </details>
    </>
  )
}

export default DropdownBrand
