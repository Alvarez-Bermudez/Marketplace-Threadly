import { Search } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface SearchbarProps {
  placeholder: string
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}
const Searchbar = ({ placeholder, search, setSearch }: SearchbarProps) => {
  return (
    <div className="w-full max-w-101.25 px-3 py-2.5 gap-1.5 flex border border-neutral-200 rounded-full">
      <Search size={16} className="text-neutral-600" />
      <input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="placeholder-nuetral-600 text-neutral-900 inter-400 text-sm outline-none w-full"
      ></input>
    </div>
  )
}

export default Searchbar
