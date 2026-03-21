import { Check, Plus } from "lucide-react"
import { useState, type Dispatch, type SetStateAction } from "react"
import { ChromePicker } from "react-color"

interface Props {
  colors: string[]
  setColors: Dispatch<SetStateAction<string[]>>
  colorsStock: number[]
  setColorsStock: Dispatch<SetStateAction<number[]>>
}

const ColorsSelector = ({ colors, setColors, colorsStock, setColorsStock }: Props) => {
  const [localColor, setLocalColor] = useState<string>("") //State used for select with the picker, on success add to colors
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>()

  const showPicker = () => setIsPickerVisible(true)
  const hidePicker = () => setIsPickerVisible(false)

  const addColor = () => {
    const colorSelected = localColor
    if (!colors.includes(colorSelected)) {
      setColors([...colors, colorSelected])
    }
    hidePicker()
  }
  return (
    <div className="flex gap-1.5 h-full items-center">
      {colors.map((color, index) => (
        <div className="flex flex-col items-center gap-1">
          <div key={color} className="rounded-full size-4" style={{ backgroundColor: color }} />
          <div className="flex items-center justify-center">
            <input
              type="number"
              className="input w-12"
              value={colorsStock[index]}
              onChange={(e) => {
                setColorsStock((colorsStock) => {
                  const _colorStock = colorsStock.slice()
                  _colorStock[index] = Math.floor(Number(e.target.value))
                  return _colorStock
                })
              }}
            />
          </div>
        </div>
      ))}
      {!isPickerVisible && (
        <button onClick={showPicker}>
          <Plus className="text-success size-4 cursor-pointer" />
        </button>
      )}

      {isPickerVisible && (
        <button onClick={addColor}>
          <Check className="text-primary-500 size-4 cursor-pointer" />
        </button>
      )}

      {isPickerVisible && (
        <ChromePicker
          className="absolute translate-y-[60%]"
          color={localColor}
          onChange={(updated) => {
            setLocalColor(updated.hex)
          }}
        />
      )}
    </div>
  )
}

export default ColorsSelector
