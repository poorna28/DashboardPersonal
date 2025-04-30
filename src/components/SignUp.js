import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!signUpInfo.name) newErrors.name = "Name is required";
    if (!signUpInfo.email) newErrors.email = "Email is required";
    if (!signUpInfo.password) newErrors.password = "Password is required";
    if (!signUpInfo.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    return newErrors;
  };

  const handleSignUp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      // Transform mobileNumber to mobile_number for backend
      const payload = {
        name: signUpInfo.name,
        email: signUpInfo.email,
        password: signUpInfo.password,
        mobile_number: signUpInfo.mobileNumber // Key change here
      };
      
      await api.signUpUser(payload);
      navigate("/login");
    } catch (err) {
      console.error("SignUp error:", err.response ? err.response.data : err);
      setErrors({ 
        server: err.response?.data?.message || "Failed to sign up. Try again." 
      });
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={signUpInfo.name}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, name: e.target.value })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={signUpInfo.email}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, email: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={signUpInfo.password}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, password: e.target.value })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Mobile Number"
          value={signUpInfo.mobileNumber}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, mobileNumber: e.target.value })}
        />
        {errors.mobileNumber && <p style={{ color: "red" }}>{errors.mobileNumber}</p>}
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
