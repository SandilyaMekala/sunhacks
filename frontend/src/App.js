import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import EmployeeLogin from "./components/EmployeeLogin";
import AdminLogin from "./components/AdminLogin";
import EmployeeDashboard from "./Dashboard/Employee";
import AdminDashboard from "./Dashboard/Admin";

// Navigation Header Component
const NavHeader = () => {
  const { isAuthenticated, user, userType, logout } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div style={{
      background: '#2d3748',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Sprint Energy Coach</span>
        <span style={{ marginLeft: '20px', opacity: 0.8 }}>
          {userType === 'admin' ? 'Admin Dashboard' : 'Employee Dashboard'}
        </span>
      </div>
      <div>
        <span style={{ marginRight: '15px' }}>
          Welcome, {user?.name || userType}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader />
      <div className="flex-1">
        <Routes>
          {/* Home and Login Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect old routes */}
          <Route path="/dashboard/employee" element={<Navigate to="/employee" replace />} />
          <Route path="/dashboard/admin" element={<Navigate to="/admin" replace />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
