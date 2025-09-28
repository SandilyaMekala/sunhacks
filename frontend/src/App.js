import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeDashboard from "./Dashboard/Employee";
import AdminDashboard from "./Dashboard/Admin";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Routes>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
