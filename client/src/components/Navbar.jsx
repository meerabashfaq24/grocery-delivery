import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "75px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2e7d32",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        🛒 GreenCart
      </Link>

      {/* Center Navigation */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          fontWeight: "500",
        }}
      >
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        {token && (
          <>
            <Link to="/products" style={linkStyle}>
              Products
            </Link>

            <Link to="/cart" style={linkStyle}>
              Cart
            </Link>

            <Link to="/orders" style={linkStyle}>
              Orders
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        {!token ? (
          <>
            <Link to="/login">
              <button style={outlineBtn}>
                Login
              </button>
            </Link>

            <Link to="/register">
              <button style={greenBtn}>
                Register
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={greenBtn}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#444",
  fontSize: "17px",
};

const greenBtn = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  padding: "10px 22px",
  borderRadius: "8px",
  cursor: "pointer",
};

const outlineBtn = {
  background: "white",
  color: "#2e7d32",
  border: "2px solid #2e7d32",
  padding: "10px 22px",
  borderRadius: "8px",
  cursor: "pointer",
};