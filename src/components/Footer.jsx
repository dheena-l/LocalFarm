import { Link } from "react-router-dom";
import { FaWhatsapp, FaMapMarkerAlt, FaInstagram, FaFacebookF } from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="global-farm-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="LocalFarm" className="brand-icon brand-icon-footer" style={{ height: "44px", width: "auto" }} />

            <div>
              <p className="footer-brand-name">LocalFarm</p>
              <p className="footer-brand-tag">
                Naturally grown produce from our village fields to your table.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919344420468?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20LocalFarm%20products"
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp-btn"
          >
            <FaWhatsapp /> Chat with the farm
          </a>
        </div>

        <div className="footer-divider" />

        <div className="footer-columns">
          <div className="footer-col">
            <h6 className="footer-heading">Explore</h6>
            <ul className="list-unstyled footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Our Products</Link></li>
              <li><Link to="/about" className="footer-link">About Our Farm</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h6 className="footer-heading">What we grow</h6>
            <ul className="list-unstyled footer-list footer-list-muted">
              <li>Fresh Cow Milk</li>
              <li>Country Eggs</li>
              <li>Organic Manure</li>
              <li>Fresh Coconuts</li>
            </ul>
          </div>

          <div className="footer-col">
            <h6 className="footer-heading">Visit the farm</h6>
            <p className="footer-address">
              <FaMapMarkerAlt className="me-2" />
              Cheyyur, Chengalpattu&nbsp;-&nbsp;603305, Tamil Nadu, India
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-btn" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://wa.me/919344420468" target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">&copy; {new Date().getFullYear()} LocalFarm. All rights reserved.</p>
          <p className="mb-0 footer-bottom-note">Built with care, harvested with patience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
