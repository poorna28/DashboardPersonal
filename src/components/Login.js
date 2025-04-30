

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../AuthContext";  // Import the auth context

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();  // Get the login function from context

  const handleLogin = async () => {
    try {
      const response = await api.login({
        email: loginInfo.email,
        password: loginInfo.password
      });
  
      if (response && response.data.success) {
        // Call the login function from context with user data
        login(response.data.user);  // Assuming your API returns user data
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
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={loginInfo.email}
          onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
