import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import "../styles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Fullname: "",
    EmailAddress: "",
    PhoneNumber: "",
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

  if (!formData.Fullname || !formData.EmailAddress || !formData.PhoneNumber || !formData.Password) {
    toast.error("Please fill all fields ❌", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored"
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // 🔥 This is the fix
      toast.error(data.error || "Registration failed ❌", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
      return;
    }

    toast.success("Account Created Successfully ✅", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored"
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    toast.error("Server error ❌", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored"
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

        <h2>Create Account ✨</h2>
        <p className="subtitle">
          Start your AI-powered career journey
        </p>

        <form onSubmit={handleSubmit}>

          <div className="floating-input">
            <input
              type="text"
              name="Fullname"
              required
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>

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
              type="text"
              name="PhoneNumber"
              required
              onChange={handleChange}
            />
            <label>Phone Number</label>
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
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
    

  );
}

export default Register;
