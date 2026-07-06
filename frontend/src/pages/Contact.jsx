import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaLeaf,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
const API_KEY = "zxcvnmlkjhgfdsa";  

function Contact() {

  const latitude = "12.361820154735298";
  const longitude = "80.0708195982056";

  const mapEmbedUrl =
    `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
  
    try {

      
     const response = await fetch(
      `${API}/contacts`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
      }
    );

      const data = await response.json();

      if (data.status) {
        alert(data.message || "Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

    setLoading(false);

  };

  return (

    <div className="contact-page-wrapper py-5">

      <div className="container">

        {/* TOP HEADING */}

        <div className="text-center mb-5">

          <span className="contact-small-title">
            GET IN TOUCH
          </span>

          <h1 className="contact-main-title">
            Contact Our Farm
          </h1>

          <p className="contact-main-subtitle">
            Fresh farm products directly from our village farms
            to your home with natural quality and trust.
          </p>

        </div>

        <div className="row g-5 align-items-start">

          {/* LEFT */}

          <div className="col-lg-5">

            {/* MAP */}

            <div className="map-card mb-4">

              <iframe
                title="Farm Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

            </div>

            {/* ADDRESS */}

            <div className="contact-info-card mb-4">

              <div className="d-flex align-items-start gap-3">

                <div className="contact-icon-box">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h5>Farm Address</h5>

                  <p>
                    Paramankeni,
                    <br />
                    Cheyyur,
                    <br />
                    Chengalpattu - 603305,
                    <br />
                    Tamil Nadu, India
                  </p>

                </div>

              </div>

            </div>

            {/* SOCIAL */}

            <div className="social-wrapper mt-4">

              <h5 className="mb-3">
                Follow Us
              </h5>

              <div className="d-flex gap-3">

                <a href="#" className="social-btn">
                  <FaFacebookF />
                </a>

                <a href="#" className="social-btn">
                  <FaInstagram />
                </a>

                <a href="#" className="social-btn">
                  <FaWhatsapp />
                </a>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-7">

            <div className="contact-form-card">

              <div className="d-flex align-items-center gap-2 mb-3">

                <FaLeaf className="text-success" />

                <span className="fw-semibold text-success">
                  FARM SUPPORT
                </span>

              </div>

              <h2 className="form-title mb-3">
                Send Us A Message
              </h2>

              <p className="text-muted mb-4">
                Have questions about our farm products,
                delivery, or availability?
              </p>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  {/* NAME */}

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control custom-input"
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control custom-input"
                      placeholder="Enter your email"
                      required
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="Enter your phone number"
                  />

                </div>

                {/* MESSAGE */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="Write your message here..."
                    required
                  ></textarea>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >

                  {loading ? "Sending..." : "Send Message"}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Contact;