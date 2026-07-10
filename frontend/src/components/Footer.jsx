import { Link } from "react-router-dom";
import logo from "../assets/LF.png"; // Your LFH logo image

function Footer() {
  return (
    <footer className="global-farm-footer border-top">
      <div className="container-fluid p-0">
        <div className="row g-0">
          
          {/* LEFT SIDE - LIGHT BACKGROUND */}
          <div className="col-12 col-md-5 bg-white d-flex flex-column justify-content-between p-4 p-lg-5">
            <div>
              <Link to="/" className="d-flex align-items-center text-decoration-none mb-3">
                <img src={logo} alt="LFH" style={{ height: "45px" }} />
              </Link>
              <p className="text-muted small max-footer-width">
                Bringing the freshest, naturally grown farm products straight from our village fields to your dining table every single day.
              </p>
            </div>
            
            <div className="mt-4 mt-md-5">
              <p className="text-muted small mb-0">
                &copy; {new Date().getFullYear()} LF. All rights reserved.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - DARK GREEN BACKGROUND */}
          <div className="col-12 col-md-7 farm-bg-dark text-white p-4 p-lg-5">
            <div className="row g-4">
              
              {/* Quick Links Column */}
              <div className="col-6 col-sm-4">
                <h6 className="footer-heading mb-3">Quick Links</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 m-0">
                  <li><Link to="/" className="footer-link">Home</Link></li>
                  <li><Link to="/products" className="footer-link">Our Products</Link></li>
                  <li><Link to="/about" className="footer-link">About Our Farm</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                </ul>
              </div>

              {/* Categories Column */}
              <div className="col-6 col-sm-4">
                <h6 className="footer-heading mb-3">Our Offerings</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 m-0 text-white-50 small">
                  <li>Fresh Cow Milk</li>
                  <li>Country Eggs</li>
                  <li>Organic Manure</li>
                  <li>Fresh Coconuts</li>
                </ul>
              </div>

              {/* Newsletter / Contact Column */}
              <div className="col-12 col-sm-4">
                <h6 className="footer-heading mb-3">Stay Connected</h6>
                <p className="text-white-50 small mb-3">
                  Subscribe to get updates on harvest dates and fresh arrivals.
                </p>
                <div className="input-group input-group-sm">
                  <input 
                    type="email" 
                    className="form-control bg-transparent text-white border-secondary footer-input" 
                    placeholder="Your email address" 
                    aria-label="Your email address"
                  />
                  <button className="btn btn-warning btn-sm text-dark px-3 fw-medium" type="button">
                    Join
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;