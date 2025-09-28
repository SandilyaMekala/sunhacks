import React, { useState, useEffect } from 'react';
// import companyAdminData from '../json/Admin.json'; // Now using API
import './Admin.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompanySummary = ({ summary }) => {
  const color = summary.comparisonPercent >= 0 ? 'red' : 'green';
  const sign = summary.comparisonPercent > 0 ? '+' : '';

  return (
    <div className="company-summary" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
      <p style={{ margin: 0, fontSize: '18px', color: '#4a5568' }}>
        {summary.name} — Today: 
        <span style={{ marginLeft: '10px' }}>{summary.todayKWh} kWh</span> | 
        <span style={{ marginLeft: '10px' }}>$ {summary.todayCost}</span> | 
        <span style={{ marginLeft: '10px' }}>CO₂: {summary.todayCO2} t</span> 
        <span style={{ marginLeft: '15px', color: color }}>
          {sign}{summary.comparisonPercent}% vs {summary.comparisonPeriod}
        </span>
      </p>
    </div>
  );
};

const EmployeeTable = ({ employees }) => (
  <div className="card employee-table" style={{ overflowX: 'auto' }}>
    <h3 style={{ fontSize: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>
      Employees (targets & progress)
    </h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
          <th style={{ padding: '8px 0' }}>Employee</th>
          <th style={{ padding: '8px 0' }}>Target (kWh/mo)</th>
          <th style={{ padding: '8px 0' }}>Used</th>
          <th style={{ padding: '8px 0' }}>Forecast</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index} style={{ borderBottom: index < employees.length - 1 ? '1px solid #f7fafc' : 'none' }}>
            <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{employee.name}</td>
            <td style={{ padding: '8px 0' }}>{employee.target}</td>
            <td style={{ padding: '8px 0' }}>{employee.used}</td>
            <td style={{ 
              padding: '8px 0', 
              color: employee.forecast > 0 ? 'red' : (employee.forecast < 0 ? 'green' : 'black') 
            }}>
              {employee.forecast > 0 ? '+' : ''}{employee.forecast}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RealTimeUsageChart = ({ data }) => {
  const chartData = {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: 'kW Usage',
        data: data.map(point => point.kWe),
        fill: true,
        backgroundColor: 'rgba(56, 161, 105, 0.2)',
        borderColor: '#38a169',
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#38a169'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'kW' }, beginAtZero: true }
    }
  };

  return (
    <div className="card real-time-usage" style={{ height: '220px' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Real-Time Usage (kW)</h3>
      <Line data={chartData} options={options} height={150} />
      <span style={{ float: 'right', fontSize: '12px', color: '#4299e1', marginTop: '5px' }}>Now</span>
    </div>
  );
};

const DepartmentTargets = ({ departments }) => (
  <div className="card department-targets">
    <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Department Targets (month)</h3>
    {departments.map(dept => (
      <div key={dept.name} style={{ marginBottom: '15px' }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{dept.name}</p>
        <div style={{ height: '15px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${dept.progress}%`, height: '100%', backgroundColor: '#38a169' }} />
          <span style={{ position: 'absolute', right: '5px', top: '0', color: '#4a5568', fontSize: '12px', lineHeight: '15px' }}>
            {dept.progress}%
          </span>
        </div>
      </div>
    ))}
  </div>
);

const QuickActions = ({ actions }) => (
  <div className="card quick-actions">
    <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Quick Actions</h3>
    <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
      {actions.map((action, index) => (
        <li key={index} style={{ marginBottom: '5px' }}>{action}</li>
      ))}
    </ul>
  </div>
);

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8000/api/admin/dashboard');
        if (!response.ok) throw new Error('Network response not ok');
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load admin data. Make sure the backend server is running on port 8000.');
        // You can add fallback to mock data if needed:
        // setData(companyAdminData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading-state">Loading Admin Dashboard...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!data) return null;

  return (
    <div className="admin-dashboard-container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f7fafc' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Sprint Energy Coach</h1>
        <p>Logged in as: <strong>{data.adminInfo.loggedAs}</strong></p>
      </header>

      <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Company Admin Dashboard</h2>

      <CompanySummary summary={data.companySummary} />

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '20px' }}>
        <div className="left-panel">
          <EmployeeTable employees={data.employeeData} />
        </div>
        <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RealTimeUsageChart data={data.realTimeUsage} />
          <DepartmentTargets departments={data.departmentTargets} />
          <QuickActions actions={data.quickActions} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
