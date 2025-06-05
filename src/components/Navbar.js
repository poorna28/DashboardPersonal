import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="container-fluid position-fixed top-0">
      <div className="navbar d-flex justify-content-end">
        <div className="nav-item p-2">
          <span className="bi bi-search nav-icon fs-5"></span>
          <span className="nav-text">Search</span>
        </div>
        <div className="nav-item p-2">
          <span className="bi bi-bell nav-icon fs-5"></span>
          <span className="nav-text">Notifications</span>
        </div>
        <div className="nav-item p-2" onClick={handleLogoutClick}>
          <span className="bi bi-person-circle nav-icon fs-5"></span>
          <span className="nav-text">Log-out ({user?.name || "User"})</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;