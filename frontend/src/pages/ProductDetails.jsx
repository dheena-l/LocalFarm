import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLeaf,
  FaTruck,
  FaStar,
} from "react-icons/fa";
import { fetchProductById, getInitialProducts, getProductImageUrl } from "../utils/productsApi";
const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY || "localfarm-admin-key";



function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(
    () => getInitialProducts().find((item) => item.id === Number(id)) || {}
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        if (data) {
          setProduct(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.message.trim()) {
      validationErrors.message = "Message is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const imageUrl = getProductImageUrl(product.image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusMessage({ type: "error", text: "Please fix the highlighted fields and try again." });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (API_KEY) {
        headers["X-API-Key"] = API_KEY;
      }

      const response = await fetch(`${API}/enquiry`, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify({
          product_id: Number(id),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      const text = await response.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse enquiry response:", text, parseError);
      }

      if (!response.ok) {
        const message = data?.message || `Server Error ${response.status}`;
        setStatusMessage({ type: "error", text: message });
      } else if (data?.status) {
        setStatusMessage({ type: "success", text: data.message || "Enquiry Submitted Successfully" });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setStatusMessage({ type: "error", text: data?.message || "Failed to submit enquiry" });
      }
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", text: error?.message || "Server Error" });
    } finally {
      setLoading(false);
    }
  };
  const handleBuyNow = () => {
  const phone = product.phone || "9344420468";

  const message = `Hello,

I would like to buy this product.

Product: ${product.name}
Price: ₹${product.price}
Location: ${product.location}

Please contact me regarding this product.`;

  window.open(
    `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
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

            <button
  className="btn btn-dark px-4 py-2"
  onClick={handleBuyNow}
>
  Buy Now
</button>
            <button
  className="btn btn-dark px-4 py-2"
  onClick={() => {
    setShowPopup(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Scroll to enquiry form
    document.getElementById("enquiry-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
>
  Contact Seller
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

          <div className="card border-0 shadow-sm p-4" id="enquiry-form">

            <h4 className="mb-4">
              Enquiry Form
            </h4>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`form-control${errors.name ? " is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={`form-control${errors.email ? " is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className={`form-control${errors.phone ? " is-invalid" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  className={`form-control${errors.message ? " is-invalid" : ""}`}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <div className="invalid-feedback d-block">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>

              {statusMessage.text && (
                <div className={`mt-3 small ${statusMessage.type === "success" ? "text-success" : "text-danger"}`}>
                  {statusMessage.text}
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
      {showPopup && (
  <div
    className="position-fixed top-0 end-0 p-3"
    style={{ zIndex: 1055 }}
  >
    <div className="alert alert-success shadow mb-0">
      <strong>Buy Now</strong>
      <br />
      Please fill out the enquiry form. Our team will contact you shortly.
    </div>
  </div>
)}

    </div>
  );
}

export default ProductDetails;
