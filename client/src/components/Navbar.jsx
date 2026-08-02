import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

    <nav className="navbar">

      <Link to="/" className="logo">
        🛒 FreshMart
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/products">Products</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="auth-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="auth-btn"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>

  );

}