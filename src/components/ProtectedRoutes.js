import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <DashboardLayout />;
};

export default ProtectedRoutes;