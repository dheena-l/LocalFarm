import { Link } from 'react-router-dom';

function Dashboard() {

  return (

    <div className="container mt-5">

      <h1>Admin Dashboard</h1>

      <Link
        to="/admin/add-product"
        className="btn btn-success"
      >
        Add Product
      </Link>

    </div>
  )
}

export default Dashboard;