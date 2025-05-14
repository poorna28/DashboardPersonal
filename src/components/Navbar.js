import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import the auth context
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get auth functions from context

  const handleLogoutClick = () => {
    logout(); // Use the logout function from context
    navigate("/login", { replace: true });
  };

  return (
    <div className="container-fluid position-fixed top-0">
      <div className="navbar d-flex justify-content-end">
        <div className="nav-item p-2" >
          <IoSearchCircleSharp size={24} className="nav-icon" />
          <span className="nav-text">Search</span>
        </div>
        <div className="nav-item p-2" >
          <IoNotificationsCircleOutline size={24} className="nav-icon" />
          <span className="nav-text">Notifications</span>
        </div>
        <div className="nav-item p-2" onClick={handleLogoutClick}>
          <RiAccountPinCircleFill size={24} className="nav-icon" />
          <span className="nav-text">Log-out ({user?.name || "User"})</span>
        </div>


      </div>
    </div>
  );
};

export default Navbar;