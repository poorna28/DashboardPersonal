
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Student from './components/Student';
import Parent from './components/Parent';
import Employee from './components/Employee';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import './App.css';

function App() {
  useEffect(() => {
    localStorage.removeItem('loggedInUser');
  },[]);
  const isAuthenticated = localStorage.getItem('loggedInUser'); 
  return (
    <Router>
      <Routes>
        {/* Always show the Login page first when the app starts */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route path="/*" element={<DashboardLayout />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

// Dashboard layout including Navbar & Sidebar
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

            {/* Sub-routes under Profile */}
            <Route path="/profile/student" element={<Student />} />
            <Route path="/profile/parent" element={<Parent />} />
            <Route path="/profile/employee" element={<Employee />} />

            {/* Sub-routes under Settings */}
            <Route path="/settings/view-profile" element={<ViewProfile />} />
            <Route path="/settings/edit-profile" element={<EditProfile />} />

            {/* Redirect to /home if no matching route is found */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;