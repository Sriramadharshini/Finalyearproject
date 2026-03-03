import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import "../styles/Register.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    EmailAddress: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!formData.EmailAddress || !formData.Password) {
      toast.error("Please fill all fields ❌", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed ❌", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        return;
      }

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      toast.success("Login Successful ✅", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });

      // Redirect to PersonalInfo or dashboard
      setTimeout(() => {
        navigate("/Onboarding");
      }, 2000);

    } catch (error) {
      toast.error("Server error ❌", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="register-wrapper">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="register-card">

        <div className="ai-icon">
          <FaRobot />
        </div>

        <h2>Hii 👋 Welcome Back</h2>
          <p className="subtitle">
            Continue your AI-powered career journey
          </p>

        <form onSubmit={handleSubmit}>

          <div className="floating-input">
            <input
              type="email"
              name="EmailAddress"
              required
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          <div className="floating-input">
            <input
              type="password"
              name="Password"
              required
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="register-btn">
            Login
          </button>

        </form>

        <p className="login-link">
          Don't have an account?
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>

      <ToastContainer />

    </div>
  );
}

export default Login;