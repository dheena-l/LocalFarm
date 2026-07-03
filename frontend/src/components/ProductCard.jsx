import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

function ProductCard({ item }) {
  const imagePath = item.image ? String(item.image).replace(/^uploads\//, "") : "";
  const imageUrl = imagePath
    ? `${API}/uploads/${imagePath}`
    : 'https://via.placeholder.com/300x250?text=Farm+Product';

  return (

  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

  <img
   src={imageUrl}
    className="card-img-top"
    alt={item.name}
    style={{
      height: "250px",
      objectFit: "cover"
    }}
  />

  <div className="card-body d-flex flex-column">

    <h4 className="fw-bold mb-3">
      {item.name}
    </h4>

    <h5 className="text-success fw-bold">
      ₹ {item.price}
    </h5>

    <p className="text-muted flex-grow-1">
      {item.location}
    </p>

    <Link
  to={`/product/${item.id}`}
  className="btn farm-bg-dark text-white rounded-pill mt-3"
>
  View Details
</Link>

  </div>
</div>
  )
}

export default ProductCard;