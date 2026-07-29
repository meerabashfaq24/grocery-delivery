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
        background: "#2e7d32",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🛒 Grocery Delivery</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {token ? (
          <>
            <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
              Products
            </Link>

            <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
              Cart
            </Link>

            <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
              Orders
            </Link>

            <button
              onClick={logout}
              style={{
                padding: "8px 15px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>

            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}