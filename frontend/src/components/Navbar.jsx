import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo" onClick={() => navigate("/")}>
        Career Insight
      </div>

      <div className="mobile-icon" onClick={() => setMobileMenu(!mobileMenu)}>
        <FaBars />
      </div>

      <div className={`nav-links ${mobileMenu ? "active" : ""}`}>

        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")} className="primary">
              Register
            </button>
          </>
        ) : (
          <div className="user-section">

            <div
              className="avatar"
              onClick={() => setDropdown(!dropdown)}
            >
              <FaUserCircle size={26} />
              <span className="username">User</span>
            </div>

            {dropdown && (
              <div className="dropdown">
                <p onClick={() => navigate("/profile")}>
                  My Profile
                </p>
                <p onClick={() => navigate("/dashboard")}>
                  Dashboard
                </p>
                <p onClick={handleLogout} className="logout">
                  Logout
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
