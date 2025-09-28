import React, { useState, useEffect } from 'react';
import './Employee.css';
// import mockDashboardData from '../json/Employee.json'; // JSON import - now using API
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompanyTarget = ({ targetKWh, currentKWh, progressPercent, unit }) => {
  const isExcellent = progressPercent < 50;
  const bgColor = isExcellent ? '#dcfce7' : '#e6ffe6';
  const badgeColor = isExcellent ? '#059669' : '#38a169';
  const badgeText = isExcellent ? '🏆 Excellent Progress' : 'Good Progress';
  
  return (
    <div className="company-target-bar" style={{ 
      backgroundColor: bgColor, 
      padding: '12px', 
      borderRadius: '8px', 
      marginBottom: '20px', 
      fontWeight: 'bold',
      border: '2px solid #10b981',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ 
          backgroundColor: badgeColor, 
          color: 'white', 
          padding: '6px 12px', 
          borderRadius: '6px', 
          marginRight: '15px',
          fontSize: '14px'
        }}>
          🎯 Monthly Target: {targetKWh} {unit}
        </span>
        <span style={{ 
          backgroundColor: '#f0fdf4', 
          color: '#059669', 
          padding: '4px 10px', 
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {badgeText}
        </span>
      </div>
      <div style={{ marginTop: '8px' }}>
        <span style={{color: badgeColor, fontSize: '16px'}}>
          💡 Current Usage: {currentKWh} {unit} ({progressPercent}%) - 
          <span style={{color: '#059669', fontWeight: '700'}}>
            {progressPercent < 50 ? ' Excellent efficiency!' : ' Keep up the good work!'}
          </span>
        </span>
      </div>
    </div>
  );
};

const EnergyRings = ({ today, week, month }) => {
  const todayPercent = (today.used / today.target) * 100;
  const weekPercent = (week.used / week.target) * 100;
  const monthPercent = (month.used / month.target) * 100;
  
  const getColor = (percent) => {
    if (percent < 50) return '#10b981'; // Excellent - Green
    if (percent < 70) return '#3b82f6'; // Good - Blue  
    if (percent < 85) return '#f59e0b'; // Warning - Amber
    return '#ef4444'; // High usage - Red
  };
  
  return (
    <div className="energy-rings-container" style={{ position: 'relative', width: '200px', height: '200px', margin: '20px auto' }}>
      {/* Month Ring */}
      <div style={{ 
        position: 'absolute', width: '160px', height: '160px', top: '20px', left: '20px', 
        borderRadius: '50%', border: `4px solid ${getColor(monthPercent)}`, 
        opacity: 0.8, transform: `rotate(${(monthPercent / 100) * 360}deg)`,
        background: `conic-gradient(${getColor(monthPercent)} ${monthPercent * 3.6}deg, rgba(0,0,0,0.1) ${monthPercent * 3.6}deg)`
      }} />
      {/* Week Ring */}
      <div style={{ 
        position: 'absolute', width: '120px', height: '120px', top: '40px', left: '40px', 
        borderRadius: '50%', border: `4px solid ${getColor(weekPercent)}`, 
        opacity: 0.8, transform: `rotate(${(weekPercent / 100) * 360}deg)`,
        background: `conic-gradient(${getColor(weekPercent)} ${weekPercent * 3.6}deg, rgba(0,0,0,0.1) ${weekPercent * 3.6}deg)`
      }} />
      {/* Today Ring */}
      <div style={{ 
        position: 'absolute', width: '80px', height: '80px', top: '60px', left: '60px', 
        borderRadius: '50%', border: `4px solid ${getColor(todayPercent)}`, 
        opacity: 0.9, transform: `rotate(${(todayPercent / 100) * 360}deg)`,
        background: `conic-gradient(${getColor(todayPercent)} ${todayPercent * 3.6}deg, rgba(0,0,0,0.1) ${todayPercent * 3.6}deg)`
      }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold', color: getColor(todayPercent) }}>
          Today {today.used.toFixed(1)} / {today.target} kWh
        </p>
        <p style={{ margin: 0, fontSize: '10px', color: getColor(weekPercent) }}>
          Week {week.used} / {week.target} kWh
        </p>
        <p style={{ margin: 0, fontSize: '10px', color: getColor(monthPercent) }}>
          Month {month.used} / {month.target} kWh
        </p>
        <div style={{ 
          fontSize: '8px', 
          marginTop: '4px', 
          padding: '2px 4px', 
          borderRadius: '8px', 
          backgroundColor: monthPercent < 50 ? '#dcfce7' : '#f0fdf4',
          color: '#059669',
          fontWeight: 'bold'
        }}>
          {monthPercent < 50 ? '🏆 Excellent!' : '✅ On Track'}
        </div>
      </div>
    </div>
  );
};

const TeamProgress = ({ you, avgDept, topPeer }) => (
  <div className="card team-progress">
    <h3>Team Progress (this month)</h3>
    {[{ label: 'You', percent: you }, { label: 'Avg Dept', percent: avgDept }, { label: 'Top Peer', percent: topPeer }].map(item => (
      <div key={item.label} style={{ marginBottom: '10px' }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{item.label}</p>
        <div style={{ height: '15px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: '#10b981' }} />
        </div>
        <p style={{ margin: 0, float: 'right', fontSize: '14px', marginTop: '-18px' }}>{item.percent}%</p>
      </div>
    ))}
  </div>
);

const RealTimeUsage = ({ data }) => {
  const chartData = {
    labels: data.map(point => point.hour),
    datasets: [
      {
        label: 'Usage (W)',
        data: data.map(point => point.usage),
        borderColor: '#38a169',
        backgroundColor: 'rgba(56, 161, 105, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className="card real-time-usage" style={{ height: '200px' }}>
      <h3>Real-Time Usage (W)</h3>
      <div style={{ height: '140px', padding: '10px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const MyDevices = ({ devices }) => (
  <div className="card my-devices">
    <h3>My Devices (today)</h3>
    <dl>
      {devices.map(device => (
        <React.Fragment key={device.name}>
          <dt style={{ float: 'left', clear: 'left', fontWeight: 'normal' }}>{device.name}</dt>
          <dd style={{ float: 'right', fontWeight: 'bold' }}>{device.usage.toFixed(1)} {device.unit}</dd>
        </React.Fragment>
      ))}
    </dl>
  </div>
);

// Enhanced Device Details Component
const EnhancedDeviceView = ({ devices }) => {
  const totalConsumption = devices.reduce((sum, device) => sum + device.usage, 0);
  const deviceColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'];
  
  return (
    <div className="enhanced-device-section">
      <h3 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
        Device Energy Breakdown
      </h3>
      
      {/* Device Grid */}
      <div className="device-grid">
        {devices.map((device, index) => {
          const percentage = ((device.usage / totalConsumption) * 100).toFixed(1);
          const efficiency = device.usage < 2 ? 'Efficient' : device.usage < 4 ? 'Moderate' : 'High Usage';
          const efficiencyColor = device.usage < 2 ? '#10b981' : device.usage < 4 ? '#f59e0b' : '#ef4444';
          
          return (
            <div key={device.name} className="device-card">
              <div className="device-header">
                <h4>{device.name}</h4>
                <span className="device-percentage" style={{ color: deviceColors[index % deviceColors.length] }}>
                  {percentage}%
                </span>
              </div>
              
              <div className="device-consumption">
                <span className="consumption-value">{device.usage.toFixed(1)}</span>
                <span className="consumption-unit">{device.unit}</span>
              </div>
              
              <div className="device-efficiency">
                <span style={{ color: efficiencyColor, fontSize: '12px', fontWeight: 'bold' }}>
                  {efficiency}
                </span>
              </div>
              
              <div className="device-bar">
                <div 
                  className="device-bar-fill"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: deviceColors[index % deviceColors.length]
                  }}
                />
              </div>
              
              {/* Device-specific tips */}
              <div className="device-tip">
                {getDeviceTip(device.name, device.usage)}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <div className="device-summary">
        <div className="summary-card">
          <h4>Total Consumption</h4>
          <span className="summary-value">{totalConsumption.toFixed(1)} kWh</span>
        </div>
        <div className="summary-card">
          <h4>Most Used Device</h4>
          <span className="summary-value">
            {devices.reduce((max, device) => device.usage > max.usage ? device : max).name}
          </span>
        </div>
        <div className="summary-card">
          <h4>Efficiency Score</h4>
          <span className="summary-value">
            {Math.round(((devices.filter(d => d.usage < 2).length / devices.length) * 100))}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper function for device-specific tips
const getDeviceTip = (deviceName, usage) => {
  const tips = {
    'Laptop/Desktop': usage > 3 ? '💡 Enable power saving mode' : '✅ Good power management',
    'Monitor': usage > 1.5 ? '💡 Reduce brightness to 70%' : '✅ Optimal brightness level',
    'Docking Station': usage > 1 ? '💡 Unplug when not in use' : '✅ Efficient usage',
    'Lighting': usage > 1.2 ? '💡 Switch to LED bulbs' : '✅ Energy efficient lighting',
    'Printer/Scanner': usage > 0.8 ? '💡 Use duplex printing' : '✅ Eco-friendly printing',
    'AC/Fan/Heater': usage > 3 ? '💡 Adjust temperature by 2°F' : '✅ Optimal temperature setting'
  };
  
  return tips[deviceName] || '💡 Monitor usage patterns';
};

// Device Analytics Component
const DeviceAnalytics = ({ devices }) => {
  return (
    <div className="device-analytics-section">
      <h3 style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>
        📊 Device Usage Analytics
      </h3>
      
      <div className="analytics-grid">
        {devices.map((device, index) => {
          const statusColor = {
            'active': '#10b981',    // success-primary
            'standby': '#f59e0b',   // warning-primary
            'idle': '#64748b'       // neutral-500
          }[device.status || 'idle'];

          const efficiencyColor = {
            'excellent': '#10b981', // success-primary
            'good': '#3b82f6',      // info-primary
            'moderate': '#f59e0b',  // warning-primary
            'poor': '#ef4444'       // danger-primary
          }[device.efficiency || 'good'];

          return (
            <div key={device.name} className="analytics-card">
              <div className="analytics-header">
                <h4>{device.name}</h4>
                <div className="device-status" style={{ backgroundColor: statusColor }}>
                  {device.status || 'active'}
                </div>
              </div>
              
              <div className="analytics-metrics">
                <div className="metric">
                  <span className="metric-label">Current</span>
                  <span className="metric-value">{device.usage?.toFixed(1)} kWh</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Daily Avg</span>
                  <span className="metric-value">{device.avgDaily?.toFixed(1)} kWh</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Efficiency</span>
                  <span className="metric-value" style={{ color: efficiencyColor }}>
                    {device.efficiency || 'Good'}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Last Used</span>
                  <span className="metric-value">{device.lastUsed || 'Unknown'}</span>
                </div>
              </div>

              {/* Hourly usage pattern */}
              {device.hourlyUsage && (
                <div className="hourly-pattern">
                  <span className="pattern-label">Today's Usage Pattern</span>
                  <div className="usage-bars">
                    {device.hourlyUsage.map((usage, hour) => (
                      <div 
                        key={hour}
                        className="usage-bar"
                        style={{ 
                          height: `${(usage / Math.max(...device.hourlyUsage)) * 40}px`,
                          backgroundColor: statusColor,
                          opacity: 0.7 + (usage / Math.max(...device.hourlyUsage)) * 0.3
                        }}
                        title={`Hour ${hour + 8}: ${usage} kWh`}
                      />
                    ))}
                  </div>
                  <div className="time-labels">
                    <span>8am</span>
                    <span>12pm</span>
                    <span>3pm</span>
                  </div>
                </div>
              )}

              {/* Device recommendations */}
              <div className="device-recommendations">
                <div className="recommendation-item">
                  {getDeviceTip(device.name, device.usage)}
                </div>
                {device.usage > device.avgDaily && (
                  <div className="recommendation-item warning">
                    ⚠️ Above average usage today
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Efficiency Comparison */}
      <div className="device-comparison">
        <h4>📊 Device Efficiency Overview</h4>
        <div className="efficiency-stats">
          <div className="stat-item">
            <span className="stat-label">Most Efficient</span>
            <span className="stat-value efficient">
              {devices.reduce((best, device) => 
                (device.usage < best.usage) ? device : best
              ).name.split('/')[0]}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Needs Attention</span>
            <span className="stat-value attention">
              {devices.reduce((worst, device) => 
                (device.usage > worst.usage) ? device : worst
              ).name.split('/')[0]}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Usage</span>
            <span className="stat-value average">
              {(devices.reduce((sum, device) => sum + device.usage, 0) / devices.length).toFixed(1)} kWh
            </span>
          </div>
        </div>
        
        <div className="comparison-grid">
          {devices.map((device, index) => {
            const avgUsage = devices.reduce((sum, d) => sum + d.usage, 0) / devices.length;
            const efficiency = ((avgUsage - device.usage) / avgUsage) * 100;
            const isEfficient = efficiency > 0;
            const efficiencyLevel = Math.abs(efficiency);
            
            return (
              <div key={device.name} className="efficiency-card">
                <div className="efficiency-header">
                  <span className="device-icon">
                    {device.name.includes('Laptop') ? '💻' : 
                     device.name.includes('Monitor') ? '🖥️' : 
                     device.name.includes('Lighting') ? '💡' : 
                     device.name.includes('AC') ? '❄️' : 
                     device.name.includes('Printer') ? '🖨️' : '🔌'}
                  </span>
                  <span className="efficiency-device-name">{device.name}</span>
                </div>
                
                <div className="efficiency-metrics">
                  <div className="efficiency-score">
                    <span className="score-value" style={{color: isEfficient ? '#10b981' : '#ef4444'}}>
                      {isEfficient ? '+' : ''}{efficiency.toFixed(1)}%
                    </span>
                    <span className="score-label">
                      {isEfficient ? 'Below Average' : 'Above Average'}
                    </span>
                  </div>
                  
                  <div className="usage-comparison">
                    <div className="comparison-bar-new">
                      <div className="bar-track">
                        <div 
                          className="bar-fill"
                          style={{
                            width: `${(device.usage / Math.max(...devices.map(d => d.usage))) * 100}%`,
                            backgroundColor: isEfficient ? '#10b981' : 
                                           efficiencyLevel < 20 ? '#f59e0b' : '#ef4444'
                          }}
                        />
                        <div className="average-line" style={{left: `${(avgUsage / Math.max(...devices.map(d => d.usage))) * 100}%`}} />
                      </div>
                    </div>
                    <div className="usage-labels">
                      <span className="current-usage">{device.usage.toFixed(1)} kWh</span>
                      <span className="avg-label">Avg: {avgUsage.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="efficiency-badge">
                  {isEfficient && efficiencyLevel > 15 ? '🏆 Excellent' :
                   isEfficient ? '✅ Good' :
                   efficiencyLevel < 20 ? '⚠️ Monitor' : '🔴 High Usage'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Nudges = ({ nudges }) => (
  <div className="card nudges" style={{ 
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '2px solid #10b981',
    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)'
  }}>
    <h3 style={{ 
      color: '#059669', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      fontSize: '18px'
    }}>
      🌱 Environmental Impact Updates
    </h3>
    <div style={{ padding: '0' }}>
      {nudges.map((nudge, index) => (
        <div key={index} style={{
          padding: '12px 16px',
          margin: '8px 0',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid #a7f3d0',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {nudge}
        </div>
      ))}
    </div>
  </div>
);

const RecentActivity = ({ activity }) => (
  <div className="card recent-activity" style={{
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    border: '2px solid #f59e0b',
    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.1)'
  }}>
    <h3 style={{ 
      color: '#d97706', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      fontSize: '18px'
    }}>
      🏆 Recent Achievements
    </h3>
    <div style={{ padding: '0' }}>
      {activity.map((item, index) => {
        const isAchievement = item.includes('🌟') || item.includes('🏆') || item.includes('✅');
        return (
          <div key={index} style={{
            padding: '12px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            background: isAchievement ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.7)',
            border: isAchievement ? '2px solid #fbbf24' : '1px solid #fed7aa',
            fontSize: '14px',
            lineHeight: '1.4',
            fontWeight: isAchievement ? 'bold' : 'normal'
          }}>
            {item}
          </div>
        );
      })}
    </div>
  </div>
);

const Employee = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8000/api/employee/dashboard');
        if (!response.ok) throw new Error('Network response not ok');
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load employee data. Make sure the backend server is running on port 8000.');
        // You can add fallback to mock data if needed:
        // setData(mockDashboardData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading-state">Loading Energy Dashboard...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!data) return null;

  return (
    <div className="energy-dashboard-container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f7fafc' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Sprint Energy Coach</h1>
        <p>Logged in as: <strong>{data.employeeInfo.loggedAs}</strong></p>
      </header>

      {/* Carbon Achievement Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25)'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
          🌱 Carbon Footprint Achievement Unlocked!
        </div>
        <div style={{ fontSize: '14px', opacity: '0.95' }}>
          You've reduced your carbon footprint by 22% this month - leading the way towards a sustainable future!
        </div>
      </div>

      <CompanyTarget {...data.companyTarget} />

      <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>My Energy Dashboard</h2>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="top-left-panel">
          <EnergyRings {...data.energyRings} />
        </div>
        <div className="top-right-panel">
          <TeamProgress {...data.teamProgress} />
        </div>
        <div className="bottom-left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RealTimeUsage data={data.realTimeUsage} />
          <MyDevices devices={data.myDevices} />
        </div>
        <div className="bottom-right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Nudges nudges={data.nudges} />
          <RecentActivity activity={data.recentActivity} />
        </div>
      </div>

      {/* Enhanced Device Section */}
      <div style={{ marginTop: '30px' }}>
        <EnhancedDeviceView devices={data.myDevices} />
        <DeviceAnalytics devices={data.myDevices} />
      </div>
    </div>
  );
};

export default Employee;
