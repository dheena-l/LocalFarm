import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaLeaf,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY || "localfarm-admin-key";

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
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

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

      const response = await fetch(`${API}/contact`, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify({
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
        console.error("Failed to parse contact response:", text, parseError);
      }

      if (!response.ok) {
        const message = data?.message || `Server Error ${response.status}`;
        setStatusMessage({ type: "error", text: message });
      } else if (data?.status) {
        setStatusMessage({ type: "success", text: data.message || "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatusMessage({ type: "error", text: data?.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Contact submit failed:", error);
      setStatusMessage({ type: "error", text: error?.message || "Server Error" });
    } finally {
      setLoading(false);
    }
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
                      className={`form-control custom-input${errors.name ? " is-invalid" : ""}`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}

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
                      className={`form-control custom-input${errors.email ? " is-invalid" : ""}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}

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
                    className={`form-control custom-input${errors.phone ? " is-invalid" : ""}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}

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
                    className={`form-control custom-input${errors.message ? " is-invalid" : ""}`}
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.message && <div className="invalid-feedback d-block">{errors.message}</div>}

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
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

      </div>

    </div>
  );
}

export default Contact;