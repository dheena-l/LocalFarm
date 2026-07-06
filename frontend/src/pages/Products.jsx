import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaShoppingBasket,
  FaStar,
  FaTruck,
} from "react-icons/fa";
import vegs from '../assets/vegs.jfif'; 
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="products-hero-section">

        <div className="container">

          <div className="row align-items-center min-vh-50">

            <div className="col-lg-6">

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="products-badge"
              >
                Fresh Organic Farm Products
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="products-title mt-4"
              >
                Fresh Products <br />
                Directly From Farm
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="products-description mt-4"
              >
                We provide naturally grown farm products including
                fresh milk, eggs, coconuts, paddy, goats, and organic
                fertilizers directly from our traditional village farms.
              </motion.p>

            </div>

            <div className="col-lg-6 text-center">

              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                src={vegs}
                alt="Farm Products"
                className="img-fluid products-hero-image"
              />

            </div>

          </div>

        </div>

      </section>

      {/* INFO BOXES */}
      <section className="py-5 bg-light">

        <div className="container">

          <div className="row g-4">

            <div className="col-md-4">

              <div className="info-box">

                <FaLeaf className="info-icon" />

                <h5>100% Organic</h5>

                <p>
                  Natural and chemical-free farming methods.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="info-box">

                <FaTruck className="info-icon" />

                <h5>Fast Delivery</h5>

                <p>
                  Fresh products delivered directly to your home.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="info-box">

                <FaStar className="info-icon" />

                <h5>Trusted Quality</h5>

                <p>
                  Serving customers with trust over the years.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PRODUCTS LIST */}
      <section className="products-section py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="section-title">
              Our Farm Products
            </h2>

            <p className="section-subtitle">
              Healthy and fresh products directly from our farm
            </p>

          </div>

          <div className="row g-4">

            {products.map((item) => (

              <div
                className="col-md-6 col-lg-4"
                key={item.id}
              >

                <motion.div
                  whileHover={{ y: -10 }}
                  className="product-list-card"
                >

                  {/* PRODUCT IMAGE */}
                  <div className="product-image-wrapper">

                    <img
                      src={item.image ? `${API}/uploads/${String(item.image).replace(/^uploads\//, "")}` : vegs}
                      alt={item.name}
                      className="product-list-image"
                    />

                    <span className="product-badge">
                      Fresh
                    </span>

                  </div>

                  {/* PRODUCT CONTENT */}
                  <div className="product-content">

                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <h4 className="product-name">
                        {item.name}
                      </h4>

                      <span className="product-price">
                        ₹{item.price}
                      </span>

                    </div>

                    <p className="product-description">
                      {item.description ||
                        "Fresh organic farm product directly from our traditional village farm."}
                    </p>

                    {/* PRODUCT DETAILS */}
                    <div className="product-details">

                      <div className="detail-item">
                        <strong>Category:</strong> Organic Farm
                      </div>

                      <div className="detail-item">
                        <strong>Availability:</strong> In Stock
                      </div>

                      <div className="detail-item">
                        <strong>Delivery:</strong> Free Local Delivery
                      </div>

                    </div>

                    {/* BUTTON */}
                    <button
                      className="btn product-btn w-100 mt-4"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >

                      <FaShoppingBasket className="me-2" />

                      Order Now

                    </button>

                  </div>

                </motion.div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
}

export default Products;
