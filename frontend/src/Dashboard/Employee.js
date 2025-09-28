import React, { useState, useEffect } from 'react';
import './Employee.css';
import mockDashboardData from '../json/Employee.json'; // JSON import
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

// =================== Child Components ===================

const CompanyTarget = ({ targetKWh, currentKWh, progressPercent, unit }) => (
  <div className="company-target-bar" style={{ 
    backgroundColor: '#e6ffe6', padding: '8px', borderRadius: '4px', marginBottom: '20px', fontWeight: 'bold'
  }}>
    <span style={{ 
      backgroundColor: '#38a169', color: 'white', padding: '4px 8px', borderRadius: '4px', marginRight: '10px' 
    }}>
      Company Target (Month): {targetKWh} {unit}
    </span>
    <span style={{color: '#38a169'}}>
      You are at {currentKWh} {unit} ({progressPercent}%)
    </span>
  </div>
);

const EnergyRings = ({ today, week, month }) => (
  <div className="energy-rings-container" style={{ position: 'relative', width: '200px', height: '200px', margin: '20px auto' }}>
    <div style={{ position: 'absolute', width: '80px', height: '80px', top: '60px', left: '60px', borderRadius: '50%', border: '4px solid #38a169', opacity: 0.5 }} />
    <div style={{ position: 'absolute', width: '120px', height: '120px', top: '40px', left: '40px', borderRadius: '50%', border: '4px solid #4299e1', opacity: 0.5 }} />
    <div style={{ position: 'absolute', width: '160px', height: '160px', top: '20px', left: '20px', borderRadius: '50%', border: '4px solid #f6ad55', opacity: 0.5 }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '12px' }}>Today {today.used.toFixed(1)} / {today.target} kWh</p>
      <p style={{ margin: 0, fontSize: '12px' }}>Week {week.used} / {week.target} kWh</p>
      <p style={{ margin: 0, fontSize: '12px' }}>Month {month.used} / {month.target} kWh</p>
    </div>
  </div>
);

const TeamProgress = ({ you, avgDept, topPeer }) => (
  <div className="card team-progress">
    <h3>Team Progress (this month)</h3>
    {[{ label: 'You', percent: you }, { label: 'Avg Dept', percent: avgDept }, { label: 'Top Peer', percent: topPeer }].map(item => (
      <div key={item.label} style={{ marginBottom: '10px' }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{item.label}</p>
        <div style={{ height: '15px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: '#38a169' }} />
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

const Nudges = ({ nudges }) => (
  <div className="card nudges">
    <h3>Nudges</h3>
    <ul>
      {nudges.map((nudge, index) => <li key={index}>{nudge}</li>)}
    </ul>
  </div>
);

const RecentActivity = ({ activity }) => (
  <div className="card recent-activity">
    <h3>Recent Activity</h3>
    <ul>
      {activity.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

// =================== Main Dashboard ===================

const Employee = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setData(mockDashboardData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
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
    </div>
  );
};

export default Employee;
