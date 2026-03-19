import { Bolt, ChartBarBig, Handbag, Layers2, LayoutDashboard, Package2, Shirt, Tag, UsersRound } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface Link {
  id: string
  name: string
  href: string
  icon: React.ReactElement
  iconSelected: React.ReactElement
}
interface Links {
  primary: Link[]
  secondary: Link[]
  settings: Link[]
}

const links: Links = {
  primary: [
    {
      id: "1",
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard size={20} className="text-neutral-900" />,
      iconSelected: <LayoutDashboard size={20} className="text-primary-900" />,
    },
    {
      id: "2",
      name: "Products",
      href: "/admin/products",
      icon: <Package2 size={20} className="text-neutral-900" />,
      iconSelected: <Package2 size={20} className="text-primary-900" />,
    },
    {
      id: "3",
      name: "Sales",
      href: "/admin/sales",
      icon: <Handbag size={20} className="text-neutral-900" />,
      iconSelected: <Handbag size={20} className="text-primary-900" />,
    },
    {
      id: "4",
      name: "Customers",
      href: "/admin/customers",
      icon: <UsersRound size={20} className="text-neutral-900" />,
      iconSelected: <UsersRound size={20} className="text-primary-900" />,
    },
    {
      id: "5",
      name: "Reports",
      href: "/admin/reports",
      icon: <ChartBarBig size={20} className="text-neutral-900" />,
      iconSelected: <ChartBarBig size={20} className="text-primary-900" />,
    },
  ],
  secondary: [
    {
      id: "6",
      name: "Categories",
      href: "/admin/categories",
      icon: <Layers2 size={20} className="text-neutral-900" />,
      iconSelected: <Layers2 size={20} className="text-primary-900" />,
    },
    {
      id: "7",
      name: "Brands",
      href: "/admin/brands",
      icon: <Tag size={20} className="text-neutral-900" />,
      iconSelected: <Tag size={20} className="text-primary-900" />,
    },
    {
      id: "8",
      name: "Types",
      href: "/admin/product-types",
      icon: <Shirt size={20} className="text-neutral-900" />,
      iconSelected: <Shirt size={20} className="text-primary-900" />,
    },
  ],
  settings: [
    {
      id: "9",
      name: "Settings",
      href: "/admin/settings",
      icon: <Bolt size={20} className="text-neutral-900" />,
      iconSelected: <Bolt size={20} className="text-primary-900" />,
    },
  ],
}

const AdminSidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="flex-1 h-full flex flex-col w-full lg:max-w-60 bg-neutral-050 justify-between">
      <div className="gap-10 py-5 flex flex-col ">
        <div className="flex flex-col">
          {links.primary.map((link) => (
            <Link key={link.id} to={link.href}>
              <div
                className={`flex px-3.5 py-3 gap-1.5 items-center cursor-pointer hover:bg-neutral-100 transition-all duration-300 ${currentPath === link.href ? "bg-neutral-100" : ""}`}
              >
                {currentPath !== link.href ? link.icon : link.iconSelected}
                <p
                  className={`inter-400 antialiased ${currentPath === link.href ? "text-primary-900" : "text-neutral-900"}`}
                >
                  {link.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col">
          {links.secondary.map((link) => (
            <Link key={link.id} to={link.href}>
              <div
                className={`flex px-3.5 py-3 gap-1.5 items-center cursor-pointer hover:bg-neutral-100 transition-all duration-300 ${currentPath === link.href ? "bg-neutral-100" : ""}`}
              >
                {currentPath !== link.href ? link.icon : link.iconSelected}
                <p
                  className={`inter-400 antialiased ${currentPath === link.href ? "text-primary-900" : "text-neutral-900"}`}
                >
                  {link.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="py-3">
        <div className="flex flex-col">
          {links.settings.map((link) => (
            <Link key={link.id} to={link.href}>
              <div
                className={`flex px-3.5 py-3 gap-1.5 items-center cursor-pointer hover:bg-neutral-100 transition-all duration-300 ${currentPath === link.href ? "bg-neutral-100" : ""}`}
              >
                {currentPath !== link.href ? link.icon : link.iconSelected}
                <p
                  className={`inter-400 antialiased ${currentPath === link.href ? "text-primary-900" : "text-neutral-900"}`}
                >
                  {link.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
