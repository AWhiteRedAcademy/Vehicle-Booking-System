import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { userRoleParam } from "../../constants/userHelper";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem('accessToken');

  // 1. If not logged in, Boots them back to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded[userRoleParam] || decoded["role"];

    // 2. Role is authorized, Let them through to the page child views
    if (allowedRoles.includes(userRole)) {
      return <Outlet />;
    }

    // 3. Logged in but WRONG role, Force redirect to their respective home dashboard
    if (userRole === 'Owner') {
      return <Navigate to="/owner/dashboard" replace />;
    } else if (userRole === 'Company') {
      return <Navigate to="/company/dashboard" replace />;
    }
    
  } catch (error) {
    console.error("Invalid token session schema:", error);
    localStorage.removeItem('accessToken');
  }

  return <Navigate to="/login" replace />;
}
