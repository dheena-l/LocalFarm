import { Link } from "react-router-dom";
import logo from "../assets/LF.png"; // Your LFH logo image

function Header() {
  return (
    <header className="global-farm-header sticky-top">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 h-100">
          
          {/* Left side of the header (aligns with the white column) */}
          <div className="col-12 col-md-4 bg-white d-flex align-items-center px-4 px-lg-5 py-2 py-md-0">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src={logo} alt="LFH" className="logo" style={{ height: "70px", marginLeft: "10px" }} />
            </Link>
          </div>

          {/* Right side of the header (aligns with the green column) */}
          <div className="col-12 col-md-8 farm-bg-dark d-flex align-items-center justify-content-end px-4 px-lg-5 py-2 py-md-0">
            <nav className="d-flex align-items-center gap-4 custom-nav-links">
              <Link to="/" className="nav-link text-white fw-medium px-0">Home</Link>
              <Link to="/about" className="nav-link text-white fw-medium px-0">About</Link>
              <Link to="/contact" className="nav-link text-white fw-medium px-0">Contact</Link>
              <Link to="/products" className="nav-link text-white fw-medium px-0">Products</Link>
              
              {/* Hamburger Icon */}
             
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;