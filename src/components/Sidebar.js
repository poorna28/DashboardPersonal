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

  // Toggle sidebar size
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  // Toggle profile submenu
  const handleProfileToggle = () => setIsProfileExpanded(!isProfileExpanded);

  // Toggle settings submenu
  const handleSettingsToggle = () => setIsSettingsExpanded(!isSettingsExpanded);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header" onClick={toggleSidebar}>
        <BiListUl size={24} className="toggle-icon" />
        {isExpanded && <span className="sidebar-title">Dashboard</span>}
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {/* Home */}
        <Link className="menu-item" to="/">
          <FaHome size={20} />
          {isExpanded && <span className="menu-text">Home</span>}
        </Link>

        {/* Profile Section */}
        <div className="menu-item" onClick={handleProfileToggle}>
          <FaUserAlt size={20} />
          {isExpanded && <span className="menu-text">Profile</span>}
          {isExpanded && (isProfileExpanded ? <AiOutlineUp /> : <AiOutlineDown />)}
          {!isExpanded && <AiOutlineRight className="collapsed-arrow" />}
        </div>
        {isProfileExpanded && isExpanded && (
          <div className="submenu">
            <Link className="submenu-item" to="/profile/student">
              Student
            </Link>
            <Link className="submenu-item" to="/profile/parent">
              Parent
            </Link>
            <Link className="submenu-item" to="/profile/employee">
              Employee
            </Link>
          </div>
        )}

        {/* Settings Section */}
        <div className="menu-item" onClick={handleSettingsToggle}>
          <FaCog size={20} />
          {isExpanded && <span className="menu-text">Settings</span>}
          {isExpanded && (isSettingsExpanded ? <AiOutlineUp /> : <AiOutlineDown />)}
          {!isExpanded && <AiOutlineRight className="collapsed-arrow" />}
        </div>
        {isSettingsExpanded && isExpanded && (
          <div className="submenu">
            <Link className="submenu-item" to="/settings/view-profile">
              View Profile
            </Link>
            <Link className="submenu-item" to="/settings/edit-profile">
              Edit Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
