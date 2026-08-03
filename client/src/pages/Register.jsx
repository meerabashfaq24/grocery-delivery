import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/register", formData);

      
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            onChange={handleChange}
            required
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Register
          </button>

        </form>

        <div className="auth-link">
          <Link to="/login">
            Already have an account? Login
          </Link>
        </div>

      </div>
    </div>
  );
}