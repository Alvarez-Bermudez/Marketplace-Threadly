import { LogOut, UserRound } from "lucide-react"
import imgBrand from "../assets/brand.png"
import { useQuery } from "@tanstack/react-query"
import { getMe, logout } from "../features/auth/api"

const AdminHeader = () => {
  const { data: user } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe,
  })

  const name = user?.name.split(" ")[0]

  return (
    <header className="flex p-2.5 justify-between items-center border border-neutral-200">
      <img src={imgBrand} width={107} height={32} />

      <div className="flex gap-5 items-center">
        <div className="flex gap-1 items-center">
          <div className="flex justify-center items-center size-7.5 rounded-full bg-neutral-100">
            <UserRound size={20} className="text-neutral-900" />
          </div>
          <p className="inter-400 text-neutral-900 text-sm">{name}</p>
        </div>
        <LogOut size={20} className="text-neutral-900 cursor-pointer" onClick={logout} />
      </div>
    </header>
  )
}

export default AdminHeader
