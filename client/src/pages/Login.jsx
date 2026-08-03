import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/products"); 

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Welcome Back</h1>

        <form onSubmit={handleSubmit}>

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="auth-link">
          <Link to="/register">
            Don't have an account? Register
          </Link>
        </div>

      </div>
    </div>
  );
}