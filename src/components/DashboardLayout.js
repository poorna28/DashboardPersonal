import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate here
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Student from './Student';
import Parent from './Parent';
import Employee from './Employee';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

const DashboardLayout = () => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Navbar />
        <div className="container-fluid mt-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/student" element={<Student />} />
            <Route path="/profile/parent" element={<Parent />} />
            <Route path="/profile/employee" element={<Employee />} />
            <Route path="/settings/view-profile" element={<ViewProfile />} />
            <Route path="/settings/edit-profile" element={<EditProfile />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;