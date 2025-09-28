import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>Sprint Energy Coach</h1>
          <p className="hero-subtitle">Corporate Energy Management Dashboard</p>
          <p className="hero-description">
            Monitor, analyze, and optimize your company's energy consumption with real-time insights, 
            team comparisons, and AI-powered recommendations.
          </p>
        </div>

        <div className="login-options">
          <div className="login-card-home">
            <h3>Employee Access</h3>
            <p>View your personal energy dashboard, track consumption, and get energy-saving tips.</p>
            <Link to="/login/employee" className="login-link employee">
              Employee Login
            </Link>
            <div className="demo-info">
              <small>Demo: employee.demo / demo123</small>
            </div>
          </div>

          <div className="login-card-home">
            <h3>Admin Access</h3>
            <p>Manage company-wide energy policies, view analytics, and set employee targets.</p>
            <Link to="/login/admin" className="login-link admin">
              Admin Login
            </Link>
            <div className="demo-info">
              <small>Demo: admin.demo / admin123</small>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <h4>📊 Real-time Monitoring</h4>
              <p>Track energy consumption in real-time with interactive charts and graphs</p>
            </div>
            <div className="feature">
              <h4>👥 Team Comparisons</h4>
              <p>Compare performance with department averages and top performers</p>
            </div>
            <div className="feature">
              <h4>💡 Smart Nudges</h4>
              <p>Receive AI-powered recommendations for energy optimization</p>
            </div>
            <div className="feature">
              <h4>🎯 Target Management</h4>
              <p>Set and track energy consumption targets for individuals and teams</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;