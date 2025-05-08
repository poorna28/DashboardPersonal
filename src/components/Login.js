import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../AuthContext"; // Import the auth context
import "./Login.css"; // Import the CSS file for styling

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleLogin = async () => {
    try {
      const response = await api.login({
        email: loginInfo.email,
        password: loginInfo.password,
      });

      if (response && response.data.success) {
        // Call the login function from context with user data
        login(response.data.user); // Assuming your API returns user data
        navigate("/home");
      } else {
        setError(response?.data?.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card p-card">
        <div className="p-card-title">Welcome Back</div>
        <div className="p-card-subtitle">Please log in to your account</div>
        <div className="p-card-body">
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="p-inputtext p-component"
              placeholder="Enter your email"
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="p-inputtext p-component"
              placeholder="Enter your password"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          <button className="login-button p-button" onClick={handleLogin}>
            Login
          </button>
          <div className="p-divider p-divider-horizontal">
            <div className="p-divider-content">OR</div>
          </div>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary no-underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
