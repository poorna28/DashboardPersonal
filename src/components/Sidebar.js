import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        <span className="bi bi-list toggle-icon fs-4"></span>
        {isExpanded && <span className="sidebar-title">Dashboard</span>}
      </div>

      <div className="sidebar-menu">
        {/* Home */}
        <Link className="menu-item" to="/home">
          <span className="bi bi-house fs-5"></span>
          {isExpanded && <span className="menu-text">Home</span>}
        </Link>

        {/* Profile Section */}
        <div
          className="menu-item-container"
          onMouseEnter={() => setHoveredItem("profile")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div
            className="menu-item"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
          >
            <span className="bi bi-person fs-5"></span>
            {isExpanded && <span className="menu-text">Profile</span>}
            {isExpanded && (
              <span
                className={`ms-auto bi ${
                  isProfileExpanded ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></span>
            )}
            {!isExpanded && <span className="ms-auto bi bi-chevron-right"></span>}
          </div>
          {/* Expanded state submenu */}
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
          {/* Collapsed state hover submenu */}
          {!isExpanded && hoveredItem === "profile" && (
            <div className="hover-submenu">
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
        </div>

        {/* Settings Section */}
        <div
          className="menu-item-container"
          onMouseEnter={() => setHoveredItem("settings")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div
            className="menu-item"
            onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
          >
            <span className="bi bi-gear fs-5"></span>
            {isExpanded && <span className="menu-text">Settings</span>}
            {isExpanded && (
              <span
                className={`ms-auto bi ${
                  isSettingsExpanded ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></span>
            )}
            {!isExpanded && <span className="ms-auto bi bi-chevron-right"></span>}
          </div>
          {/* Expanded state submenu */}
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
          {/* Collapsed state hover submenu */}
          {!isExpanded && hoveredItem === "settings" && (
            <div className="hover-submenu">
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
    </div>
  );
};

export default Sidebar;