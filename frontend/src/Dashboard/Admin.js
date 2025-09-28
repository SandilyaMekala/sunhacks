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

// Enhanced Employee Footprint Modal
const EmployeeFootprintModal = ({ employee, footprint, onClose }) => {
  if (!employee || !footprint) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '12px',
        maxWidth: '800px', width: '100%', maxHeight: '90vh',
        overflowY: 'auto', position: 'relative'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white', padding: '25px', borderRadius: '12px 12px 0 0'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute', top: '15px', right: '15px',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '30px', height: '30px',
              color: 'white', cursor: 'pointer', fontSize: '16px'
            }}
          >×</button>
          <h2 style={{ margin: '0 30px 0 0', fontSize: '24px' }}>
            {footprint.name}'s Energy Footprint
          </h2>
          <div style={{ display: 'flex', gap: '30px', marginTop: '15px', fontSize: '14px' }}>
            <span>🏢 {footprint.department}</span>
            <span>🏠 {footprint.workingPattern}</span>
            <span>⚡ {footprint.totalMonthly} kWh/month</span>
            <span>💰 ${footprint.costImpact}</span>
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          {/* Key Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: '#f0fdf4', padding: '15px', borderRadius: '8px',
              border: '1px solid #bbf7d0', textAlign: 'center'
            }}>
              <h4 style={{ color: '#15803d', fontSize: '24px', margin: '0' }}>
                {footprint.dailyAverage}
              </h4>
              <p style={{ color: '#166534', fontSize: '12px', margin: '5px 0 0 0' }}>kWh/day</p>
            </div>
            <div style={{
              background: '#fef3c7', padding: '15px', borderRadius: '8px',
              border: '1px solid #fed7aa', textAlign: 'center'
            }}>
              <h4 style={{ color: '#d97706', fontSize: '24px', margin: '0' }}>
                {footprint.carbonFootprint}
              </h4>
              <p style={{ color: '#92400e', fontSize: '12px', margin: '5px 0 0 0' }}>CO₂ tons</p>
            </div>
            <div style={{
              background: '#dbeafe', padding: '15px', borderRadius: '8px',
              border: '1px solid #93c5fd', textAlign: 'center'
            }}>
              <h4 style={{ color: '#1d4ed8', fontSize: '24px', margin: '0' }}>#{employee.rank}</h4>
              <p style={{ color: '#1e40af', fontSize: '12px', margin: '5px 0 0 0' }}>Company Rank</p>
            </div>
            <div style={{
              background: '#f3e8ff', padding: '15px', borderRadius: '8px',
              border: '1px solid #c4b5fd', textAlign: 'center'
            }}>
              <h4 style={{ color: '#7c3aed', fontSize: '24px', margin: '0' }}>{employee.efficiency}%</h4>
              <p style={{ color: '#6d28d9', fontSize: '12px', margin: '5px 0 0 0' }}>Efficiency</p>
            </div>
          </div>

          {/* Device Breakdown */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#374151' }}>Device Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {footprint.devices.map((device, index) => {
                const efficiencyColor = device.efficiency > 85 ? '#10b981' : device.efficiency > 70 ? '#f59e0b' : '#ef4444';
                return (
                  <div key={device.name} style={{
                    background: 'white', border: '1px solid #e5e7eb',
                    borderRadius: '8px', padding: '15px'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{device.name}</h4>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      <div>⚡ {device.usage} kWh</div>
                      <div>🕐 {device.hours} hours</div>
                      <div style={{ color: efficiencyColor }}>📊 {device.efficiency}% efficient</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements & Recommendations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#374151' }}>🏆 Achievements</h3>
              {footprint.achievements.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {footprint.achievements.map((achievement, index) => (
                    <span key={index} style={{
                      background: '#ecfdf5', color: '#065f46',
                      padding: '4px 8px', borderRadius: '12px',
                      fontSize: '12px', border: '1px solid #a7f3d0'
                    }}>
                      {achievement}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>No achievements yet</p>
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#374151' }}>💡 Top Recommendation</h3>
              <p style={{
                background: '#fef3c7', padding: '12px', borderRadius: '8px',
                border: '1px solid #fcd34d', fontSize: '14px', margin: 0,
                color: '#92400e'
              }}>
                {footprint.topRecommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeTable = ({ employees, footprints, onViewFootprint }) => (
  <div className="card employee-table" style={{ overflowX: 'auto' }}>
    <h3 style={{ fontSize: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>
      Employee Energy Management
    </h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Employee</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Department</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Usage</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Efficiency</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Rank</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Forecast</th>
          <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#374151' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => {
          const efficiencyColor = employee.efficiency > 85 ? '#10b981' : 
                                 employee.efficiency > 70 ? '#f59e0b' : '#ef4444';
          const rankColor = employee.rank <= 2 ? '#10b981' :
                           employee.rank <= 4 ? '#f59e0b' : '#ef4444';
          
          return (
            <tr key={employee.id} style={{ 
              borderBottom: index < employees.length - 1 ? '1px solid #f3f4f6' : 'none'
            }}>
              <td style={{ padding: '12px 8px' }}>
                <div style={{ fontWeight: '600', color: '#111827' }}>{employee.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Target: {employee.target} kWh</div>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <span style={{
                  background: '#f3f4f6', padding: '4px 8px', borderRadius: '12px',
                  fontSize: '12px', color: '#374151'
                }}>
                  {employee.department}
                </span>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <div style={{ fontWeight: '600' }}>{employee.used} kWh</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>of {employee.target}</div>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <span style={{
                  color: efficiencyColor, fontWeight: '600'
                }}>
                  {employee.efficiency}%
                </span>
              </td>
              <td style={{ padding: '12px 8px' }}>
                <span style={{
                  background: `${rankColor}20`, color: rankColor,
                  padding: '4px 8px', borderRadius: '12px',
                  fontSize: '12px', fontWeight: '600'
                }}>
                  #{employee.rank}
                </span>
              </td>
              <td style={{ 
                padding: '12px 8px',
                color: employee.forecast > 0 ? '#ef4444' : '#10b981',
                fontWeight: '600'
              }}>
                {employee.forecast > 0 ? '+' : ''}{employee.forecast}%
              </td>
              <td style={{ padding: '12px 8px' }}>
                <button
                  onClick={() => onViewFootprint(employee)}
                  style={{
                    background: '#3b82f6', color: 'white',
                    border: 'none', padding: '6px 12px',
                    borderRadius: '6px', fontSize: '12px',
                    cursor: 'pointer', fontWeight: '500'
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const RealTimeUsageChart = ({ data }) => {
  // Handle both old format (labels/values) and new format (array of objects)
  const labels = Array.isArray(data) 
    ? data.map(item => item.time)
    : data.labels || [];
    
  const values = Array.isArray(data)
    ? data.map(item => item.kWe)
    : data.values || [];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Power Usage (kW)',
        data: values,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-Time Usage (Last 7 Days)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Power (kW)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showFootprintModal, setShowFootprintModal] = useState(false);

  const handleViewFootprint = (employee) => {
    setSelectedEmployee(employee);
    setShowFootprintModal(true);
  };

  const closeFootprintModal = () => {
    setShowFootprintModal(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/admin/dashboard')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#6b7280' }}>
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '10px' }}>Error Loading Data</h2>
          <p style={{ color: '#6b7280' }}>
            Could not connect to the server. Make sure the backend is running on localhost:8000
          </p>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-dashboard">
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#6b7280' }}>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <CompanySummary summary={data.companySummary} />

      <div className="dashboard-grid">
        <div className="left-panel">
          <EmployeeTable 
            employees={data.employeeData} 
            footprints={data.employeeFootprints}
            onViewFootprint={handleViewFootprint}
          />
        </div>
        
        <div className="right-panel">
          <div className="card">
            <RealTimeUsageChart data={data.realTimeUsage} />
          </div>
        </div>
      </div>

      {/* Employee Footprint Modal */}
      {showFootprintModal && selectedEmployee && (
        <EmployeeFootprintModal 
          employee={selectedEmployee}
          footprint={data.employeeFootprints[selectedEmployee.id.toString()]}
          onClose={closeFootprintModal}
        />
      )}
    </div>
  );
};

export default Admin;