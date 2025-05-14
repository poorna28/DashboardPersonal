import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { AiOutlineDown, AiOutlineUp, AiOutlineRight } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header" onClick={toggleSidebar}>
        <BiListUl size={24} className="toggle-icon" />
        {isExpanded && <span className="sidebar-title">Dashboard</span>}
      </div>

      <div className="sidebar-menu">
        {/* Home */}
        <Link className="menu-item" >
          <FaHome size={20} />
          {isExpanded && <span className="menu-text">Home</span>}
        </Link>

        {/* Profile Section */}
        <div 
          className="menu-item-container"
          onMouseEnter={() => {
            console.log("Mouse entered profile");
            setHoveredItem("profile");
          }}
          onMouseLeave={() => {
            console.log("Mouse left profile");
            setHoveredItem(null);
          }}
        >
          <div 
            className="menu-item" 
            onClick={() => {
              console.log("Clicked profile");
              setIsProfileExpanded(!isProfileExpanded);
            }}
          >
            <FaUserAlt size={20} />
            {isExpanded && <span className="menu-text">Profile</span>}
            {isExpanded && (isProfileExpanded ? <AiOutlineUp /> : <AiOutlineDown />)}
            {!isExpanded && <AiOutlineRight className="collapsed-arrow" />}
          </div>
          
          {/* Expanded state submenu */}
          {isProfileExpanded && isExpanded && (
            <div className="submenu">
              <Link className="submenu-item" to="/profile/student">Student</Link>
              <Link className="submenu-item" to="/profile/parent">Parent</Link>
              <Link className="submenu-item" to="/profile/employee">Employee</Link>
            </div>
          )}
          
          {/* Collapsed state hover submenu */}
          {!isExpanded && hoveredItem === "profile" && (
            <div className="hover-submenu">
              <Link className="submenu-item" to="/profile/student">Student</Link>
              <Link className="submenu-item" to="/profile/parent">Parent</Link>
              <Link className="submenu-item" to="/profile/employee">Employee</Link>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div 
          className="menu-item-container"
          onMouseEnter={() => {
            console.log("Mouse entered settings");
            setHoveredItem("settings");
          }}
          onMouseLeave={() => {
            console.log("Mouse left settings");
            setHoveredItem(null);
          }}
        >
          <div 
            className="menu-item" 
            onClick={() => {
              console.log("Clicked settings");
              setIsSettingsExpanded(!isSettingsExpanded);
            }}
          >
            <FaCog size={20} />
            {isExpanded && <span className="menu-text">Settings</span>}
            {isExpanded && (isSettingsExpanded ? <AiOutlineUp /> : <AiOutlineDown />)}
            {!isExpanded && <AiOutlineRight className="collapsed-arrow" />}
          </div>
          
          {/* Expanded state submenu */}
          {isSettingsExpanded && isExpanded && (
            <div className="submenu">
              <Link className="submenu-item" to="/settings/view-profile">View Profile</Link>
              <Link className="submenu-item" to="/settings/edit-profile">Edit Profile</Link>
            </div>
          )}
          
          {/* Collapsed state hover submenu */}
          {!isExpanded && hoveredItem === "settings" && (
            <div className="hover-submenu">
              <Link className="submenu-item" to="/settings/view-profile">View Profile</Link>
              <Link className="submenu-item" to="/settings/edit-profile">Edit Profile</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;