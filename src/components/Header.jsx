import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="global-farm-header sticky-top">
      <div className="container-fluid p-0 h-100">
        <div className="row g-0 h-100">
          {/* Left side: logo */}
          <div className="col-8 col-md-4 bg-white d-flex align-items-center px-4 px-lg-5 py-2 py-md-0">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none brand-mark" onClick={() => setOpen(false)}>
              <img src={logo} alt="LocalFarm" className="brand-logo" style={{ height: "56px", width: "auto" }} />
              <span className="brand-text">
                <span className="brand-text-main">LocalFarm</span>
                <span className="brand-text-sub">village grown, daily fresh</span>
              </span>
            </Link>
          </div>

          {/* Right side: nav */}
          <div className="col-4 col-md-8 farm-bg-dark d-flex align-items-center justify-content-end px-4 px-lg-5 py-2 py-md-0">
            <button
              className="d-md-none nav-toggle"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>

            <nav className={`d-md-flex align-items-center gap-4 custom-nav-links ${open ? "d-flex" : "d-none"}`}>
              <Link to="/" className="nav-link text-white fw-medium px-0" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/about" className="nav-link text-white fw-medium px-0" onClick={() => setOpen(false)}>About</Link>
              <Link to="/contact" className="nav-link text-white fw-medium px-0" onClick={() => setOpen(false)}>Contact</Link>
              <Link to="/products" className="nav-link text-white fw-medium px-0" onClick={() => setOpen(false)}>Products</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
