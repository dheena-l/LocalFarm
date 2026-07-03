import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLeaf,
  FaTruck,
  FaStar,
} from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imagePath = product.image ? String(product.image).replace(/^uploads\//, "") : "";
  const imageUrl = imagePath
    ? `${API}/uploads/${imagePath}`
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/enquiry`, {
        product_id: Number(id),
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });

      alert("Enquiry Submitted Successfully");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit enquiry");
    }
  };

  return (
    <div className="container py-5">

      <div className="row g-5 align-items-center">

        {/* IMAGE */}
        <div className="col-lg-6">

          {imageUrl && (
            <img
              src={imageUrl}
              className="img-fluid rounded shadow"
              alt={product.name}
            />
          )}

        </div>

        {/* CONTENT */}
        <div className="col-lg-6">

          <span className="badge bg-success mb-3 px-3 py-2">
            Organic Farm Product
          </span>

          <h1 className="fw-bold mb-3">
            {product.name}
          </h1>

          <h2 className="text-success fw-bold mb-4">
            ₹ {product.price}
          </h2>

          <p className="text-muted fs-5">
            {product.description}
          </p>

          <div className="mt-4">

            <p>
              <FaMapMarkerAlt className="text-success me-2" />
              <strong>Location:</strong> {product.location}
            </p>

            <p>
              <FaLeaf className="text-success me-2" />
              100% Natural & Organic
            </p>

            <p>
              <FaTruck className="text-success me-2" />
              Free Local Delivery Available
            </p>

            <p>
              <FaStar className="text-warning me-2" />
              Premium Farm Quality
            </p>

          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mt-4">

            <a
              href={`https://wa.me/91${product.phone || "0000000000"}`}
              className="btn btn-success px-4 py-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="me-2" />
              WhatsApp
            </a>

            <button className="btn btn-dark px-4 py-2">
              Buy Now
            </button>

          </div>

        </div>

      </div>

      {/* PRODUCT DETAILS */}
      <div className="row mt-5">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm p-4">

            <h3 className="mb-4">
              Product Details
            </h3>

            <p>
              Our farm products are naturally grown using
              traditional farming methods without harmful
              chemicals or pesticides.
            </p>

            <p>
              We ensure freshness, quality, and direct delivery
              from village farms to your home.
            </p>

            <ul className="mt-3">
              <li>Freshly harvested farm product</li>
              <li>Organic and healthy</li>
              <li>Safe packaging</li>
              <li>Direct farm delivery</li>
              <li>Affordable price</li>
            </ul>

          </div>

        </div>

        {/* CONTACT FORM */}
        <div className="col-lg-4">

          <div className="card border-0 shadow-sm p-4">

            <h4 className="mb-4">
              Enquiry Form
            </h4>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  className="form-control"
                  onChange={handleChange}
                ></textarea>

              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Send Enquiry
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;