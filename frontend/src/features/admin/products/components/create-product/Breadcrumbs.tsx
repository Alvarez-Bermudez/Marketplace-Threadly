import { Link } from "react-router-dom"

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <ul>
        <li>
          <Link to="/admin/products" className="text-base inter-400 ">
            Products
          </Link>
        </li>
        <li>
          <a className="text-base inter-400 ">Create</a>
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
