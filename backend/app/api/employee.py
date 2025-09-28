from fastapi import APIRouter, HTTPException, Path
from typing import Optional
import json
import os
from app.schemas.employee import EmployeeDashboardResponse

router = APIRouter()

# Path to the JSON data file
EMPLOYEE_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "employee_data.json")

def load_employee_data():
    """Load employee dashboard data from JSON file"""
    try:
        with open(EMPLOYEE_DATA_PATH, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Employee data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in employee data file")

@router.get("/dashboard", response_model=EmployeeDashboardResponse)
async def get_employee_dashboard():
    """
    Get employee dashboard data for the default employee
    Returns all data needed for the employee dashboard including:
    - Company targets and progress
    - Energy rings (today/week/month)
    - Team progress comparison
    - Real-time usage data
    - Device consumption
    - Energy-saving nudges
    - Recent activity
    """
    data = load_employee_data()
    return EmployeeDashboardResponse(**data)

@router.get("/dashboard/{employee_id}", response_model=EmployeeDashboardResponse)
async def get_employee_dashboard_by_id(
    employee_id: int = Path(..., description="The ID of the employee", ge=1)
):
    """
    Get employee dashboard data for a specific employee by ID
    Currently returns the same data for all employees (mock implementation)
    """
    # For now, return the same data regardless of employee_id
    # In a real implementation, this would filter data by employee_id
    data = load_employee_data()
    
    # You could customize data based on employee_id here
    # For example, different targets, different device usage, etc.
    
    return EmployeeDashboardResponse(**data)

@router.get("/real-time-usage")
async def get_real_time_usage():
    """
    Get real-time energy usage data for charts
    Returns hourly usage data for the current day
    """
    data = load_employee_data()
    return {
        "data": data["realTimeUsage"],
        "timestamp": "2025-09-27T15:30:00Z",
        "unit": "watts"
    }

@router.get("/devices")
async def get_employee_devices():
    """
    Get list of employee's devices and their energy consumption
    """
    data = load_employee_data()
    return {
        "devices": data["myDevices"],
        "total_consumption": sum(device["usage"] for device in data["myDevices"]),
        "unit": "kWh"
    }

@router.get("/nudges")
async def get_energy_nudges():
    """
    Get personalized energy-saving recommendations
    """
    data = load_employee_data()
    return {
        "nudges": data["nudges"],
        "count": len(data["nudges"])
    }

@router.get("/activity")
async def get_recent_activity():
    """
    Get recent energy-related activities and automated optimizations
    """
    data = load_employee_data()
    return {
        "activities": data["recentActivity"],
        "count": len(data["recentActivity"])
    }

@router.get("/team-progress")
async def get_team_progress():
    """
    Get team progress comparison data
    """
    data = load_employee_data()
    return {
        "progress": data["teamProgress"],
        "your_rank": "2nd out of 12 in department"  # Mock ranking
    }