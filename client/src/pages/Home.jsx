import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
        🛒 Grocery Delivery
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "40px",
          color: "#555",
        }}
      >
        Fresh groceries delivered straight to your doorstep.
      </p>

      {token ? (
        <Link to="/products">
          <button
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              cursor: "pointer",
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Shop Now
          </button>
        </Link>
      ) : (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link to="/login">
            <button
              style={{
                padding: "12px 25px",
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "12px 25px",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}