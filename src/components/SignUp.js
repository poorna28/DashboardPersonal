import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./SignUp.css";

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
    console.log("SignUp Info:", signUpInfo); // Log the signup info
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        name: signUpInfo.name,
        email: signUpInfo.email,
        password: signUpInfo.password,
        mobile_number: signUpInfo.mobileNumber,
      };

      const response = await api.signUpUser(payload);
      console.log("Signup response:", response.data); // Log the response
      navigate("/login");
    } catch (err) {
      console.error("SignUp error:", err.response ? err.response.data : err);
      setErrors({
        server: err.response?.data?.message || "Failed to sign up. Try again.",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card p-card">
        <div className="p-card-title">Create Your Account</div>
        <div className="p-card-body">
          <div className="p-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="p-inputtext p-component"
              placeholder="Enter your name"
              value={signUpInfo.name}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, name: e.target.value })
              }
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="p-inputtext p-component"
              placeholder="Enter your email"
              value={signUpInfo.email}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, email: e.target.value })
              }
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="p-inputtext p-component"
              placeholder="Enter your password"
              value={signUpInfo.password}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, password: e.target.value })
              }
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          <div className="p-field">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="text"
              className="p-inputtext p-component"
              placeholder="Enter your mobile number"
              value={signUpInfo.mobileNumber}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, mobileNumber: e.target.value })
              }
            />
            {errors.mobileNumber && (
              <p style={{ color: "red" }}>{errors.mobileNumber}</p>
            )}
          </div>
          {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
          <button className="signup-button p-button" onClick={handleSignUp}>
            Sign Up
          </button>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-primary no-underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
