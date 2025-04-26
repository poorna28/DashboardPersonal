import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa';
import { BiListUl } from "react-icons/bi";
import { AiOutlineDown, AiOutlineUp, AiOutlineRight } from "react-icons/ai";
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // PrimeIcons
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  // Toggle sidebar size
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  
  // Toggle profile submenu
  const handleProfileToggle = () => {
    if (isExpanded) {
      setIsProfileExpanded(!isProfileExpanded);
    } else {
      setIsProfileExpanded(true);
    }
  };

  // Toggle settings submenu
  const handleSettingsToggle = () => {
    if (isExpanded) {
      setIsSettingsExpanded(!isSettingsExpanded);
    } else {
      setIsSettingsExpanded(true);
    }
  };

  // Collapse submenu on mouse leave
  const handleMouseLeave = () => {
    setIsProfileExpanded(false);
    setIsSettingsExpanded(false);
  };

  return (
    <div className={`p-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Dashboard Icon */}
      <div className="p-sidebar-header" onClick={toggleSidebar}>
        <BiListUl size={24} style={{ cursor: 'pointer' }} />
        {isExpanded && <span className="sidebar-title">Dashboard</span>}
      </div>

      {/* Menu Items */}
      <div className="p-sidebar-menu" onMouseLeave={handleMouseLeave}>
        {/* Home */}
        <Link className="p-menuitem-link" to="/">
          <FaHome size={20} />
          {isExpanded && <span className="menu-text">Home</span>}
        </Link>

        {/* Profile Section with Sub-items */}
        <div
          className="p-menuitem-link"
          onClick={handleProfileToggle}
          onMouseEnter={() => setIsProfileExpanded(true)}
        >
          <FaUserAlt size={20} />
          {isExpanded && <span className="menu-text">Profile</span>}
          {isExpanded && (isProfileExpanded ? <AiOutlineUp size={14} /> : <AiOutlineDown size={14} />)}
          {!isExpanded && <AiOutlineRight size={14} className="collapsed-arrow" />}
        </div>
        {isProfileExpanded && (
          <div className={`p-submenu ${isExpanded ? '' : 'collapsed-hover-submenu'}`}>
            <Link className="p-submenu-link" to="/profile/student">
              <span className="submenu-text">Student</span>
            </Link>
            <Link className="p-submenu-link" to="/profile/parent">
              <span className="submenu-text">Parent</span>
            </Link>
            <Link className="p-submenu-link" to="/profile/employee">
              <span className="submenu-text">Employee</span>
            </Link>
          </div>
        )}

        {/* Settings Section with Sub-items */}
        <div
          className="p-menuitem-link"
          onClick={handleSettingsToggle}
          onMouseEnter={() => setIsSettingsExpanded(true)}
        >
          <FaCog size={20} />
          {isExpanded && <span className="menu-text">Settings</span>}
          {isExpanded && (isSettingsExpanded ? <AiOutlineUp size={14} /> : <AiOutlineDown size={14} />)}
          {!isExpanded && <AiOutlineRight size={14} className="collapsed-arrow" />}
        </div>
        {isSettingsExpanded && (
          <div className={`p-submenu ${isExpanded ? '' : 'collapsed-hover-submenu'}`}>
            <Link className="p-submenu-link" to="/settings/view-profile">
              <span className="submenu-text">View Profile</span>
            </Link>
            <Link className="p-submenu-link" to="/settings/edit-profile">
              <span className="submenu-text">Edit Profile</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
