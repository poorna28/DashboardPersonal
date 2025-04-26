import React from 'react';
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

  const Navbar = () => {
  const navigate = useNavigate(); 
  const handleLoginClick = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true }); 
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link"><IoSearchCircleSharp/>Search</span>
              </li>
              <li className="nav-item">
                <span className="nav-link"><IoNotificationsCircleOutline/>Notifications</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={handleLoginClick}><RiAccountPinCircleFill/>Log-out</span>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
