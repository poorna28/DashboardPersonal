
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("loggedInUser");
    if (isAuthenticated) {
      navigate("/home", { replace: true }); 
    }
  }, []); 
  
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/home"); 
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;

