import React, { useEffect, useState } from "react";
import {
  Bell,
  Monitor,
  HardDrive,
  Flame,
  Package,
  Power,
} from "lucide-react";

const jsonData = {
  devices: [
    { name: "Monitor", co2: 1.2, icon: "Monitor", color: "#34D399" }, // green
    { name: "Docking Station", co2: 0.8, icon: "HardDrive", color: "#FBBF24" }, // yellow
    { name: "Space Heater", co2: 2.5, icon: "Flame", color: "#EF4444" }, // red
  ],
  shipments: [
    { name: "Shipment", co2: 18.2, color: "#3B82F6", note: "Delay delivery to 9-11 p.m. saves 14% CO2" }, // blue
  ],
  targets: ["Switch off docking station when not in use"],
  totalGoal: 30,
};

export default function EmployeeDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // fetch("/api/dashboard")
    //   .then(res => res.json())
    //   .then(resData => setData(resData))
    //   .catch(err => console.error(err));

    setData(jsonData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const iconMap = { Monitor, HardDrive, Flame, Package, Power };

  const co2Sources = [...data.devices, ...data.shipments];
  const totalCO2 = co2Sources.reduce((sum, item) => sum + item.co2, 0);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const segments = co2Sources.map((item) => {
    const percent = (item.co2 / data.totalGoal) * 100;
    const dashArray = (percent / 100) * circumference;
    const dashOffset = circumference - (cumulativePercent / 100) * circumference;
    cumulativePercent += percent;
    return { ...item, dashArray, dashOffset };
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Good Morning</h2>
            <Bell className="w-6 h-6 text-gray-500" />
          </div>

          {/* Carbon Goal Graph */}
          <div className="flex items-center mb-8 space-x-8">
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                {/* Background Circle */}
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  stroke="#E5E7EB"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Individual Segments */}
                {segments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke={seg.color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${seg.dashArray} ${circumference}`}
                    strokeDashoffset={seg.dashOffset}
                    strokeLinecap="butt"
                    transform="rotate(-90 18 18)"
                  />
                ))}
              </svg>
              <span className="text-3xl font-bold">{totalCO2.toFixed(1)}</span>
            </div>
            <p className="text-gray-500 text-lg">{data.totalGoal} kg CO2 target</p>
          </div>

          {/* Devices */}
          <div className="mb-8">
            <h3 className="font-medium text-xl mb-4">My Devices</h3>
            <ul className="grid grid-cols-3 gap-4">
              {data.devices.map((device) => {
                const Icon = iconMap[device.icon];
                return (
                  <li
                    key={device.name}
                    className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <Icon className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="font-medium">{device.name}</span>
                    <span className="text-gray-600 text-sm">{device.co2} kg CO2</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Shipments */}
          <div className="mb-8">
            <h3 className="font-medium text-xl mb-4">My Shipments</h3>
            {data.shipments.map((shipment, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-gray-50 text-sm mb-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-1">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span>{shipment.name}</span>
                  </div>
                  <span className="text-gray-600">{shipment.co2} kg CO2</span>
                </div>
                <p className="text-gray-500 text-xs">{shipment.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Personal Targets */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-medium text-xl mb-4">Personal Targets</h3>
          {data.targets.map((target, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-50 text-sm flex items-center space-x-2 mb-3"
            >
              <Power className="w-5 h-5 text-gray-500" />
              <span>{target}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
